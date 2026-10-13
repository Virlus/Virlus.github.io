from pathlib import Path
import json,numpy as np,subprocess,shlex,concurrent.futures
root=Path('vam/assets/replacement');cases=[];jobs=[]
manifest=json.load(open('/Users/jason/Downloads/value_learning/Wenye_ICLR2027/exp_fig/figures/laundry-folding-value-replacement/references/manifest.json'))
for code,title,meta in zip(['04','07'],['Lost contact','Re-grasped seams'],manifest['cases']):
 info=json.loads((root/f'case{code}-source.json').read_text());a=np.load(root/f'case{code}-action_file.npz');fk=np.load(root/f'case{code}-fk_file.npz');idx=np.flatnonzero(fk['ids']==info['index']).item();assert idx==info['sample']['batch_index']; assert a['ids'][idx]==info['index']
 case={'id':code,'title':title,'sampleIndex':info['index'],'historyTimes':info['history_times_seconds'],'conditions':[],'axisLimits':meta['eef_axes']}
 for cond,label,color in [('full','Full value caching','#FACA66'),('offline39999','Demo-trained value','#99B898'),('round0_9999','Post-warmup value','#02709D')]:
  action=a[cond+'_seed17'][idx];left=fk[cond+'_left'][idx]*100;right=fk[cond+'_right'][idx]*100
  for arm,xyz in [('left',left),('right',right)]:
   limits=np.array(meta['eef_axes'][arm]['limits_cm']); assert np.all(xyz.min(axis=0)>=limits[:,0]) and np.all(xyz.max(axis=0)<=limits[:,1])
  case['conditions'].append({'key':cond,'name':label,'color':color,'left':left.tolist(),'right':right.tolist(),'values':a[cond+'_values'][idx].ravel().tolist(),'leftGripper':action[:,6].tolist(),'rightGripper':action[:,13].tolist()})
 case['frames']=[f'assets/replacement/case{code}-frame{i}.png' for i in range(4)];cases.append(case)
 for i,ts in enumerate(meta['history']['presentation_timestamps']):
  cmd='ffmpeg -hide_banner -loglevel error -ss '+str(ts)+' -i '+shlex.quote(meta['history']['video'])+' -frames:v 1 -f image2pipe -vcodec png -'
  jobs.append((cmd,root/f'case{code}-frame{i}.png'))
def extract(job):
 cmd,path=job;result=subprocess.run(['ssh','yuwenye_h20_0',cmd],capture_output=True,check=True);path.write_bytes(result.stdout)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(extract,jobs))
(root/'data.json').write_text(json.dumps(cases,separators=(',',':')))
print('Exported two source-matched cases; all 3D trajectories within manuscript axis ranges.')
