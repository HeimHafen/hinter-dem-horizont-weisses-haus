/**
 * Hinter dem Horizont — Cross Hall | architektonische Raumachsen WH-1.1 (15.11.2026).
 * Geometrische, spielbare Annäherung an die vom Nutzer freigegebene Bildvorlage.
 * KEINE zentimetergenaue Vermessung des realen Weißen Hauses und kein Foto-Hintergrund.
 * Halle: X = Längsachse, Z = Breite; Hallenfußboden bei Y = 0.89.
 * Benötigt Three.js r170; 2 zugeschnittene Bildtexturen aus dem Referenzbild.
 */
export function baueCrossHallV5(THREE, scene, exterior, renderer, obstacles, assets={}) {
  const hall = new THREE.Group();
  hall.name='CrossHall_Architektur_WH11_20261115';
  exterior.add(hall);
  const F=.90, C=4.62, minX=-17.82, maxX=17.82;
  const white=new THREE.MeshStandardMaterial({color:0xf5ebe0,roughness:.79});
  const ivory=new THREE.MeshStandardMaterial({color:0xe8ddd0,roughness:.70});
  const bright=new THREE.MeshStandardMaterial({color:0xfff6e6,roughness:.54});
  const inset=new THREE.MeshStandardMaterial({color:0xd7c9b9,roughness:.77});
  const chalk=new THREE.MeshStandardMaterial({color:0xf9f0df,roughness:.73});
  const darkMarble=new THREE.MeshPhysicalMaterial({color:0x8f8180,roughness:.26,clearcoat:.3,envMap:assets.environment||null,envMapIntensity:.35});
  const walnut=new THREE.MeshStandardMaterial({color:0x4b2e1d,roughness:.48});
  const blackWood=new THREE.MeshStandardMaterial({color:0x251a16,roughness:.36});
  const brass=new THREE.MeshStandardMaterial({color:0xc59b61,metalness:.62,roughness:.29,envMap:assets.environment||null,envMapIntensity:1.25});
  const gold=new THREE.MeshStandardMaterial({color:0xd7b16c,metalness:.61,roughness:.29,envMap:assets.environment||null,envMapIntensity:1.35});
  const antiqueGold=new THREE.MeshStandardMaterial({color:0x977244,metalness:.53,roughness:.40,envMap:assets.environment||null,envMapIntensity:.85});
  const brocade=new THREE.MeshStandardMaterial({color:0x972e3e,roughness:.85});
  const lampGlass=new THREE.MeshStandardMaterial({color:0xffe9b4,emissive:0xffd09a,emissiveIntensity:.67,roughness:.27});
  const cutGlass=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.12,metalness:0,transparent:true,opacity:.88,clearcoat:1,clearcoatRoughness:.08,depthWrite:false,envMap:assets.environment||null,envMapIntensity:.7});
  const volute=new THREE.MeshStandardMaterial({color:0xddcdbb,roughness:.59});
  let rng=17309;
  const rand=()=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296;};
  // Batch box details by material into instanced geometry to keep GPU draw calls low on iPhone.
  const boxBatches=new Map();
  const sq=(x,y,z,w,h,d,m,sh=false)=>{
    let pack=boxBatches.get(m);
    if(!pack){pack={plain:[],shadow:[]};boxBatches.set(m,pack);}
    (sh?pack.shadow:pack.plain).push([x,y,z,w,h,d]);
  };
  const cylinderBatches=new Map();
  const rod=(x,y,z,rTop,rBottom,height,m,segments=16,sh=false)=>{
    // Same taper & segment count share geometry; each instance scales separately.
    const ratio=(rTop/rBottom).toFixed(4);
    const key=segments+':'+ratio;
    let finish=cylinderBatches.get(m);
    if(!finish){finish=new Map();cylinderBatches.set(m,finish);}
    let pack=finish.get(key);
    if(!pack){pack={ratio:rTop/rBottom,segments,plain:[],shadow:[]};finish.set(key,pack);}
    (sh?pack.shadow:pack.plain).push([x,y,z,rBottom,height]);
  };
  const path=(pts,r,m,segments=20)=>{
    const points=pts.map(p=>new THREE.Vector3(...p));
    const mesh=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),segments,r,6,false),m);hall.add(mesh);return mesh;
  };
  const sphereBatches=new Map();
  const oval=(x,y,z,rx,ry,rz,m,segments=18)=>{
    let p=sphereBatches.get(m);if(!p){p=new Map();sphereBatches.set(m,p);}
    let a=p.get(segments);if(!a){a=[];p.set(segments,a);}
    a.push([x,y,z,rx,ry,rz]);
  };
  const ring=(x,y,z,r,t,m)=>{
    const o=new THREE.Mesh(new THREE.TorusGeometry(r,t,8,32),m);
    o.rotation.x=-Math.PI/2;o.position.set(x,y,z);hall.add(o);return o;
  };
  function texture(canvas) {
    const t=new THREE.CanvasTexture(canvas);
    t.colorSpace=THREE.SRGBColorSpace;
    t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
    return t;
  }
  function paintedPortrait(seedTone='#6a4a38',accent='#9a7a54'){
    const cv=document.createElement('canvas');cv.width=720;cv.height=1024;
    const p=cv.getContext('2d');
    const bg=p.createLinearGradient(0,0,0,1024);
    bg.addColorStop(0,'#58453d');bg.addColorStop(1,'#312720');
    p.fillStyle=bg;p.fillRect(0,0,720,1024);
    p.fillStyle='rgba(211,175,104,.18)';p.fillRect(40,40,640,944);
    p.fillStyle='#ece3cf';p.beginPath();p.ellipse(360,258,76,100,0,0,Math.PI*2);p.fill();
    p.fillStyle=seedTone;p.beginPath();p.moveTo(236,540);p.quadraticCurveTo(365,356,486,540);p.lineTo(530,940);p.lineTo(190,940);p.closePath();p.fill();
    p.fillStyle='#181410';p.beginPath();p.arc(360,218,84,Math.PI,0);p.quadraticCurveTo(360,145,434,206);p.lineTo(446,246);p.quadraticCurveTo(360,170,274,246);p.lineTo(286,206);p.quadraticCurveTo(360,145,360,145);p.closePath();p.fill();
    p.strokeStyle='rgba(255,245,220,.14)';p.lineWidth=2;
    for(let i=0;i<11;i++){p.beginPath();p.moveTo(110,160+i*70);p.lineTo(610,140+i*68);p.stroke();}
    p.fillStyle=accent;p.fillRect(286,585,148,34);p.fillRect(304,630,112,18);
    return texture(cv);
  }
  function paintedStillLife(main='#efe7d4',leaf='#476847'){
    const cv=document.createElement('canvas');cv.width=720;cv.height=1024;
    const p=cv.getContext('2d');
    const bg=p.createLinearGradient(0,0,0,1024);
    bg.addColorStop(0,'#635142');bg.addColorStop(1,'#40362e');
    p.fillStyle=bg;p.fillRect(0,0,720,1024);
    p.fillStyle='rgba(224,203,167,.20)';p.fillRect(58,80,604,864);
    p.fillStyle='#8f623a';p.fillRect(120,730,480,44);
    p.fillStyle='#d9ddd8';p.beginPath();p.moveTo(332,560);p.quadraticCurveTo(300,720,360,740);p.quadraticCurveTo(420,720,388,560);p.closePath();p.fill();
    for(let i=0;i<10;i++){
      const a=i*Math.PI*2/10,r=90+(i%3)*14,cx=360+Math.cos(a)*r,cy=535+Math.sin(a)*70;
      p.fillStyle=i%4?main:leaf;p.beginPath();p.ellipse(cx,cy,58,54,0,0,Math.PI*2);p.fill();
      p.strokeStyle='rgba(255,255,255,.16)';p.lineWidth=1.5;p.beginPath();p.arc(cx-15,cy-10,15,0,Math.PI*2);p.stroke();
    }
    return texture(cv);
  }
  // Marble is shaded per tile with separate thin, curved veining; no photographic tiling seam.
  function stoneTileMap() {
    const can=document.createElement('canvas');can.width=1536;can.height=512;
    const c=can.getContext('2d');
    const nx=18, nz=8, tw=can.width/nx, th=can.height/nz;
    for(let iy=0;iy<nz;iy++) for(let ix=0;ix<nx;ix++) {
      const px=ix*tw, py=iy*th;
      const pale=(ix+iy)%2===0;
      const base=pale?['#e8dfd9','#e4dcd3','#e7dfdb']:['#bcb1b1','#c4b7b2','#c1b6ad'];
      c.fillStyle=base[Math.floor(rand()*base.length)];c.fillRect(px,py,tw,th);
      c.save();c.beginPath();c.rect(px+.8,py+.8,tw-1.6,th-1.6);c.clip();
      for(let k=0;k<20;k++){
        const x=px+rand()*tw,y=py+rand()*th;
        c.strokeStyle=rand()>.4?(pale?'rgba(99,91,95,.12)':'rgba(105,98,102,.17)'):'rgba(255,249,242,.30)';
        c.lineWidth=.4+rand()*1.1;
        c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+rand()*32-8,y-16,x+rand()*35,y+16,x+tw*.40,y+rand()*30);c.stroke();
      }
      c.restore();
      c.strokeStyle='rgba(117,104,101,.33)';c.lineWidth=1.15;c.strokeRect(px+.75,py+.75,tw-1.5,th-1.5);
      c.fillStyle='rgba(255,255,255,.20)';c.fillRect(px+2,py+2,tw-4,2);
    }
    return texture(can);
  }
  const stoneMap=assets.floor || stoneTileMap();
  stoneMap.wrapS=stoneMap.wrapT=THREE.RepeatWrapping;
  stoneMap.repeat.set(1,1);
  const polishedStone=new THREE.MeshPhysicalMaterial({map:stoneMap,normalMap:assets.floorNormal||null,normalScale:new THREE.Vector2(.13,.13),roughnessMap:assets.floorRoughness||null,roughness:.52,metalness:0,clearcoat:.58,clearcoatRoughness:.19,envMap:assets.environment||null,envMapIntensity:.32});
  // Mask the old hall floor, including the carpet underneath.
  sq(0,.912,3.95,35.78,.032,7.89,polishedStone);
  sq(0,.912,9.9,11.62,.032,4.18,polishedStone);
  for(const z of [.12,7.79]) sq(0,.937,z,35.66,.006,.065,darkMarble);

  // Cross Hall V7: Die vorherige flache Quader-Teppich-Geometrie wurde entfernt.
  // Stattdessen wird ein echtes GLB-Teppichmodell separat eingefuegt (index.html).
  // Restlicher Raum und Materialsystem bleiben unveraendert.

  function plasterMarbleTexture(){
    const cv=document.createElement('canvas');cv.width=512;cv.height=512;
    const p=cv.getContext('2d');
    p.fillStyle='#e8dfd5';p.fillRect(0,0,512,512);
    for(let j=0;j<180;j++){
      const x=rand()*540-20,y=rand()*520-10;
      p.beginPath();p.moveTo(x,y);p.bezierCurveTo(x-22,y+28,x+38,y+64,x+rand()*42,y+125);
      p.strokeStyle=rand()>.42?'rgba(119,105,101,.12)':'rgba(255,255,255,.42)';
      p.lineWidth=.3+rand()*1.6;p.stroke();
    }
    return texture(cv);
  }
  const wallTex=assets.wall || plasterMarbleTexture();
  const stoneWall=new THREE.MeshPhysicalMaterial({map:wallTex,normalMap:assets.wallNormal||null,normalScale:new THREE.Vector2(.10,.10),roughness:.54,metalness:0,clearcoat:.12,envMap:assets.environment||null,envMapIntensity:.2});
  const columnMap=assets.column || wallTex.clone();columnMap.needsUpdate=true;
  const columnMat=new THREE.MeshPhysicalMaterial({map:columnMap,color:0xfff9f3,roughness:.37,clearcoat:.27,envMap:assets.environment||null,envMapIntensity:.35});

  // Historischer Raumzusammenhang: NUR Red, Blue, Green an der Südseite.
  // West und Ost werden am Ende des Flurs erreicht, NICHT über zwei weitere Südtüren.
  // Each blank span is a true 3D front layer in front of the original painted wall.
  const doors=[-7.2,0,7.2];
  const spans=[];let cursor=-17.88;
  for(const door of doors){
    const a=door-1.115,b=door+1.115;
    spans.push([cursor,a]);cursor=b;
  }
  spans.push([cursor,17.88]);
  for(const [a,b] of spans){
    const w=b-a,cx=(a+b)/2;
    sq(cx,2.77,.245,w,3.69,.095,stoneWall);
    sq(cx,1.30,.313,w,.13,.14,white);
    sq(cx,1.60,.300,w,.09,.12,ivory);
    sq(cx,1.02,.325,w,.22,.15,chalk);
    // Formal lower raised panels.
    if(w>1.4){
      sq(cx,1.33,.310,w-.30,.50,.020,inset);
      sq(cx,1.33,.332,w-.39,.41,.018,white);
      for(const side of [-1,1]){
        sq(cx+side*(w-.52)/2,1.33,.359,.024,.37,.025,antiqueGold);
      }
    }
  }
  for(const d of doors){
    // Headpiece covers the old overly dark room-coloured lintel.
    sq(d,4.11,.262,2.25,1.02,.11,stoneWall);
    for(const side of [-1,1]){
      sq(d+side*1.13,2.29,.365,.23,2.66,.34,columnMat);
      sq(d+side*1.13,1.05,.418,.32,.26,.44,chalk);
      sq(d+side*1.13,3.60,.414,.33,.18,.43,chalk);
      sq(d+side*1.13,3.77,.382,.29,.10,.37,ivory);
      sq(d+side*.94,2.39,.432,.055,2.31,.06,antiqueGold);
    }
    sq(d,3.69,.413,2.45,.17,.46,chalk);
    sq(d,3.81,.440,2.64,.08,.51,white);
    sq(d,3.91,.409,2.95,.075,.25,ivory);
    // Wood panel beyond the doorway, not a blocking slab.
  }
  // North side, only on solid sections. The central six-column bay is intentionally open.
  for(const [a,b] of [[-17.9,-5.25],[5.25,17.9]]){
    const c=(a+b)/2,w=b-a;
    sq(c,2.76,7.68,w,3.67,.094,stoneWall);
    sq(c,1.22,7.606,w,.14,.16,chalk);
    sq(c,1.63,7.608,w,.08,.14,white);
    sq(c,1.04,7.592,w,.21,.15,chalk);
  }
  // Long moulded cornice. Three profiles plus dentils define a continuous neoclassical room.
  for(const z of [.34,7.62]){
    sq(0,4.43,z,35.82,.20,.32,ivory);
    sq(0,4.54,z,35.84,.095,.42,white);
    sq(0,4.37,z,35.82,.065,.43,chalk);
    sq(0,4.245,z,35.82,.046,.21,ivory);
    sq(0,1.02,z,35.82,.065,.17,white);
  }
  // The real corridor has layered carved cornices. A slim, warm reflected-light
  // reveal under the upper plaster lip adds depth without expensive new lights.
  const cove=new THREE.MeshStandardMaterial({color:0xe9d1ac,emissive:0xae7741,emissiveIntensity:.24,roughness:.75});
  for(const z of [.48,7.48])sq(0,4.48,z,35.64,.018,.030,cove);
  for(const x of [-17.76,17.76])sq(x,4.42,3.96,.030,.032,7.05,chalk);
  // Small rectangular caissons within each ceiling coffer; strong silhouette
  // from oblique angles, unlike a flat ornament decal.
  const plasterShadow=new THREE.MeshStandardMaterial({color:0xcdbfb1,roughness:.93});
  for(const cx of [-14.5,-7.3,0,7.3,14.5]){
    for(const zz of [2.18,5.74]){
      sq(cx,4.462,zz,5.85,.024,.055,plasterShadow);
      sq(cx,4.437,zz,5.62,.022,.022,bright);
    }
  }
  // Cornice dentils: instanced = no hundreds of draw calls.
  const dentils=new THREE.InstancedMesh(new THREE.BoxGeometry(.15,.085,.13),white,2*132);
  const dummy=new THREE.Object3D();let did=0;
  for(const z of [.39,7.57])for(let i=0;i<132;i++){
    dummy.position.set(-17.57+i*.269,4.314,z);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();dentils.setMatrixAt(did++,dummy.matrix);
  }
  dentils.instanceMatrix.needsUpdate=true;hall.add(dentils);
  // Raised wall panels and repeated engaged Ionic shafts. Keep door passages clear.
  function wallPanel(x,z,w,h,y=2.72){
    if(w<.5)return;
    const side=z<4?1:-1;
    const face=z+side*.012;
    sq(x,y,face,w,h,.040,inset);
    sq(x,y,face+side*.033,w-.105,h-.10,.033,stoneWall);
    const zw=face+side*.062;
    for(const sign of [-1,1]){
      sq(x+sign*(w-.20)/2,y,zw,.028,h-.19,.035,white);
      sq(x,y+sign*(h-.20)/2,zw,w-.18,.028,.035,white);
    }
  }
  for(const [a,b] of spans){
    const w=b-a;
    if(w>=2.5) wallPanel((a+b)/2,.322,Math.min(w-.6,2.2),1.31,2.68);
  }
  for(const [a,b] of [[-17.9,-10.0],[-8.12,-5.33],[5.33,8.12],[10.0,17.9]]) {
    const w=b-a;
    if(w>2.4)wallPanel((a+b)/2,7.61,Math.min(w-.60,2.6),1.28,2.66);
  }
  for(const x of [-15.9,-12,-9.6,-4.7,-2.6,2.6,4.7,9.6,12,15.9]){
    // Reduced projection so doors remain useable.
    const z=.405;
    sq(x,2.65,z,.30,3.10,.32,columnMat);
    sq(x,1.03,z,.42,.24,.44,bright);
    sq(x,4.21,z,.42,.19,.48,bright);
    for(const dx of [-.10,-.04,.04,.10])sq(x+dx,2.70,z+.17,.022,2.74,.020,ivory);
  }

  // Channeled marble pilasters: tiny inlaid strips and tiered capitals
  // provide a crafted silhouette at walking distance without blocking doors.
  for(const xx of [-15.9,-12,-9.6,-4.7,-2.6,2.6,4.7,9.6,12,15.9]){
    for(const side of [-1,1])sq(xx+side*.19,3.66,.480,.026,.13,.12,antiqueGold);
    for(const dy of [3.90,4.005])sq(xx,dy,.469,.51,.020,.15,chalk);
    for(const s of [-1,1]){
      const curvePts=Array.from({length:11},(_,i)=>{
        const angle=Math.PI*1.65*i/10;
        const rr=.075*(1-i/11);
        return [xx+s*(.095+rr*Math.cos(angle)),3.815+rr*Math.sin(angle),.585];
      });
      path(curvePts,.009,ivory,12);
    }
  }
  // Coherent coffer ceiling (instead of dark flat rectangles seen in the current build).
  sq(0,4.576,3.96,35.79,.103,7.31,white);
  const coffers=[-14.5,-7.3,0,7.3,14.5];
  for(const cx of coffers){
    // field and perimeter frames, approx 6.8m along X, 6.3m across.
    const wy=4.502;
    sq(cx,wy,3.96,6.88,.040,6.66,ivory);
    for(const [off,m,dep] of [[.08,white,.14],[.23,inset,.050],[.31,chalk,.045]]){
      for(const s of [-1,1]){
        sq(cx+s*(6.88/2-off),wy-.028*(off*10),3.96,.085,dep,6.66-off*2,m);
        sq(cx,wy-.028*(off*10),3.96+s*(6.66/2-off),6.88-off*2,dep,.085,m);
      }
    }
  }
  // Plaster mouldings & carved details around chandelier medallions.
  function medallion(x,z){
    ring(x,4.432,z,.66,.042,white);
    ring(x,4.414,z,.48,.025,ivory);
    ring(x,4.404,z,.25,.036,white);
    rod(x,4.403,z,.145,.145,.07,chalk,24);
    for(let i=0;i<16;i++){
      const a=i*Math.PI/8;
      const xx=x+Math.sin(a)*.53,zz=z+Math.cos(a)*.53;
      oval(xx,4.404,zz,.055,.014,.104,white,10);
      path([[xx-.04,4.394,zz-.02],[xx,4.390,zz+.04],[xx+.04,4.394,zz-.02]],.012,ivory,7);
    }
  }
  medallion(-8.05,3.95);medallion(8.05,3.95);
  // Baked embossed plaster leaves laid onto the THREE-DIMENSIONAL medallion.
  // This is a local ornament texture, not a photograph pasted across the hall.
  if(assets.rosette){
    const relief=new THREE.MeshStandardMaterial({map:assets.rosette,transparent:true,alphaTest:.02,roughness:.82,side:THREE.DoubleSide,depthWrite:false});
    for(const x of [-8.05,8.05]){
      const badge=new THREE.Mesh(new THREE.PlaneGeometry(1.60,1.60),relief);
      badge.rotation.x=Math.PI/2;
      badge.position.set(x,4.392,3.95);
      badge.renderOrder=4;
      hall.add(badge);
    }
  }
  if(assets.frieze){
    const decorativeMat=new THREE.MeshStandardMaterial({map:assets.frieze,roughness:.83,transparent:true,depthWrite:false,side:THREE.DoubleSide});
    // Distinct 3D side-wall appliqués in the image's upper frieze band.
    for(const z of [.557,7.371]){
      const strip=new THREE.Mesh(new THREE.PlaneGeometry(35.72,.31),decorativeMat);
      strip.position.set(0,4.159,z);
      if(z>4)strip.rotation.y=Math.PI;
      hall.add(strip);
    }
  }
  // Floral ceiling ornaments for readability at walking distance.
  for(const x of coffers)for(const z of [1.3,6.6]) {
    ring(x,4.490,z,.105,.018,chalk);
    for(let i=0;i<7;i++){
      const a=i*Math.PI*2/7;oval(x+.075*Math.cos(a),4.475,z+.075*Math.sin(a),.045,.015,.03,white,8);
    }
  }

  // Full depth of the north opening — six pale marble columns and decorated capitals.
  function column(x,z,height=2.89,r=.24){
    const cy=F+.22+height/2;
    sq(x,F+.07,z,.72,.13,.72,bright);
    sq(x,F+.17,z,.58,.065,.58,ivory);
    rod(x,F+.26,z,r*1.22,r*1.33,.17,white,28);
    rod(x,cy,z,r,r*1.09,height,columnMat,36,true);
    // Narrow grooves imitate fluting (no flat cylindrical 'concrete' posts).
    for(let j=0;j<16;j++){
      const a=j*2*Math.PI/16,dx=Math.cos(a),dz=Math.sin(a);
      rod(x+dx*(r+.004),cy,z+dz*(r+.004),.014,.014,height-.15,white,7);
    }
    rod(x,F+.27+height+.075,z,r*1.22,r*.98,.17,white,28);
    rod(x,F+.27+height+.17,z,r*1.49,r*1.32,.06,chalk,28);
    sq(x,F+.27+height+.22,z,.72,.095,.65,ivory);
    for(const s of [-1,1]){
      const tor=new THREE.Mesh(new THREE.TorusGeometry(.105,.022,6,22,Math.PI*1.75),volute);
      tor.position.set(x+s*.205,F+.27+height+.09,z+.16);hall.add(tor);
    }
    obstacles.push({x,z,w:.56,d:.56});
  }
  for(const x of [-5.2,-3.25,-1.55,1.55,3.25,5.2])column(x,7.75,2.83,.235);
  sq(0,4.38,7.73,11.5,.21,.81,ivory);
  sq(0,4.50,7.73,11.7,.105,.91,bright);
  // Return columns on the two long walls are pilasters, not blocking the central runner.
  for(const x of [-12.1,-7.8,-3.8,3.8,7.8,12.1]){
    const z=7.42;
    if(Math.abs(x)<5.3)continue;
    sq(x,2.70,z,.37,3.06,.29,columnMat);
    sq(x,1.13,z,.54,.14,.44,white);
    sq(x,4.25,z,.60,.17,.47,ivory);
  }

  // Ends of corridor: classical framed portals. On X=-18 the old solid wall
  // was split in the index.html; therefore this aperture reveals a real 3D vista.
  function xPortal(x,z=3.95,face=1) {
    const s=face;
    for(const side of [-1,1]){
      sq(x+s*.09,2.32,z+side*1.24,.32,2.86,.27,columnMat);
      sq(x+s*.10,1.06,z+side*1.24,.39,.17,.34,ivory);
      sq(x+s*.10,3.80,z+side*1.24,.38,.16,.32,chalk);
    }
    sq(x+s*.10,3.79,z,.32,.19,2.85,bright);
    sq(x+s*.10,3.95,z,.36,.10,3.06,ivory);
    sq(x+s*.10,4.05,z,.32,.08,3.29,chalk);
  }
  xPortal(-17.73,3.95,1);
  // Scene behind the end doorway (3D), never a photo plane.
  sq(-19.15,.92,3.94,3.0,.024,3.55,polishedStone);
  for(const z of [2.54,5.34])sq(-19.45,2.70,z,3.0,3.48,.14,stoneWall);
  sq(-20.84,2.69,3.94,.13,3.58,2.77,stoneWall);
  sq(-19.5,4.55,3.94,3.15,.09,3.55,white);
  const curtain=new THREE.MeshStandardMaterial({color:0x9f7740,roughness:.95,side:THREE.DoubleSide});
  const windowGlass=new THREE.MeshBasicMaterial({color:0x9ac6da});
  sq(-20.76,2.70,3.94,.020,2.29,1.70,windowGlass);
  for(const z of [3.07,4.80])sq(-20.72,2.75,z,.045,2.38,.15,white);
  for(const y of [1.94,3.4])sq(-20.71,y,3.94,.045,.09,1.80,white);
  for(const z of [2.96,4.92]){
    for(let j=0;j<5;j++){
      const dz=(j-2)*.085;
      sq(-20.65,2.74,z+dz,.045,2.35,.07,curtain);
    }
  }
  sq(-20.63,3.95,3.94,.06,.34,2.3,curtain);
  for(let i=0;i<13;i++){
    const z=3.01+i*.155;
    const y=3.94-.24*Math.pow(Math.sin((i/12)*Math.PI),2);
    oval(-20.61,y,z,.067,.11,.088,curtain,10);
    if(i%2===0)oval(-20.60,y-.05,z,.054,.06,.07,antiqueGold,8);
  }
  // Open window sill and exterior-glow backdrop are recessed, never wall decals.
  sq(-20.70,1.58,3.94,.15,.11,1.94,white);
  // Floral centrepiece at the end: porcelain urn, leaves, small hydrangea clusters.
  const ceramic=new THREE.MeshStandardMaterial({color:0xe1e2dc,roughness:.27,metalness:.03});
  const foliage=new THREE.MeshStandardMaterial({color:0x3a5a36,roughness:.91});
  const flowers=new THREE.MeshStandardMaterial({color:0xf5f1e3,roughness:.87});
  obstacles.push({x:-19.84,z:3.93,w:.84,d:.84});
  rod(-19.84,1.27,3.93,.36,.31,.70,walnut,28);
  sq(-19.84,1.61,3.93,.78,.06,.78,antiqueGold);
  rod(-19.84,1.82,3.93,.18,.13,.37,ceramic,24);
  for(let i=0;i<18;i++){
    const a=i*Math.PI*2/18,h=2.00+rand()*.29,r=.12+rand()*.30;
    oval(-19.84+Math.cos(a)*r,h,3.93+Math.sin(a)*r,.14,.12,.14,i%3?flowers:foliage,10);
  }
  for(const side of [-1,1]){
    const px=-18.88,pz=3.93+side*1.28;
    sq(px,1.26,pz,.52,.08,.52,antiqueGold);
    rod(px,1.02,pz,.18,.22,.16,white,18);
    bouquet(px,1.17,pz,.48,true);
  }

  // East Room: offene Stirnverbindung. Die vorherige massive Holztür
  // überdeckte den gesamten Durchgang und wurde entfernt.
  xPortal(17.73,3.95,-1);
  for(const side of [-1,1]){
    const zz=3.95+side*1.17;
    sq(17.50,2.24,zz,.10,2.54,.075,walnut);
    for(const y of [1.60,2.26,2.92]){
      sq(17.45,y,zz,.035,.47,.068,antiqueGold);
    }
  }
  // Narrow low sconces cast a little warm bounce near the open vista.
  // This is localized; none of the existing exterior/sun lighting is changed.
  const vistaLight=new THREE.PointLight(0xffd9a8,1.25,5.5,2);
  vistaLight.position.set(-18.5,3.35,3.95);scene.add(vistaLight);
  // Main room doors: detailed dark walnut panels, but BEHIND the wall openings.
  // They read as partially open doors yet do not obstruct the three salons.
  for(const d of doors){
    for(const side of [-1,1]){
      const z=-.20;
      sq(d+side*.75,2.15,z,.105,2.43,.16,walnut);
      for(const y of [1.48,2.20,2.92]){
        sq(d+side*.75,y,z+.10,.065,.54,.10,antiqueGold);
        sq(d+side*.75,y,z+.16,.045,.45,.07,walnut);
      }
      oval(d+side*.57,2.16,z+.18,.035,.035,.022,brass);
    }
  }

  // Historical-inspired crystal chandeliers: 480 instanced glass jewels per fixture.
  const jewelGeom=new THREE.OctahedronGeometry(.038,0);
  const globeGeom=new THREE.SphereGeometry(.034,8,6);
  function chandelier(x,z){
    rod(x,4.42,z,.086,.078,.22,brass,16);
    path([[x,4.36,z],[x,3.77,z]],.020,antiqueGold,8);
    ring(x,3.73,z,.10,.03,gold);
    rod(x,3.57,z,.12,.14,.32,cutGlass,22);
    for(const radius of [.26,.54,.91]){
      ring(x,3.50-(radius*.29),z,radius,.026,gold);
    }
    const jewels=new THREE.InstancedMesh(jewelGeom,cutGlass,720);
    const obj=new THREE.Object3D();let id=0;
    for(let j=0;j<36;j++) {
      const a=j*Math.PI*2/36,dx=Math.sin(a),dz=Math.cos(a);
      for(let k=0;k<18;k++){
        const t=k/17;
        const r=.06+(.86-.06)*t;
        const height=3.62-.38*t-.28*Math.sin(t*Math.PI);
        obj.position.set(x+dx*r,height,z+dz*r);
        obj.scale.set(.55+.15*t,1.6+.18*Math.sin(t*6),.55+.1*t);
        obj.rotation.set(0,a,0);obj.updateMatrix();jewels.setMatrixAt(id++,obj.matrix);
      }
    }
    for(let k=0;k<72;k++){
      const a=k*Math.PI*2/72,r=.21+.32*rand();
      obj.position.set(x+Math.cos(a)*r,2.92+rand()*.16,z+Math.sin(a)*r);
      obj.scale.set(.56,1.25+rand(),.56);obj.updateMatrix();jewels.setMatrixAt(id++,obj.matrix);
    }
    jewels.instanceMatrix.needsUpdate=true;hall.add(jewels);
    // Sculpted curved bronze arms; twelve warm, candle-shaped LED bulbs.
    const flames=new THREE.InstancedMesh(globeGeom,lampGlass,16);
    for(let i=0;i<16;i++){
      const a=i*2*Math.PI/16,dx=Math.cos(a),dz=Math.sin(a);
      const r=1.02;
      path([[x,3.39,z],[x+dx*.50,3.06,z+dz*.50],
        [x+dx*.76,3.07,z+dz*.76],[x+dx*r,3.27,z+dz*r]],.022,gold,16);
      rod(x+dx*r,3.27,z+dz*r,.055,.059,.10,antiqueGold,11);
      rod(x+dx*r,3.37,z+dz*r,.034,.032,.16,white,10);
      obj.position.set(x+dx*r,3.48,z+dz*r);obj.scale.set(.55,1.7,.55);obj.updateMatrix();flames.setMatrixAt(i,obj.matrix);
    }
    flames.instanceMatrix.needsUpdate=true;hall.add(flames);
    rod(x,3.055,z,.18,.13,.29,cutGlass,24);
    oval(x,2.86,z,.10,.18,.10,cutGlass,14);
    const point=new THREE.PointLight(0xffead2,4.5,12,2);
    point.position.set(x,3.32,z);scene.add(point);
  }
  chandelier(-8.05,3.95);chandelier(8.05,3.95);

  function torchiere(x,z,handed=1) {
    const y=F;
    rod(x,y+.09,z,.19,.24,.18,antiqueGold,24);
    rod(x,y+.27,z,.13,.165,.22,brass,20);
    rod(x,y+.98,z,.044,.066,1.22,antiqueGold,20);
    for(const p of [-1,1])oval(x+p*.09,y+.24,z,.042,.035,.042,gold,12);
    rod(x,y+1.68,z,.080,.048,.24,antiqueGold,20);
    for(const k of [0,.32,.64])ring(x,y+.52+k,z,.046,.009,gold);
    for(let i=0;i<3;i++){
      const a=i*Math.PI*2/3;
      const xx=x+Math.cos(a)*.23,zz=z+Math.sin(a)*.23;
      path([[x,y+1.68,z],[xx,y+1.77,zz]],.022,antiqueGold,9);
      rod(xx,y+1.83,zz,.092,.080,.057,brass,12);
      oval(xx,y+1.92,zz,.079,.10,.079,lampGlass,12);
    }
    obstacles.push({x,z,w:.40,d:.42});
  }
  // Floor lamps stay on polished stone, never in front of doorways or in the runner.
  // Vier historische Standleuchten nur an den Endbereichen: keine vor Porträts,
  // keine direkt vor Türen, keine Kollision mit den GLB-Konsolen.
  for(const x of [-16.7,16.7])torchiere(x,6.90);
  for(const x of [-16.7,16.7])torchiere(x,.80);

  // Paired gilded wall sconces, inset between door frames. The luminous
  // shades are emissive; only two shared point lights are added to protect FPS.
  function wallSconce(x,z,side){
    const front=side===1?1:-1, y=2.92;
    sq(x,y,z+front*.047,.19,.45,.10,antiqueGold);
    oval(x,y+.21,z+front*.09,.11,.055,.075,gold,14);
    for(const a of [-1,1]){
      const px=x+a*.21,pz=z+front*.26;
      path([[x,y,z+front*.10],[x+a*.12,y+.07,z+front*.22],[px,y+.04,pz]],.021,antiqueGold,12);
      rod(px,y+.092,pz,.052,.061,.09,gold,12);
      rod(px,y+.20,pz,.028,.031,.18,white,10);
      oval(px,y+.32,pz,.030,.082,.034,lampGlass,12);
      oval(px,y+.21,pz,.037,.042,.039,brass,10);
    }
  }
  for(const x of [-11.3,-4.3,4.3,11.3]){
    // A wall at the near side: keep positions clear of doors and portraits.
    if(Math.min(...doors.map(d=>Math.abs(d-x)))>1.52)wallSconce(x,.40,1);
  }
  for(const x of [-11.35,11.35])wallSconce(x,7.48,-1);
  // Rich carved benches with visibly cushioned upholstery against walls.
  function settee(x,z,side=1){
    sq(x,1.26,z,1.73,.12,.55,gold,true);
    sq(x,1.36,z,1.65,.22,.51,brocade,true);
    sq(x,1.67,z-side*.21,1.57,.53,.16,brocade,true);
    for(const sx of [-.48,0,.48]){
      oval(x+sx,1.39,z,.28,.13,.27,brocade,16);
      path([[x+sx-.23,1.43,z+.18],[x+sx,1.45,z+.21],[x+sx+.23,1.43,z+.18]],.004,antiqueGold,12);
    }
    sq(x,1.80,z-side*.265,1.72,.09,.14,gold);
    for(const s of [-1,1]){
      sq(x+s*.78,1.40,z,.11,.36,.65,gold,true);
      oval(x+s*.78,1.69,z-side*.05,.11,.13,.27,gold,13);
      for(const zz of [z-.23,z+.23]){
        rod(x+s*.68,1.06,zz,.041,.046,.27,gold,12);
      }
    }
    for(const xx of [x-.48,x,x+.48])path([[xx,1.42,z-side*.20],[xx,1.57,z-side*.11]],.006,antiqueGold,7);
    // Carved crest rail with a curved gilded silhouette above the upholstery.
    path([[x-.68,1.83,z-side*.25],[x-.38,1.94,z-side*.29],
      [x,1.97,z-side*.30],[x+.38,1.94,z-side*.29],
      [x+.68,1.83,z-side*.25]],.019,gold,24);
    for(const xx of [x-.55,x-.27,x,x+.27,x+.55]){
      oval(xx,1.84,z-side*.31,.030,.053,.022,antiqueGold,10);
    }
    obstacles.push({x,z,w:1.76,d:.72});
  }
  // Korrigiert: Sitze dürfen die nördlichen Türöffnungen bei x=±9.10 nicht verdecken.
  settee(11.30,7.06,-1);settee(-11.30,7.06,-1);
  function bouquet(cx,cy,cz,scale=1,flowersOnly=false){
    const stem=new THREE.MeshStandardMaterial({color:0x5e6f4d,roughness:.82});
    const pot=new THREE.MeshStandardMaterial({color:0xe4e5df,roughness:.33});
    rod(cx,cy+.15*scale,cz,.13*scale,.10*scale,.28*scale,pot,16);
    for(let i=0;i<12;i++){
      const a=i*Math.PI*2/12,r=.04*scale+rand()*.18*scale;
      const px=cx+Math.cos(a)*r,pz=cz+Math.sin(a)*r,py=cy+.24*scale+rand()*.28*scale;
      path([[cx,cy+.18*scale,cz],[cx+(px-cx)*.48,cy+.35*scale,pz+(cz-pz)*.16],[px,py,pz]],.010*scale,stem,10);
      if(!flowersOnly&&i%3===0){
        oval(cx+(px-cx)*.60,cy+.30*scale,pz+(cz-pz)*.08,.05*scale,.025*scale,.08*scale,foliage,10);
      }
      const blossom=(i%4===0&&!flowersOnly)?foliage:flowers;
      oval(px,py,pz,.10*scale,.09*scale,.10*scale,blossom,10);
      oval(px+.018*scale,py+.016*scale,pz-.012*scale,.06*scale,.05*scale,.06*scale,flowers,8);
    }
  }
  function coffeeTable(x,z){
    sq(x,1.18,z,.92,.06,.42,antiqueGold,true);
    sq(x,1.23,z,.88,.03,.38,gold,true);
    for(const sx of [-1,1]) for(const sz of [-1,1]){ rod(x+sx*.32,.98,z+sz*.12,.024,.038,.35,gold,12,true); }
    bouquet(x,1.26,z,.55);
    obstacles.push({x,z,w:.94,d:.46});
  }
  function painting(x,z,front,kind='left',width=1.12,height=1.68){
    const sign=front?1:-1;
    const depth=z+sign*.05;
    sq(x,2.83,depth,width+.25,height+.25,.12,antiqueGold);
    sq(x,2.83,depth+sign*.075,width+.16,height+.17,.07,gold);
    sq(x,2.83,depth+sign*.111,width+.07,height+.08,.035,blackWood);
    const artMap=kind==='left'?(assets.portraitLeft||paintedPortrait('#525252','#756247'))
      :kind==='right'?(assets.portraitRight||paintedPortrait('#603f31','#92704d'))
      :paintedStillLife();
    const material=new THREE.MeshBasicMaterial({color:0xffffff,map:artMap,side:THREE.DoubleSide,toneMapped:false});
    const photo=new THREE.Mesh(new THREE.PlaneGeometry(width,height),material);
    photo.position.set(x,2.83,depth+sign*.162);
    photo.rotation.y=front?0:Math.PI;
    hall.add(photo);
    for(const s of [-1,1]){
      sq(x+s*(width/2+.102),2.83,depth+sign*.148,.055,height+.24,.055,antiqueGold);
      sq(x,2.83+s*(height/2+.1),depth+sign*.148,width+.24,.05,.055,antiqueGold);
    }
  }
  // Cross Hall console tables/vases replaced by imported GLB models in furniture V6.
  coffeeTable(10.55,6.22);
  coffeeTable(-10.45,6.22);

  // Portraits and decorative still lifes now render even if external image files fail.
  painting(12.85,7.51,false,'left',1.12,1.65);
  painting(-12.4,7.51,false,'still',.95,1.35);
  painting(12.9,.43,true,'right',1.09,1.65);
  painting(-12.5,.43,true,'still',.92,1.31);
  painting(5.65,.43,true,'still',.92,1.28);
  painting(-5.65,7.51,false,'still',.92,1.28);
  // Side doors on north wall are modelled as recesses only where the north wall is solid.
  for(const x of [-15.4,-9.10,9.10,15.4]){
    sq(x,2.30,7.49,1.44,2.56,.07,walnut);
    for(const y of [1.67,2.32,3.02]){
      sq(x,y,7.40,1.16,.49,.04,antiqueGold);
      sq(x,y,7.37,1.07,.42,.03,walnut);
    }
    for(const side of [-1,1])sq(x+side*.83,2.35,7.40,.15,2.82,.23,chalk);
    sq(x,3.76,7.39,1.85,.14,.29,white);
  }
  // Freeze decorative boxes into one draw call per finish. This is crucial for Safari/WebGL.
  const boxGeometry=new THREE.BoxGeometry(1,1,1);
  for(const [finish,pack] of boxBatches){
    for(const [casts,boxes] of [[false,pack.plain],[true,pack.shadow]]){
      if(!boxes.length)continue;
      const instance=new THREE.InstancedMesh(boxGeometry,finish,boxes.length);
      const unit=new THREE.Object3D();
      for(let i=0;i<boxes.length;i++){
        const [x,y,z,w,h,d]=boxes[i];
        unit.position.set(x,y,z);unit.scale.set(w,h,d);unit.updateMatrix();
        instance.setMatrixAt(i,unit.matrix);
      }
      instance.instanceMatrix.needsUpdate=true;
      instance.castShadow=casts;instance.receiveShadow=true;
      hall.add(instance);
    }
  }
  // Shared cylinder & cushion primitives (reduces draw calls compared with independent meshes).
  for(const [finish,mats] of cylinderBatches) for(const pack of mats.values()) {
    const geometry=new THREE.CylinderGeometry(pack.ratio,1,1,pack.segments);
    for(const [shadow,items] of [[false,pack.plain],[true,pack.shadow]]) {
      if(!items.length)continue;
      const batch=new THREE.InstancedMesh(geometry,finish,items.length),unit=new THREE.Object3D();
      items.forEach(([x,y,z,r,height],i)=>{unit.position.set(x,y,z);unit.scale.set(r,height,r);unit.updateMatrix();batch.setMatrixAt(i,unit.matrix)});
      batch.castShadow=shadow;batch.receiveShadow=true;batch.instanceMatrix.needsUpdate=true;hall.add(batch);
    }
  }
  for(const [finish,groups] of sphereBatches)for(const [segments,items] of groups){
    const batch=new THREE.InstancedMesh(new THREE.SphereGeometry(1,segments,12),finish,items.length);
    const unit=new THREE.Object3D();
    items.forEach(([x,y,z,rx,ry,rz],i)=>{unit.position.set(x,y,z);unit.scale.set(rx,ry,rz);unit.updateMatrix();batch.setMatrixAt(i,unit.matrix)});
    batch.instanceMatrix.needsUpdate=true;hall.add(batch);
  }
  // The room remains real three-dimensional geometry. Walls, torches, furniture and colonnade have collision zones.
  return hall;
}

