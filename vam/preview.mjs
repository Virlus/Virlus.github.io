// Private preview server with optional Wi-Fi binding and video byte-range support.
import http from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const types={'.pdf':'application/pdf','.woff2':'font/woff2','.svg':'image/svg+xml','.json':'application/json', '.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4'};
const handleRequest=async(req,res)=>{
  res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Security-Policy',"default-src 'self'; font-src 'self'; img-src 'self' data: blob:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'");
  if(req.url==='/'||req.url==='/vam'){res.writeHead(302,{Location:'/vam/'});return res.end();}
  try{
    const url=new URL(req.url,'http://localhost');
    if(!url.pathname.startsWith('/vam/'))throw Error();
    const relative=decodeURIComponent(url.pathname.slice(5))||'index.html';
    const file=path.resolve(root,relative);
    if(!file.startsWith(root)||!types[path.extname(file)])throw Error();
    const info=await stat(file);if(!info.isFile())throw Error();
    res.setHeader('Content-Type',types[path.extname(file)]);
    res.setHeader('Accept-Ranges','bytes');
    let start=0,end=info.size-1;
    if(req.headers.range){
      const m=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if(!m){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});return res.end();}
      start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),end):end;
      if(start>end){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});return res.end();}
      res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${info.size}`);
    }
    res.setHeader('Content-Length',end-start+1);
    if(req.method==='HEAD')return res.end();
    const stream=createReadStream(file,{start,end});stream.pipe(res);res.on('close',()=>stream.destroy());
  }catch{res.writeHead(404);res.end('Not found');}
};
const hosts = ['127.0.0.1', ...(process.env.LAN_HOST ? [process.env.LAN_HOST] : [])];
for (const host of new Set(hosts)) {
  http.createServer(handleRequest).listen(4322,host,()=>console.log(`Private preview: http://${host}:4322/vam/`));
}
