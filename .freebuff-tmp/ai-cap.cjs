const fs=require('fs'),https=require('https');
const ENV=fs.readFileSync('.env','utf8');
const ANON=(ENV.match(/VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*"?([^"\n]+)"?/)||[])[1];
const body=JSON.stringify({});
const req=https.request({hostname:'zzliiazovezhxbmfeqco.supabase.co',path:'/functions/v1/ai-correction',method:'POST',headers:{'Content-Type':'application/json',apikey:ANON,Authorization:'Bearer '+ANON,'Content-Length':Buffer.byteLength(body)}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>console.log('anon status',r.statusCode,d.slice(0,200)));});
req.write(body);req.end();
