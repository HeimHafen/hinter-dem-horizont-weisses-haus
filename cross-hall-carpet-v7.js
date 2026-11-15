/**
 * Hinter dem Horizont – CROSS HALL TEPPICH V7 ONLY.
 * Eigenstaendiger Y-up GLB Teppich auf genau der bereits bestehenden Cross-Hall-Achse.
 * Sichtbare 3D-Dicke, echte gefasste Naehte und Reliefmuster; microskopischer Flor
 * ueber PBR-Normalmap + wenige Instanzen ausschliesslich im Nahbereich.
 * Keine Aenderung an Moebeln, Wänden, Spielfigur, Tuerlogik oder Kollisionen.
 */
export async function ladeCrossHallTeppichV7(THREE, gltfLoader, exterior, renderer) {
  const base = './assets/crosshall/carpet_v7/';
  const filename = 'CrossHall_Teppich_V7_REAL3D.glb';
  let root;
  try {
    root = (await gltfLoader.loadAsync(base + filename)).scene;
  } catch (error) {
    // Zweiter Suchpfad, falls Dateien beim manuellen GitHub-Upload im Repo-Root landen.
    try {
      root = (await gltfLoader.loadAsync('./' + filename)).scene;
    } catch (alsoFailed) {
      console.error('Cross Hall V7: Teppich-GLB fehlt. Im Ordner assets/crosshall/carpet_v7/ ablegen.',error,alsoFailed);
      const label=document.querySelector('#place');
      if(label)label.textContent += ' · 3D-Teppich fehlt';
      return {root:null, update() {}};
    }
  }
  root.name='CrossHall_Teppich_V7_ECHTES_3D';
  // Cross Hall: Flur entlang X, Teppich-Mittelachse bei Z=3.95, Oberkante Marmor Y≈.928.
  root.position.set(0,.929,3.95);
  root.traverse(node=>{
    if(!node.isMesh)return;
    node.receiveShadow=true;
    node.castShadow=false;
    if(node.name.includes('Sichtbarer3D_Wollflor')){
      node.material.roughness=.95;
      node.material.metalness=0;
      node.material.side=THREE.FrontSide;
    }
  });
  exterior.add(root);
  // GLB enthaelt bereits seine eigene vollständige Farbtextur; externe Reliefkarten sind Zusatz.
  const top=[];
  root.traverse(node=>{if(node.isMesh&&node.name.includes('Sichtbarer3D_Wollflor'))top.push(node);});
  if(top.length){
    const textureLoader=new THREE.TextureLoader();
    const maps=await Promise.allSettled([
      textureLoader.loadAsync(base+'teppich_normal_v7.jpg'),
      textureLoader.loadAsync(base+'teppich_rauheit_v7.png')
    ]);
    const [normal,rough]=maps.map(o=>o.status==='fulfilled'?o.value:null);
    for(const node of top){
      const mat=node.material;
      if(normal){normal.colorSpace=THREE.NoColorSpace;normal.flipY=false;normal.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());mat.normalMap=normal;mat.normalScale=new THREE.Vector2(.43,.43);}
      if(rough){rough.colorSpace=THREE.NoColorSpace;rough.flipY=false;mat.roughnessMap=rough;mat.roughness=.98;}
      mat.needsUpdate=true;
    }
    for(const m of maps)if(m.status==='rejected')console.warn('Cross Hall Teppich V7 – optionale Materialkarte nicht geladen:',m.reason);
  }

  // Echter 3D-Flor im direkten Umkreis der Kamera. Der komplette Teppich bleibt GLB;
  // nur die winzigen Wollfaser-Flaechen werden dynamisch in einer GPU-Instanz gebuendelt.
  // So laufen auch ältere iPhones nicht durch millionenfache Mesh-Objekte voll.
  const maxInstances=innerWidth<750?4700:6500;
  const tuftGeometry=new THREE.ConeGeometry(.00135,.0064,3,1,false);
  const tuftMaterial=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.99,metalness:0,side:THREE.DoubleSide});
  const pile=new THREE.InstancedMesh(tuftGeometry,tuftMaterial,maxInstances);
  pile.name='CrossHall_Wollflor_3D_Nahbereich_V7';
  pile.count=0;
  pile.frustumCulled=false;
  pile.castShadow=false;
  pile.receiveShadow=false;
  pile.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  exterior.add(pile);
  const unit=new THREE.Object3D(), tint=new THREE.Color();
  let previousCell='';
  function hash(a,b,c){
    let v=Math.imul(a,374761393)^Math.imul(b,668265263)^Math.imul(c,2246822519);
    v=Math.imul(v^(v>>>13),1274126177);
    return ((v^(v>>>16))>>>0)/4294967296;
  }
  function update(playerX,playerZ){
    const inHall=Math.abs(playerX)<19.8 && playerZ>=-.45 && playerZ<=8.40;
    if(!inHall){pile.count=0;previousCell='';return;}
    const gx=Math.floor(playerX/.36),gz=Math.floor(playerZ/.3);
    const cell=gx+','+gz;
    if(cell===previousCell)return;
    previousCell=cell;
    const spacing=.048;let n=0;
    const startX=Math.floor((playerX-2.35)/spacing), endX=Math.ceil((playerX+2.35)/spacing);
    const startZ=Math.floor((3.95-1.30)/spacing),endZ=Math.ceil((3.95+1.30)/spacing);
    for(let ix=startX;ix<=endX&&n<maxInstances;ix++){
      const wx=ix*spacing;
      if(Math.abs(wx)>=17.39)continue;
      for(let iz=startZ;iz<=endZ&&n<maxInstances;iz++){
        const rz=hash(ix,iz,2);
        if(rz<.10)continue;
        const wz=iz*spacing + (hash(ix,iz,5)-.5)*.040;
        const dz=wz-3.95;
        if(Math.abs(dz)>=1.303)continue;
        const dx=wx-playerX;
        if(Math.abs(dx)>2.4)continue;
        unit.position.set(wx+(hash(ix,iz,4)-.5)*.040,.929+.0262,wz);
        unit.rotation.set((hash(ix,iz,8)-.5)*.47,hash(ix,iz,7)*Math.PI*2,(hash(ix,iz,9)-.5)*.39);
        const h=.7+hash(ix,iz,3)*.67;
        unit.scale.set(.65+hash(ix,iz,11)*.8,h,.65+hash(ix,iz,12)*.8);
        unit.updateMatrix();pile.setMatrixAt(n,unit.matrix);
        const v=hash(ix,iz,10);
        if(Math.abs(dz)>1.04){
          if(v>.73)tint.setRGB(.62,.40,.18); // goldener Jacquardfaden
          else tint.setRGB(.31,.072,.10); // weinroter Randflor
        }else{
          const brightness=.78+v*.28;
          tint.setRGB(.55*brightness,.072*brightness,.123*brightness);
        }
        pile.setColorAt(n,tint);n++;
      }
    }
    pile.count=n;
    pile.instanceMatrix.needsUpdate=true;
    if(pile.instanceColor)pile.instanceColor.needsUpdate=true;
  }
  return {root,pile,update};
}
