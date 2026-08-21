import fs from 'node:fs';
const read=(p)=>fs.readFileSync(p,'utf8');
function stripModule(src){
  const lines=src.split('\n'); const out=[]; let skipping=false;
  for(const line of lines){
    if(!skipping && /^import\s/.test(line.trim())){ if(!line.trim().endsWith(';')) skipping=true; continue; }
    if(skipping){ if(line.trim().endsWith(';')) skipping=false; continue; }
    out.push(line.replace(/^export\s+/,''));
  }
  return out.join('\n');
}
const js=['src/game/data.js','src/game/state.js','src/game/engine.js','src/game/ui.js','src/main.js'].map(p=>stripModule(read(p))).join('\n\n');
const css=['src/styles/part-01.css','src/styles/part-02.css','src/styles/part-03.css','src/styles/helper-sprites.css'].map(read).join('\n\n');
const html=`<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"><meta name="theme-color" content="#031e35"><title>Tula's Island · Wordbound Battle V2.2 · Standalone</title><style>${css}</style></head><body style="margin:0;background:#07182b"><div id="app"></div><script>${js.replaceAll('</script>','<\\/script>')}</script></body></html>`;
fs.writeFileSync('prototype.html',html);
