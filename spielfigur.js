export function baueSpielfigur(THREE,scene){
  const root=new THREE.Group();
  scene.add(root);
  const material=(color,roughness=.86,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const cloth=material(0x222b34), folds=material(0x34414d), wrap=material(0x161c23);
  const leather=material(0x352d27,.69), sole=material(0x151819);
  const skin=material(0xb78c71,.73), eyes=material(0x292524,.43), clasp=material(0x8c7650,.39,.62);
  const sphere=new THREE.SphereGeometry(1,24,16);
  function oval(parent,mat,x,y,z,sx,sy,sz){
    const part=new THREE.Mesh(sphere,mat);
    part.position.set(x,y,z);part.scale.set(sx,sy,sz);
    part.castShadow=part.receiveShadow=true;
    parent.add(part);
    return part;
  }
  function joint(parent,x,y,z){
    const group=new THREE.Group();
    group.position.set(x,y,z);
    parent.add(group);
    return group;
  }
  const fabric=document.createElement('canvas');
  fabric.width=fabric.height=128;
  const ctx=fabric.getContext('2d');
  const pixels=ctx.createImageData(128,128);
  for(let y=0;y<128;y++)for(let x=0;x<128;x++){
    const v=224+14*Math.sin(x*Math.PI*.5)+10*Math.cos(y*Math.PI*.5)+6*Math.sin(x*1.13+y*.81);
    pixels.data.set([v,v,v,255],(y*128+x)*4);
  }
  ctx.putImageData(pixels,0,0);
  const weave=new THREE.CanvasTexture(fabric);
  weave.wrapS=weave.wrapT=THREE.RepeatWrapping;
  weave.repeat.set(2,3);
  weave.colorSpace=THREE.SRGBColorSpace;
  for(const textile of [cloth,folds,wrap]){
    textile.map=weave;
    textile.bumpMap=weave;
    textile.bumpScale=.0014;
  }

  // A continuous garment surface bent around the actual limb joints.
  function garment(parent,mat,profile){
    const sides=24, rings=profile.length;
    const geometry=new THREE.BufferGeometry();
    const points=new THREE.BufferAttribute(new Float32Array(rings*sides*3),3);
    points.setUsage(THREE.DynamicDrawUsage);
    const uv=[], indices=[];
    for(let j=0;j<rings;j++)for(let k=0;k<sides;k++){
      uv.push(k/sides,j/(rings-1));
      if(j===rings-1)continue;
      const a=j*sides+k,b=j*sides+(k+1)%sides;
      indices.push(a,b,a+sides,b,b+sides,a+sides);
    }
    geometry.setAttribute('position',points);
    geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
    geometry.setIndex(indices);
    const mesh=new THREE.Mesh(geometry,mat);
    mesh.castShadow=mesh.receiveShadow=true;
    mesh.frustumCulled=false;
    parent.add(mesh);
    function pose(angle=0,pivot=-1){
      for(let j=0;j<rings;j++){
        const [y,rx,rz,cx=0,cz=0]=profile[j];
        const t=THREE.MathUtils.smoothstep(pivot-y,-.065,.065);
        const a=angle*t;
        const b=Math.abs(pivot)>1?0:y-pivot;
        for(let k=0;k<sides;k++){
          const theta=k*Math.PI*2/sides;
          const fold=1+.035*Math.cos(theta*7+j*.93)+.027*Math.sin(theta*4-j*1.12);
          const z=cz+Math.sin(theta)*rz*fold;
          points.setXYZ(j*sides+k,cx+Math.cos(theta)*rx*fold,
            y+b*(Math.cos(a)-1)-z*Math.sin(a),z*Math.cos(a)+b*Math.sin(a));
        }
      }
      points.needsUpdate=true;
      geometry.computeVertexNormals();
    }
    pose();
    return pose;
  }
  const body=joint(root,0,.89,0);
  garment(body,cloth,[
    [.625,.10,.085],[.58,.159,.112],[.52,.229,.131],[.43,.231,.142],
    [.32,.207,.139],[.23,.183,.126],[.13,.179,.123],[.06,.198,.139],
    [-.035,.224,.150],[-.12,.221,.148],[-.145,.211,.136]
  ]);
  oval(body,leather,0,.116,0,.227,.057,.147);
  oval(body,clasp,.065,.12,-.144,.064,.039,.013);
  oval(body,wrap,0,.633,0,.103,.107,.091);
  for(const side of [-1,1]){
    const lapel=oval(body,side===1?cloth:folds,side*.056,.371,-.133,.066,.235,.024);
    lapel.rotation.z=side*.33;

  }
  const head=joint(body,0,.735,0);
  oval(head,cloth,0,.055,.006,.124,.164,.113);
  oval(head,skin,0,.057,-.084,.101,.069,.043);
  oval(head,wrap,0,.023,-.101,.108,.052,.034);
  oval(head,folds,0,.105,-.077,.106,.033,.047);
  for(const side of [-1,1]){
    oval(head,eyes,side*.043,.072,-.121,.024,.007,.009);
    const brow=oval(head,wrap,side*.045,.087,-.121,.028,.005,.008);
    brow.rotation.z=side*.12;
  }
  const legs=[],arms=[];
  for(const side of [-1,1]){
    const thigh=joint(body,side*.112,-.015,0);
    const trousers=garment(thigh,cloth,[
      [.045,.096,.103],[-.06,.111,.109],[-.15,.106,.10],[-.24,.096,.09],
      [-.34,.085,.081],[-.415,.078,.075],[-.49,.074,.077],
      [-.58,.071,.075],[-.67,.064,.062],[-.77,.052,.050]
    ]);
    const shin=joint(thigh,0,-.415,0);

    for(let i=0;i<4;i++)oval(shin,wrap,0,-.17-i*.049,0,.074-i*.003,.027,.072-i*.002);
    oval(shin,leather,0,-.391,-.061,.073,.058,.126);
    oval(shin,sole,0,-.422,-.062,.074,.031,.128);
    legs.push({thigh,shin,trousers});
    const arm=joint(body,side*.237,.468,0);
    arm.rotation.z=side*.12;
    const sleeve=garment(arm,cloth,[
      [.071,.029,.043], [.028,.082,.078],[-.065,.092,.086,side*.011],
      [-.145,.083,.078,side*.022],[-.226,.071,.066,side*.035],
      [-.271,.063,.062,side*.046],[-.33,.067,.063,side*.046],
      [-.40,.061,.058,side*.046],[-.47,.052,.048,side*.046],[-.502,.047,.044,side*.046]
    ]);
    const forearm=joint(arm,side*.046,-.271,0);

    oval(forearm,leather,0,-.252,-.011,.056,.09,.055);
    arms.push({arm,forearm,sleeve});
  }
  let cycle=0,amount=0;
  return {root,animate(dt,speed){
    amount=THREE.MathUtils.lerp(amount,Math.min(1,speed/2.8),1-Math.exp(-dt*11));
    cycle+=speed*dt*4;
    body.position.y=.9+Math.abs(Math.sin(cycle))*.028*amount;
    body.rotation.z=Math.sin(cycle)*.026*amount;
    head.rotation.z=-body.rotation.z*.65;
    for(let i=0;i<2;i++){
      const stride=Math.sin(cycle+i*Math.PI);
      legs[i].thigh.rotation.x=stride*.48*amount;
      legs[i].shin.rotation.x=-Math.max(0,stride)*.62*amount;
      arms[i].arm.rotation.x=-stride*.33*amount;
      arms[i].forearm.rotation.x=.12+Math.max(0,-stride)*.30*amount;
      arms[i].sleeve(arms[i].forearm.rotation.x,-.271);
      legs[i].trousers(legs[i].shin.rotation.x,-.415);
    }
  }};
}