/**
 * Local asset preloading is required so JPEG portraits do not flash white or
 * disappear on slow mobile connections. Failures fall back to generated material.
 */
export async function ladeCrossHallAssetsV5(THREE, renderer) {
  const definition={
    floor:'floor_marble_v3.jpg',wall:'wall_marble_v3.jpg',
    floorNormal:'floor_normal_v4.jpg',floorRoughness:'floor_roughness_v4.jpg',
    wallNormal:'wall_normal_v4.jpg',
    column:'column_marble_v3.jpg',
    rosette:'ceiling_rosette_v3.png',frieze:'carved_frieze_v3.png',
    portraitLeft:'portrait_links.jpg',portraitRight:'portrait_rechts.jpg'
  };
  const loader=new THREE.TextureLoader();
  const assets={};
  await Promise.all(Object.entries(definition).map(async ([key,file])=>{
    // GitHub upload workflows sometimes flatten asset folders into repository root.
    // Support both layouts so textures cannot silently vanish after an update.
    for(const folder of ['./assets/crosshall/','./']){
      try{
        const map=await loader.loadAsync(folder+file);
        map.colorSpace=/(Normal|Roughness)$/.test(key)?THREE.NoColorSpace:THREE.SRGBColorSpace;
        map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
        if(key!=='portraitLeft'&&key!=='portraitRight'){
          map.wrapS=THREE.RepeatWrapping;
          map.wrapT=THREE.RepeatWrapping;
        }
        if(key==='frieze')map.repeat.set(5,1);
        assets[key]=map;
        break;
      }catch(error){
        if(folder==='./')console.warn('Cross Hall – Textur an beiden Speicherorten nicht verfügbar:',file,error);
      }
    }
  }));
  return assets;
}

/** Collision planes for the actual walls, not only furniture. */
export function versperrtCrossHallV5(px,pz) {
  // Distinct from the full obstacle list: collision zones for the corridor's
  // THREE Southern entrances and the northern colonnade. The wall geometry at
  // both EAST/WEST ends is checked by the partition() obstacles in index.html.
  if(Math.abs(px)>17.79 || pz<-.32 || pz>8.20)return false;
  if(pz>=-.21 && pz<=.50){
    const southEntrance=[-7.2,0,7.2].some(cx=>Math.abs(px-cx)<.66);
    if(!southEntrance)return true;
  }
  // The original northern hall keeps a wide open central colonnade.
  if(pz>=7.38&&pz<=8.18&&Math.abs(px)>4.85)return true;
  return false;
}
