const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const production = process.argv.includes('--dist');
const sourceRoot = path.join(__dirname, production ? 'dist' : 'src');
const port = Number(process.env.PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.woff':'font/woff'};
http.createServer((req,res) => {
 let pathname;
 try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
 catch { res.writeHead(400).end('Bad request'); return; }
 if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}).end(); return; }
 const root = !production && pathname.startsWith('/assets/') ? path.join(__dirname, 'public') : sourceRoot;
 const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
 if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method === 'HEAD' ? undefined : data);});
}).listen(port, '127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}\nServing ${production ? 'dist/' : 'src/ and public/ — edit source and refresh'}`));
