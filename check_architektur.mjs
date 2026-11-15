import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const js=readFileSync(join(root,'src/bauplan.js'),'utf8');
const html=readFileSync(join(root,'index.html'),'utf8');
const geom=readFileSync(join(root,'src/haus3d.js'),'utf8');
const errs=[];let passes=0;
function ok(condition,message){if(!condition)errs.push(message);else passes++;}
for(const f of ['index.html','src/bauplan.js','src/haus3d.js','README.md','docs/QUELLEN_UND_GRENZEN.md','docs/ABNAHMEPLAN.md'])ok(existsSync(join(root,f)),`Fehlt: ${f}`);
const content=js.replace('export const HAUS','const HAUS')+'\n globalThis.__DATA = HAUS;';
new Function(content)();
const d=globalThis.__DATA;
ok(d.footprint.eastWestM===51.2,'Gebäudelänge');
ok(d.footprint.northSouthM===26.1,'Gebäudebreite');
ok(d.floors.length===6,'6 Geschosse');
ok(new Set(d.floors.map(x=>x.id)).size===6,'Unique floor IDs');
ok(d.publicRooms.ground.length>=5,'Ground rooms');
ok(d.publicRooms.state.length>=8,'State rooms');
for(const level of d.floors)ok(Number.isFinite(level.y),'Floor height: '+level.id);
for(const [floor,rooms] of Object.entries(d.publicRooms))for(const room of rooms){
  ok(room.certainty==='approx',`Datenkennzeichnung: ${room.name}`);
  ok(room.w>0&&room.h>0,'Dimension: '+room.name);
  ok(Math.abs(room.x)+room.w/2<=27,'Room footprint EW: '+room.name);
  ok(Math.abs(room.z)+room.h/2<=15,'Room footprint NS: '+room.name);
}
for(const floor of d.floors)ok(html.includes(`value="${floor.id}"`),'Floor option '+floor.id);
for(const n of ['return {root,setLevel,HAUS','function stateRooms()','function groundRooms()','Truman Balcony'])ok(geom.includes(n),'Model '+n);
ok(html.includes('src/haus3d.js'),'Module path');
ok(!html.includes('cross-hall-v6.js'),'No legacy module');
ok(!html.includes('burg'),'No castle scene');
ok(!html.includes('sofa'),'No old furniture');
if(errs.length){console.error('FAIL:',errs);process.exitCode=1;}else console.log(`OK: ${passes} statische Prüfungen bestanden. Browser-WebGL muss separat geprüft werden.`);
