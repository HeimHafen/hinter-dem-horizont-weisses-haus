import * as THREE from 'three';
import {HAUS} from './bauplan.js';

/** Procedural 3D architectural study; published room relationships only. */
export function baueHaus() {
  const root=new THREE.Group();root.name='WH_A01_Architecture';
  const publicLevels=new Map(), facadeLevels=new Map();
  const exterior=new THREE.Group(),roofGroup=new THREE.Group();
  root.add(exterior,roofGroup);
  const paint=new THREE.MeshStandardMaterial({color:0xeee9de,roughness:.76});
  const plaster=new THREE.MeshStandardMaterial({color:0xf7f2e8,roughness:.82});
  const limestone=new THREE.MeshStandardMaterial({color:0xc8beb0,roughness:.85});
  const floorMat=new THREE.MeshStandardMaterial({color:0xb3ada3,roughness:.90});
  const trim=new THREE.MeshStandardMaterial({color:0xf5f0e5,roughness:.76});
  const wallInterior=new THREE.MeshStandardMaterial({color:0xddd5c9,roughness:.92});
  const windows=new THREE.MeshStandardMaterial({color:0x698390,transparent:true,opacity:.72,roughness:.32,metalness:.15});
  const roofMat=new THREE.MeshStandardMaterial({color:0x526262,roughness:.86});
  const labelMat=new THREE.MeshBasicMaterial({color:0xe6f2ea,transparent:true,opacity:.6,depthWrite:false});
  const floorShade={ground:0xc3b5a3,state:0xd4c7b4,second:0xc4ced2,third:0xc3cacd,sub1:0xaaa49c,sub2:0x999b9b};

  function mesh(group,shape,mat,x,y,z,name){const m=new THREE.Mesh(shape,mat);m.position.set(x,y,z);if(name)m.name=name;group.add(m);return m;}
  function box(group,x,y,z,w,h,d,mat=paint,name){return mesh(group,new THREE.BoxGeometry(w,h,d),mat,x,y,z,name);}
  function column(group,x,y,z,height,r=.24){
    mesh(group,new THREE.CylinderGeometry(r,r*.98,height,18),paint,x,y+height/2,z);
    box(group,x,y+.06,z,r*2.9,.13,r*2.9,plaster);
    box(group,x,y+height-.06,z,r*2.8,.13,r*2.8,plaster);
  }
  function lineZ(group,z,start,end,y,height,openings=[],mat=wallInterior){
    const sorted=openings.map(v=>[v[0]-v[1]/2,v[0]+v[1]/2]).sort((a,b)=>a[0]-b[0]);
    let cursor=start;
    for(const [a,b] of sorted){if(a>cursor+.01)box(group,(cursor+a)/2,y+height/2,z,a-cursor,height,.22,mat);cursor=Math.max(cursor,b);}
    if(cursor<end-.01)box(group,(cursor+end)/2,y+height/2,z,end-cursor,height,.22,mat);
  }
  function lineX(group,x,start,end,y,height,openings=[],mat=wallInterior){
    const sorted=openings.map(v=>[v[0]-v[1]/2,v[0]+v[1]/2]).sort((a,b)=>a[0]-b[0]);
    let cursor=start;
    for(const [a,b] of sorted){if(a>cursor+.01)box(group,x,y+height/2,(cursor+a)/2,.22,height,a-cursor,mat);cursor=Math.max(cursor,b);}
    if(cursor<end-.01)box(group,x,y+height/2,(cursor+end)/2,.22,height,end-cursor,mat);
  }
  function label(text,x,y,z){
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;
    const c=canvas.getContext('2d');c.font='bold 35px system-ui';
    c.textAlign='center';c.textBaseline='middle';
    c.fillStyle='#23312c';c.fillRect(0,0,512,96);
    c.fillStyle='#fff7ea';c.fillText(text,256,48,492);
    const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map,transparent:true,depthTest:false}));
    sprite.scale.set(5.4,1.0,1);sprite.position.set(x,y,z);sprite.renderOrder=200;return sprite;
  }
  const levels=HAUS.floors;
  for(const level of levels){
    const floorGroup=new THREE.Group();floorGroup.name='Floor_'+level.id;
    root.add(floorGroup);publicLevels.set(level.id,floorGroup);
    const mat=new THREE.MeshStandardMaterial({color:floorShade[level.id],roughness:.88,side:THREE.DoubleSide});
    box(floorGroup,0,level.y-.13,0,51.2,.26,26.1,mat,'Geschossdecke');
    const face=new THREE.Group();face.name='Facade_'+level.id;root.add(face);facadeLevels.set(level.id,face);
    if(level.id==='sub1'||level.id==='sub2')continue;
    const nY=level.id==='ground'?4.30:level.id==='state'?4.35:level.id==='second'?3.66:3.55;
    const windowH=level.id==='third'?1.28:level.id==='ground'?1.45:2.18;
    const sill=level.id==='ground'?1.10:level.id==='third'?1.18:.95;
    const windowWidth=level.id==='third'?1.1:1.65;
    const xs=[-22.9,-17.75,-12.6,-7.45,-2.3,2.3,7.45,12.6,17.75,22.9];
    const zs=[-9.65,-4.8,0,4.8,9.65];
    // Every exposed bay has actual architectural frames. Solid wall strips remain between.
    for(const z of [-13.05,13.05]){
      for(let i=0;i<xs.length;i++){
        const x=xs[i],bottom=level.y+.04;
        box(face,x,bottom+sill/2,z,windowWidth,sill,.20,level.id==='ground'?limestone:paint);
        box(face,x,level.y+sill+windowH+(nY-sill-windowH)/2,z,windowWidth,Math.max(.04,nY-sill-windowH),.20,paint);
        box(face,x,level.y+sill+windowH/2,z,windowWidth,windowH,.06,windows);
        for(const s of [-1,1])box(face,x+s*windowWidth/2,level.y+sill+windowH/2,z,.09,windowH+.16,.19,trim);
        for(const v of [sill,sill+windowH])box(face,x,level.y+v,z,windowWidth+.18,.10,.21,trim);
        box(face,x,level.y+sill+windowH/2,z+.115,.06,windowH,.035,trim);
        box(face,x,level.y+sill+windowH/2,z+.115,windowWidth,.045,.035,trim);
        const next=xs[i+1]??25.6,previous=xs[i-1]??-25.6;
        if(i<xs.length-1)box(face,(x+next)/2,level.y+nY/2,z,next-x-windowWidth,nY,.20,paint);
        if(i===0)box(face,(-25.6+x-windowWidth/2)/2,level.y+nY/2,z,x-windowWidth/2+25.6,nY,.20,paint);
        if(i===xs.length-1)box(face,(x+windowWidth/2+25.6)/2,level.y+nY/2,z,25.6-x-windowWidth/2,nY,.20,paint);
      }
    }
    for(const x of [-25.6,25.6]){
      const centers=[-9,-4.5,0,4.5,9];
      for(let i=0;i<centers.length;i++){
        const z=centers[i],y=level.y+sill+windowH/2;
        box(face,x,y,z,.07,windowH,windowWidth,windows);
        for(const s of [-1,1])box(face,x,y,z+s*windowWidth/2,.22,windowH,.09,trim);
        box(face,x,y,z,.11,.05,windowWidth,trim);
        const next=centers[i+1]??13.05;
        if(i<centers.length-1)box(face,x,level.y+nY/2,(z+next)/2,.20,nY,next-z-windowWidth,paint);
      }
    }
    // Rusticated lower course and horizontal stringcourses.
    if(level.id==='ground')for(let k=0;k<5;k++){
      const hh=level.y+.18+k*.75;
      for(const z of [-13.15,13.15])box(face,0,hh,z,51.3,.045,.14,limestone);
    }
    for(const z of [-13.18,13.18])box(face,0,level.y+nY-.07,z,51.42,.16,.45,trim);
  }
  function stateRooms(){
    const g=publicLevels.get('state'), y=4.35,h=3.25;
    // West dining / East room end walls, doors indicated by openings.
    lineX(g,-12.7,-13.0,13.0,y,h,[[3.0,2.5]]);
    lineX(g,13.2,-13.0,13.0,y,h,[[2.4,2.5]]);
    lineZ(g,1.05,-12.7,13.2,y,h,[[-8.3,1.6],[0,1.8],[8.2,1.6]]);
    lineZ(g,4.90,-12.7,13.2,y,h,[[0,13.3]]);
    lineX(g,-4.0,-13.0,1.05,y,h,[[-6.9,2.0]]);
    lineX(g,4.0,-13.0,1.05,y,h,[[-6.9,2.0]]);
    lineZ(g,3.0,-25.6,-12.7,y,h,[[-18.3,2.0]]);
    for(const x of [-6.2,-4.1,-2.0,0,2.0,4.1,6.2])column(g,x,y,4.9,h,.19);
    // The Blue Room is oval, rather than a fourth rectangular salon.
    const rx=3.87,rz=5.5,zc=-6.5;
    for(let a=.06;a<Math.PI*2-.05;a+=.12){
      const b=Math.min(a+.113,Math.PI*2),mx=(Math.sin(a)+Math.sin(b))*rx/2,mz=zc+(Math.cos(a)+Math.cos(b))*rz/2;
      if(Math.abs(mx)<1.0 && mz>-2.2)continue; // opening into the Cross Hall
      const length=Math.hypot(rx*(Math.sin(b)-Math.sin(a)),rz*(Math.cos(b)-Math.cos(a)));
      const wall=box(g,mx,y+h/2,mz,length,h,.18,wallInterior);
      wall.rotation.y=Math.atan2(rz*(Math.cos(b)-Math.cos(a)),rx*(Math.sin(b)-Math.sin(a)));
    }
    for(const room of HAUS.publicRooms.state)g.add(label(room.name,room.x,y+.50,room.z));
  }
  function groundRooms(){
    const g=publicLevels.get('ground'),y=0,h=3.4;
    lineZ(g,1.8,-24.6,24.6,y,h,[[-17,2.0],[-7,2.0],[2,1.9],[10.2,1.9],[19,1.9]]);
    for(const x of [-12.7,-2.9,6.0,14.7])lineX(g,x,-13.0,1.8,y,h);
    // Central oval reception room – non-measured outline.
    const zc=-5.5,xc=-7.0,rx=3.8,rz=4.2;
    for(let a=0;a<Math.PI*2;a+=.16){
      const b=a+.155,px=xc+rx*(Math.sin(a)+Math.sin(b))/2,pz=zc+rz*(Math.cos(a)+Math.cos(b))/2;
      if(Math.abs(px-xc)<1.0 && pz>-2.0)continue;
      const length=Math.hypot(rx*(Math.sin(b)-Math.sin(a)),rz*(Math.cos(b)-Math.cos(a)));
      const wall=box(g,px,y+h/2,pz,length,h,.16,wallInterior);
      wall.rotation.y=Math.atan2(rz*(Math.cos(b)-Math.cos(a)),rx*(Math.sin(b)-Math.sin(a)));
    }
    for(const room of HAUS.publicRooms.ground)g.add(label(room.name,room.x,y+.44,room.z));
  }
  stateRooms();groundRooms();
  // Published historic North Portico geometry – overall details approximated.
  const N=13.05,S=-13.05;
  box(exterior,0,4.25,N+2.6,13.1,.40,5.2,limestone,'North Portico Deck');
  for(const x of [-5.4,-1.8,1.8,5.4])column(exterior,x,4.25,N+4.15,8.3,.28);
  for(const x of [-5.4,5.4])column(exterior,x,4.25,N+1.7,8.3,.28);
  box(exterior,0,12.53,N+4.15,13.4,.49,1.6,trim);
  // Pediment, white triangular pediment above the north portico.
  const tri=new THREE.Shape();tri.moveTo(-7.5,0);tri.lineTo(0,2.0);tri.lineTo(7.5,0);tri.closePath();
  const ped=new THREE.Mesh(new THREE.ExtrudeGeometry(tri,{depth:.45,bevelEnabled:false}),paint);
  ped.position.set(0,12.8,N+4.15);exterior.add(ped);
  // South Portico: curved porch approx. 18.6 m wide, six columns.
  const southRadius=8.2;
  for(let i=0;i<6;i++){
    const a=Math.PI*(.17+i*.132);
    const x=Math.cos(a)*southRadius,z=S-Math.sin(a)*6.0;
    column(exterior,x,4.24,z,7.8,.27);
  }
  const southShape=new THREE.Shape();
  southShape.moveTo(-8.85,S);southShape.lineTo(8.85,S);
  for(let i=0;i<=24;i++){
    const a=Math.PI*i/24;
    southShape.lineTo(8.85*Math.cos(a),S-6.25*Math.sin(a));
  }
  const platform=new THREE.Mesh(new THREE.ExtrudeGeometry(southShape,{depth:.32,bevelEnabled:false}),limestone);
  platform.rotation.x=Math.PI/2;platform.position.set(0,4.18,0);exterior.add(platform);
  // Truman Balcony on the South Portico. No private access route is modelled.
  const balcony=new THREE.Mesh(new THREE.ExtrudeGeometry(southShape,{depth:.20,bevelEnabled:false}),trim);
  balcony.rotation.x=Math.PI/2;balcony.position.set(0,8.65,0);exterior.add(balcony);
  for(let i=0;i<=24;i++){
    const a=Math.PI*i/24,x=8.85*Math.cos(a),z=S-6.25*Math.sin(a);
    column(exterior,x,8.85,z,.92,.055);
  }
  // Visible twin outer stairs (publicly observable portico). Approximation, not survey.
  for(const side of [-1,1])for(let i=0;i<14;i++){
    const t=(i+.5)/14,theta=side*(.20+1.07*t);
    const x=side*(7.3+4.0*t),z=S-2.3+3.0*t;
    box(exterior,x,(i+.5)*.30,z,1.8,.27,1.15,limestone);
  }
  // Roof and parapet – no unsupported floor plan of the private residence.
  box(roofGroup,0,16.70,0,51.6,.25,26.3,roofMat,'Roof slab');
  for(const z of [-13.1,13.1])box(roofGroup,0,17.15,z,51.55,.90,.24,trim);
  for(const x of [-25.7,25.7])box(roofGroup,x,17.15,0,.24,.90,26.35,trim);
  for(const x of [-21.2,-14.5,14.5,21.2])for(const z of [-7.8,7.8])box(roofGroup,x,17.6,z,.75,1.7,.75,paint,'Chimney schematic');
  const groundPlane=new THREE.Group();root.add(groundPlane);
  box(groundPlane,0,-.30,0,77,.20,62,new THREE.MeshStandardMaterial({color:0x62735f,roughness:1}),'Site neutral');
  // Minimal axes for orientation, not survey axes.
  const axes=new THREE.AxesHelper(3.5);axes.position.set(-32,.12,-20);groundPlane.add(axes);
  function setLevel(id){
    const outside=id==='outside';
    for(const [name,g] of publicLevels){g.visible=!outside&&name===id;}
    for(const [,g] of facadeLevels){g.visible=outside;}
    exterior.visible=outside;roofGroup.visible=outside;
    groundPlane.visible=outside;
    return HAUS.floors.find(v=>v.id===id)||null;
  }
  setLevel('outside');
  return {root,setLevel,HAUS,levels:publicLevels,facades:facadeLevels};
}
