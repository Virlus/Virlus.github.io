(async () => {
  const section = document.querySelector('#value-replacement');
  const status = section.querySelector('.replacement-status');
  const plots = ['left-3d', 'right-3d', 'value-history', 'gripper-command'];
  const camera = {eye: {x: 1.5, y: 1.5, z: 1.1}, up: {x: 0, y: 0, z: 1}};
  let cases, active = 0, initialized = false;
  const config = {responsive: true, displaylogo: false, scrollZoom: true, displayModeBar: false};
  const fixedConfig = {...config, scrollZoom: false, doubleClick: false};
  const base = {paper_bgcolor: '#fdf9f1', plot_bgcolor: '#fdf9f1', font: {family: 'Arial, sans-serif', size: 16, color: '#221810'}, showlegend: false, margin: {l: 55, r: 20, t: 10, b: 52}};
  const visible = key => section.querySelector(`input[value="${key}"]`).checked;
  const visibility = () => plots.forEach(id => {
    const el = document.getElementById(id);
    if (el.data) Plotly.restyle(el, {visible: el.data.map(t => visible(t.legendgroup))});
  });
  async function render() {
    const data = cases[active];
    status.textContent = '';
    section.querySelector('.history-strip').replaceChildren(...data.frames.map((src, i) => {
      const figure = document.createElement('figure');
      const img = document.createElement('img'); img.src = src; img.alt = `${data.title}, observation at ${data.historyTimes[i]} seconds`;
      const caption = document.createElement('figcaption'); caption.textContent = `${data.historyTimes[i]} s`;
      figure.append(img, caption); return figure;
    }));
    await Promise.all(['left', 'right'].map(arm => {
      const traces = data.conditions.flatMap(c => {
        const points = c[arm];
        return [{type:'scatter3d',mode:'lines',name:c.name,legendgroup:c.key,visible:visible(c.key),x:points.map(p=>p[0]),y:points.map(p=>p[1]),z:points.map(p=>p[2]),line:{color:c.color,width:6,dash:c.key==='full'?'solid':c.key==='offline39999'?'dash':'dot'},customdata:points.map((_,i)=>i),hovertemplate:`${c.name}<br>Step %{customdata}<br>X %{x:.2f} cm<br>Y %{y:.2f} cm<br>Z %{z:.2f} cm<extra></extra>`},
        {type:'scatter3d',mode:'markers',name:c.name,legendgroup:c.key,visible:visible(c.key),x:[points[0][0],points.at(-1)[0]],y:[points[0][1],points.at(-1)[1]],z:[points[0][2],points.at(-1)[2]],marker:{color:c.color,size:5,symbol:['circle','diamond']},text:['Start','End'],hovertemplate:'%{text}<extra></extra>'}];
      });
      const limits = data.axisLimits[arm].limits_cm;
      const axis = (name,i) => ({title:{text:`${name} (cm)`},range:limits[i],backgroundcolor:'#f8f2e9',gridcolor:'#e1e1df',showbackground:true,zeroline:false,nticks:5});
      return Plotly.react(`${arm}-3d`,traces,{...base,margin:{l:0,r:0,t:0,b:0},scene:{xaxis:axis('X',0),yaxis:axis('Y',1),zaxis:axis('Z',2),camera:structuredClone(camera),aspectmode:'cube',dragmode:'orbit'},uirevision:data.id},config);
    }));
    await Plotly.react('value-history',data.conditions.map(c=>({type:'scatter',mode:'lines+markers',name:c.name,legendgroup:c.key,visible:visible(c.key),x:data.historyTimes,y:c.values,line:{color:c.color,width:3},marker:{size:7},hovertemplate:`${c.name}<br>%{x} s: %{y:.4f}<extra></extra>`})),{...base,dragmode:false,xaxis:{fixedrange:true,title:{text:'History time (s)'},dtick:1,zeroline:false},yaxis:{fixedrange:true,title:{text:'Value'},zeroline:false,gridcolor:'#eee'},uirevision:data.id},fixedConfig);
    await Plotly.react('gripper-command',data.conditions.flatMap(c=>['left','right'].map(arm=>({type:'scatter',mode:'lines',name:`${c.name} · ${arm}`,legendgroup:c.key,visible:visible(c.key),x:c[`${arm}Gripper`].map((_,i)=>i),y:c[`${arm}Gripper`],line:{color:c.color,width:2.5,dash:arm==='left'?'solid':'dash'},hovertemplate:`${c.name} · ${arm}<br>Step %{x}: %{y:.4f} m<extra></extra>`}))),{...base,dragmode:false,xaxis:{fixedrange:true,title:{text:'Action step'},zeroline:false},yaxis:{fixedrange:true,title:{text:'Gripper command (m)'},zeroline:false,gridcolor:'#eee'},annotations:[{xref:'paper',yref:'paper',x:0,y:1.1,text:'Left: solid · Right: dashed',showarrow:false}],margin:{...base.margin,t:30},uirevision:data.id},fixedConfig);
    section.dataset.ready = 'true';
  }
  try {
    const response = await fetch('assets/replacement/data.json');
    if (!response.ok) throw new Error('Experimental data unavailable');
    cases = await response.json();
    const observer = new IntersectionObserver(async entries => {
      if (entries.some(e=>e.isIntersecting) && !initialized) {
        initialized=true; observer.disconnect();
        try { await render(); } catch(error) { status.textContent='3D view could not load. Please refresh the page.'; console.error(error); }
      }
    }, {rootMargin:'500px'});
    observer.observe(section);
    section.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',async()=>{
      active=Number(button.dataset.case);
      section.querySelectorAll('[data-case]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      try { await render(); } catch(error) { status.textContent='Could not load this case.'; console.error(error); }
    }));
    section.querySelectorAll('input').forEach(input=>input.addEventListener('change',visibility));
    document.getElementById('reset-3d').addEventListener('click',()=>['left-3d','right-3d'].forEach(id=>Plotly.relayout(id,{'scene.camera':structuredClone(camera)})));
  } catch(error) { status.textContent='Experimental data could not load. Please refresh the page.'; console.error(error); }
})();
