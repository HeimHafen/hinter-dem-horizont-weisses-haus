/* Hinter dem Horizont | Architektur A0.1.1
 * Lokaler 3D-Fallback ohne Netzwerkbibliothek (Canvas-3D-Projektion).
 * Geometrie ist eine schematische Architekturstudie, keine vermessene Rekonstruktion.
 */
(()=>{
  'use strict';
  const SCENE=document.querySelector('#scene');
  const STATUS=document.querySelector('#status');
  const FLOOR=document.querySelector('#floor');
  const TOP=document.querySelector('#top-view');
  if(!SCENE||!STATUS||!FLOOR||!TOP)return;
  let running=false,stopped=false,canvas,ctx,mode='outside',radius=112,angle=-.72,elevation=1.12,topDown=false;
  let drag=new Map(),pinch=null,scene=[];const listeners=[];
  const palette={white:'#eee8de',cream:'#f8f1e6',stone:'#c6bbad',blue:'#607e8c',roof:'#647170',grass:'#60735f',sand:'#bcb5aa',wall:'#d9cfbf',trim:'#f4eee4',dark:'#514c43',floor:'#b9aea2',interior:'#cbbca7'};
  const byLevel={ground:0,state:4.35,second:8.75,third:12.5,sub1:-3.2,sub2:-6.6};
  const publicRooms={
    state:[['State Dining Room',-19.15,-6.5,12.6,12.6],['Family Dining Room',-19.15,7.3,12.6,10],['Red Room',-8.5,-6.5,8.7,11],['Blue Room',0,-6.5,8.2,11],['Green Room',8.5,-6.5,8.7,11],['Cross Hall',0,2.15,25,4.2],['Entrance Hall',0,8.3,14,8],['East Room',19.45,0,12.3,25]],
    ground:[['Map Room',-17.5,-5.2,8,10],['Diplomatic Reception Room',-7,-5.6,9,9],['China Room',2,-5.6,7,9],['Vermeil Room',10.2,-5.6,8,9],['Library',19.2,-5.6,10,9],['Ground Floor Corridor',0,4.7,44,4]]
  };
  const addPoly=(v,c,k=1)=>scene.push({v,c,k});
  function box(x,y,z,w,h,d,color){
    const a=x-w/2,b=x+w/2,lo=y-h/2,hi=y+h/2,q=z-d/2,r=z+d/2;
    const v=[[a,lo,q],[b,lo,q],[b,hi,q],[a,hi,q],[a,lo,r],[b,lo,r],[b,hi,r],[a,hi,r]];
    const faces=[[[0,1,2,3],.70],[[5,4,7,6],.82],[[4,0,3,7],.88],[[1,5,6,2],.76],[[3,2,6,7],1.18],[[4,5,1,0],.55]];
    for(const [ids,k] of faces)addPoly(ids.map(i=>v[i]),color,k);
  }
  function rod(x,y,z,r,h,color,n=10){
    const poly=[];for(let i=0;i<n;i++){const a=i*Math.PI*2/n;poly.push([x+Math.cos(a)*r,y,z+Math.sin(a)*r]);}
    for(let i=0;i<n;i++){
      const j=(i+1)%n;
      addPoly([poly[i],poly[j],[poly[j][0],y+h,poly[j][2]],[poly[i][0],y+h,poly[i][2]]],color,.74+(i/n)*.31);
    }
    addPoly(poly.map(p=>[p[0],y+h,p[2]]),color,1.16);
  }
  function column(x,y,z,height=.1,r=.27){
    box(x,y+.07,z,r*3,.14,r*3,palette.cream);
    rod(x,y+.14,z,r,height-.3,palette.white,12);
    box(x,y+height-.08,z,r*3.1,.16,r*3.1,palette.cream);
  }
  function wallZ(z,a,b,y,h,openings=[]){
    const sorted=openings.map(([center,w])=>[center-w/2,center+w/2]).sort((a,b)=>a[0]-b[0]);
    let cursor=a;
    for(const [s,e] of sorted){if(s>cursor+.01)box((cursor+s)/2,y+h/2,z,s-cursor,h,.23,palette.wall);cursor=Math.max(cursor,e);}
    if(cursor<b-.01)box((cursor+b)/2,y+h/2,z,b-cursor,h,.23,palette.wall);
  }
  function wallX(x,a,b,y,h,openings=[]){
    const sorted=openings.map(([center,w])=>[center-w/2,center+w/2]).sort((a,b)=>a[0]-b[0]);
    let cursor=a;
    for(const [s,e] of sorted){if(s>cursor+.01)box(x,y+h/2,(cursor+s)/2,.23,h,s-cursor,palette.wall);cursor=Math.max(cursor,e);}
    if(cursor<b-.01)box(x,y+h/2,(cursor+b)/2,.23,h,b-cursor,palette.wall);
  }
  function exterior(){
    box(0,-.42,0,78,.3,66,palette.grass);
    const levels=[[0,4.3],[4.3,4.35],[8.65,3.83],[12.48,4.02]];
    for(let levelIndex=0;levelIndex<levels.length;levelIndex++){
      const [bottom,h]=levels[levelIndex],sill=levelIndex===0?1.16:.92,wh=levelIndex===0?1.54:levelIndex===3?1.45:2.17,ww=levelIndex===3?1.26:1.67;
      const xs=[-22.6,-17.6,-12.5,-7.5,-2.4,2.4,7.5,12.5,17.6,22.6];
      for(const z of [-13.05,13.05]){
        const zz=z+Math.sign(z)*.15;
        for(let i=0;i<xs.length;i++){
          const x=xs[i],wallTop=Math.max(.35,h-sill-wh);
          box(x,bottom+sill/2,z,ww,sill,.25,palette.white);
          box(x,bottom+sill+wh+wallTop/2,z,ww,wallTop,.25,palette.white);
          box(x,bottom+sill+wh/2,zz,ww-.17,wh,.025,palette.blue);
          box(x,bottom+sill+wh/2,zz+Math.sign(z)*.028,.055,wh,.045,palette.cream);
          box(x,bottom+sill+wh/2,zz+Math.sign(z)*.028,ww,.055,.045,palette.cream);
          box(x,bottom+sill,zz,.18,.11,.39,palette.stone);
          if(i===0)box((-25.6+x-ww/2)/2,bottom+h/2,z,(x-ww/2)+25.6,h,.24,palette.white);
          if(i<xs.length-1){const next=xs[i+1];box((x+next)/2,bottom+h/2,z,next-x-ww,h,.24,palette.white);}
          if(i===xs.length-1)box((x+ww/2+25.6)/2,bottom+h/2,z,25.6-x-ww/2,h,.24,palette.white);
        }
        box(0,bottom+h-.08,z,51.5,.16,.42,palette.trim);
      }
      const zs=[-10,-5,0,5,10];
      for(const x of [-25.6,25.6]){
        for(let j=0;j<zs.length;j++){
          const z=zs[j],side=Math.sign(x),wx=x+side*.14,ww2=ww;
          box(x,bottom+sill/2,z,.24,sill,ww2,palette.white);
          box(x,bottom+sill+wh+(h-sill-wh)/2,z,.24,h-sill-wh,ww2,palette.white);
          box(wx,bottom+sill+wh/2,z,.025,wh,ww2-.12,palette.blue);
          box(wx+side*.028,bottom+sill+wh/2,z,.040,wh,.045,palette.trim);
          if(j===0)box(x,bottom+h/2,(-13.05+z-ww2/2)/2,.22,h,z-ww2/2+13.05,palette.white);
          if(j<zs.length-1)box(x,bottom+h/2,(z+zs[j+1])/2,.22,h,zs[j+1]-z-ww2,palette.white);
          if(j===zs.length-1)box(x,bottom+h/2,(z+ww2/2+13.05)/2,.22,h,13.05-z-ww2/2,palette.white);
        }
      }
      box(0,bottom+.11,0,51.35,.22,26.2,palette.stone);
    }
    box(0,16.63,0,51.7,.25,26.5,palette.roof);
    for(const z of [-13.15,13.15])box(0,17.03,z,51.7,.7,.28,palette.trim);
    for(const x of [-25.72,25.72])box(x,17.03,0,.28,.7,26.6,palette.trim);
    for(const x of [-21,-14.5,14.5,21])for(const z of [-7.8,7.8])box(x,17.55,z,.76,1.4,.76,palette.stone);
    // Public North Portico: pilasters, columns and classical pediment.
    box(0,4.18,16.25,13.5,.32,6.25,palette.stone);
    for(const x of [-5.4,-1.8,1.8,5.4])column(x,4.32,17.45,8.25,.27);
    for(const x of [-5.4,5.4])column(x,4.32,14.75,8.25,.26);
    box(0,12.61,17.45,13.4,.44,1.65,palette.trim);
    addPoly([[-7.2,12.83,18.25],[7.2,12.83,18.25],[0,14.75,18.25]],palette.white,.95);
    // South Portico and curved balcony.
    for(let i=0;i<6;i++){
      const a=Math.PI*(.13+i*.148),x=Math.cos(a)*8.1,z=-13.05-6.2*Math.sin(a);
      column(x,4.25,z,7.9,.27);
    }
    box(0,4.15,-15.0,16,.3,4.1,palette.stone);
    box(0,8.69,-14.4,17.5,.22,3.4,palette.cream);
    for(let i=0;i<=16;i++){
      const a=Math.PI*i/16,x=8.55*Math.cos(a),z=-13.05-5.75*Math.sin(a);
      rod(x,8.80,z,.07,.80,palette.trim,8);
    }
  }
  function interior(level){
    const y=byLevel[level]||0;
    box(0,y-.15,0,51.2,.3,26.1,palette.floor);
    for(const zz of [-13.05,13.05])box(0,y+1.38,zz,51.2,2.76,.13,palette.stone);
    for(const xx of [-25.6,25.6])box(xx,y+1.38,0,.13,2.76,26.1,palette.stone);
    if(level==='state'){
      wallX(-12.7,-13.0,13.0,y,2.65,[[3.0,2.5]]);
      wallX(13.2,-13.0,13.0,y,2.65,[[2.4,2.5]]);
      wallZ(1.05,-12.7,13.2,y,2.65,[[-8.3,1.6],[0,1.8],[8.2,1.6]]);
      wallZ(4.9,-12.7,13.2,y,2.65,[[0,13.3]]);
      wallX(-4.0,-13,1.05,y,2.65,[[-6.9,2.0]]);
      wallX(4.0,-13,1.05,y,2.65,[[-6.9,2.0]]);
      for(const x of [-6.2,-4.1,-2.0,0,2.0,4.1,6.2])column(x,y,4.9,2.6,.16);
    }
    if(level==='ground'){
      wallZ(1.8,-24.6,24.6,y,2.65,[[-17,2],[-7,2],[2,1.9],[10.2,1.9],[19,1.9]]);
      for(const x of [-12.7,-2.9,6.0,14.7])wallX(x,-13,1.8,y,2.65);
    }
  }
  const addListener=(target,type,fn,opts)=>{target.addEventListener(type,fn,opts);listeners.push([target,type,fn]);};
  let projectedLabels=[];
  const vector=(v)=>Math.hypot(...v);
  const sub=(a,b)=>a.map((v,i)=>v-b[i]);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const normal=v=>{const l=vector(v)||1;return v.map(x=>x/l);};
  function tint(c,f){
    const hex=c.replace('#','');const r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
    const x=n=>Math.min(255,Math.max(0,Math.round(n*f)));
    return `rgb(${x(r)},${x(g)},${x(b)})`;
  }
  function project(p,camera,forward,right,up,w,h,f){
    const delta=sub(p,camera),d=delta[0]*forward[0]+delta[1]*forward[1]+delta[2]*forward[2];
    if(d<.2)return null;
    return [(w/2)+(delta[0]*right[0]+delta[1]*right[1]+delta[2]*right[2])*f/d,
      (h/2)-(delta[0]*up[0]+delta[1]*up[1]+delta[2]*up[2])*f/d,d];
  }
  function draw(){
    if(!running||!ctx)return;
    const w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(1.7,devicePixelRatio||1);
    canvas.width=Math.max(1,Math.round(w*dpr));canvas.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle='#aebfc9';ctx.fillRect(0,0,w,h);
    const target=[0,mode==='outside'?7.6:(byLevel[mode]||0)+.10,0];
    const e=Math.max(.045,Math.min(2.70,elevation));
    const camera=[target[0]+radius*Math.sin(e)*Math.cos(angle),target[1]+radius*Math.cos(e),target[2]+radius*Math.sin(e)*Math.sin(angle)];
    const forward=normal(sub(target,camera)),right=normal(cross(forward,[0,1,0]));
    const up=normal(cross(right,forward)),f=h/(2*Math.tan(27*Math.PI/180));
    const polygons=[];
    for(const poly of scene){
      const pts=poly.v.map(v=>project(v,camera,forward,right,up,w,h,f));
      if(pts.some(p=>!p))continue;
      const depth=pts.reduce((a,p)=>a+p[2],0)/pts.length;
      polygons.push({pts,c:poly.c,k:poly.k,depth});
    }
    polygons.sort((a,b)=>b.depth-a.depth);
    ctx.lineJoin='round';ctx.lineWidth=.33;
    for(const poly of polygons){
      ctx.beginPath();for(let i=0;i<poly.pts.length;i++){const [x,y]=poly.pts[i];i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}
      ctx.closePath();ctx.fillStyle=tint(poly.c,poly.k);ctx.fill();ctx.strokeStyle='rgba(58,60,54,.15)';ctx.stroke();
    }
    if(mode==='state'||mode==='ground'){
      ctx.font='bold 11px -apple-system, system-ui, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      for(const [name,x,z] of publicRooms[mode]){
        const p=project([x,(byLevel[mode]||0)+.07,z],camera,forward,right,up,w,h,f);
        if(!p)continue;
        const measured=ctx.measureText(name).width;
        ctx.fillStyle='rgba(27,43,36,.84)';ctx.fillRect(p[0]-measured/2-6,p[1]-11,measured+12,22);
        ctx.fillStyle='#f4edde';ctx.fillText(name,p[0],p[1]);
      }
    }
  }
  function selectLevel(value){
    mode=Object.hasOwn(byLevel,value)?value:'outside';scene=[];
    if(mode==='outside')exterior();else interior(mode);
    topDown=mode!=='outside';elevation=topDown?.16:1.10;angle=-.72;
    radius=innerWidth<650?(mode==='outside'?129:116):(mode==='outside'?96:87);
    TOP.textContent=topDown?'Schrägansicht':'Draufsicht';
    STATUS.textContent=mode==='outside'
      ?'Lokale 3D-Ansicht aktiv · Architekturentwurf A0.1.1 · Haus drehen oder zoomen.'
      :((mode==='state'||mode==='ground')?'Schematische Raumwände · keine vermessenen Innenpläne.':'Nur Geschosshülle – private Räume nicht nachgebildet.');
    draw();
  }
  function pointerDown(e){canvas.setPointerCapture(e.pointerId);drag.set(e.pointerId,{x:e.clientX,y:e.clientY});}
  function pointerMove(e){
    if(!drag.has(e.pointerId))return;
    const prev=drag.get(e.pointerId),dx=e.clientX-prev.x,dy=e.clientY-prev.y;
    drag.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(drag.size===1){angle-=dx*.007;elevation=Math.max(.045,Math.min(2.7,elevation-dy*.006));draw();}
    else if(drag.size===2){const [p,q]=[...drag.values()],d=Math.hypot(p.x-q.x,p.y-q.y);if(pinch){radius=Math.max(32,Math.min(200,radius*pinch/d));draw();}pinch=d;}
  }
  function pointerEnd(e){drag.delete(e.pointerId);if(drag.size<2)pinch=null;}
  function start(){
    if(stopped||running||window.__architecture3DReady)return;
    running=true;canvas=document.createElement('canvas');canvas.id='local-3d-fallback';canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;';
    SCENE.appendChild(canvas);ctx=canvas.getContext('2d',{alpha:false});
    if(!ctx){STATUS.textContent='Die 3D-Ansicht wird von diesem Browser nicht unterstützt.';return;}
    FLOOR.value=FLOOR.value||'outside';selectLevel(FLOOR.value);
    addListener(FLOOR,'change',()=>selectLevel(FLOOR.value));
    addListener(TOP,'click',()=>{topDown=!topDown;elevation=topDown?.08:1.10;TOP.textContent=topDown?'Schrägansicht':'Draufsicht';draw();});
    addListener(canvas,'pointerdown',pointerDown);addListener(canvas,'pointermove',pointerMove);
    addListener(canvas,'pointerup',pointerEnd);addListener(canvas,'pointercancel',pointerEnd);
    addListener(canvas,'wheel',e=>{e.preventDefault();radius=Math.max(32,Math.min(200,radius*(e.deltaY>0?1.08:.92)));draw();},{passive:false});
    addListener(window,'resize',draw);
    console.info('Cross Hall A0.1.1: lokaler 3D-Fallback gestartet (CDN-Modul noch nicht verfügbar).');
  }
  function stop(){
    stopped=true;running=false;for(const [t,event,fn] of listeners)t.removeEventListener(event,fn);
    canvas?.remove();
  }
  window.__architectureFallback={start,stop,get active(){return running;}};
  // Non-blocking start: if Three.js does not resolve on mobile, show local model.
  setTimeout(start,1800);
  addListener(window,'unhandledrejection',ev=>{
    console.warn('Architektur-Bibliothek konnte nicht geladen werden:',ev.reason);
    if(!window.__architecture3DReady)start();
  });
})();
