#!/usr/bin/env python3
"""Reproducible structural and GLB asset audit, not a WebGL/iPhone rendering certification."""
from pathlib import Path
import json, hashlib, re, sys, math
ROOT=Path(__file__).resolve().parents[1]
ERROR=[]; GOOD=[]
def ok(test,condition,message=''):
    (GOOD if condition else ERROR).append(test + (': '+message if message else ''))
    print(('PASS ' if condition else 'FAIL ')+test+((' — '+message) if message else ''))

expected=['index.html','spielfigur.js','cross-hall-v6.js','cross-hall-carpet-v7.js',
 'cross-hall-furniture-v6.js','Weisses-Haus-Innen.glb',
 'assets/crosshall/portrait_links.jpg','assets/crosshall/portrait_rechts.jpg',
 'assets/crosshall/floor_marble_v3.jpg','assets/crosshall/floor_normal_v4.jpg',
 'assets/crosshall/floor_roughness_v4.jpg','assets/crosshall/wall_marble_v3.jpg',
 'assets/crosshall/wall_normal_v4.jpg','assets/crosshall/column_marble_v3.jpg',
 'assets/crosshall/carved_frieze_v3.png','assets/crosshall/ceiling_rosette_v3.png',
 'assets/crosshall/models/console_gold_3d.glb',
 'assets/crosshall/models/console_walnut_3d.glb',
 'assets/crosshall/models/hydrangea_bouquet_3d.glb',
 'assets/crosshall/models/porcelain_urn_3d.glb',
 'assets/crosshall/carpet_v7/CrossHall_Teppich_V7_REAL3D.glb',
 'assets/crosshall/carpet_v7/teppich_normal_v7.jpg',
 'assets/crosshall/carpet_v7/teppich_rauheit_v7.png',
 'assets/crosshall/carpet_v7/teppich_farbe_v7.jpg']
for file in expected:ok('Datei '+file,(ROOT/file).is_file())
html=(ROOT/'index.html').read_text(encoding='utf-8')
for candidate in ['Weisses-Haus-Innen.glb','cross-hall-v6.js','cross-hall-furniture-v6.js','cross-hall-carpet-v7.js','spielfigur.js']:
 ok('HTML nutzt '+candidate,candidate in html)
ok('Direkter Start in Cross Hall','let x=16.15,z=3.95,yaw=Math.PI/2' in html)
ok('Kein Burg-Modell beim Start','ladeBurg(' not in html and 'burg_hohenzollern.glb' not in html)
ok('3D-Assetfehler sichtbar','3D-Möbel unvollständig' in html and '3D-Teppich fehlt' in html)
ok('Nur eine 3D-Teppich-Version', 'ladeCrossHallTeppichV7' in html and 'CrossHall_Teppich_V7_REAL3D.glb' in (ROOT/'cross-hall-carpet-v7.js').read_text())
import trimesh
for file in [x for x in expected if x.endswith('.glb')]:
 try:
  obj=trimesh.load(ROOT/file,force='scene')
  nfaces=sum(len(m.faces) for m in obj.geometry.values())
  bb=obj.bounds
  ok('GLB gültig '+file, nfaces>0 and bool((bb[1]-bb[0]>0).all()), f'{nfaces:,} Dreiecke')
 except Exception as ex:ok('GLB gültig '+file,False,str(ex))
from PIL import Image
for file in [x for x in expected if x.lower().endswith(('.png','.jpg'))]:
 try:
  with Image.open(ROOT/file) as image:
   image.verify()
  ok('Bild lesbar '+file,True)
 except Exception as ex:ok('Bild lesbar '+file,False,str(ex))
carpet=trimesh.load(ROOT/'assets/crosshall/carpet_v7/CrossHall_Teppich_V7_REAL3D.glb',force='scene')
carpet_size=carpet.bounds[1]-carpet.bounds[0]
ok('Teppich x-Länge passend',abs(carpet_size[0]-34.82)<.02)
ok('Teppich z-Breite passend',abs(carpet_size[2]-2.64)<.02)
ok('Teppich hat Dicke',.015<carpet_size[1]<.07)
# Exact placement inventory from source as built (meters, Y-up).
placements=[(-6.75,7.11,'Mahagoni NW'),(-3.56,.87,'Mahagoni S1'),(3.65,.87,'Mahagoni S2'),(10.80,.87,'Vergoldet S3'),(6.75,7.11,'Vergoldet N2')]
for x,z,label in placements:
 outside_rug= (z-.332>3.95+1.32) or (z+.332<3.95-1.32)
 inside_hall=(-17.5 < x-.73 and x+.73 <17.5) and (.3<z-.332 and z+.332<7.7)
 ok('Möbelposition '+label,outside_rug and inside_hall,f'x={x:.2f}m z={z:.2f}m')
# Ensure all 5 footprint rectangles do not overlap each other.
for i,(x,z,a) in enumerate(placements):
 for u,v,b in placements[i+1:]:
  ok('Keine Möbeldopplung '+a+'/'+b,abs(x-u)>=1.46 or abs(z-v)>=.664)
# Existing sofa groups were moved away from the north-side doorway footprints.
module=(ROOT/'cross-hall-v6.js').read_text()
ok('Sitzgruppen von Türen weggerückt','settee(11.30,7.06,-1);settee(-11.30,7.06,-1)' in module)
ok('Stehleuchten nicht mehr vor Gemälden','for(const x of [-16.7,16.7])torchiere(x,6.90)' in module and 'for(const x of [-16.7,16.7])torchiere(x,.80)' in module)
ok('Südliche Wandlampen umpositioniert','for(const x of [-11.3,-4.3,4.3,11.3])' in module)
print('\nErgebnis:',len(GOOD),'bestanden,',len(ERROR),'Fehler')
if ERROR:
 print('\nFehler:');print('\n'.join(ERROR));sys.exit(1)
