import * as THREE from 'three';
//import { createStarField } from './scene1';

export function createScene3() {
  const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


const textures = ['../assets/FuturisticCoating1.jpg', '../assets/FuturisticCoating2.jpg', '../assets/FuturisticCoating3.jpg', 
  '../assets/FuturisticCoating4.jpg', '../assets/FuturisticCoating5.jpg'];
  
const flametextures = ['../assets/flame1.jpg', '../assets/flame2.webp', '../assets/flame3.svg',
  '../assets/flame4.jpg', '../assets/flame5.jpg', '../assets/flame6.webp', '../assets/flame7.jpg',
  '../assets/flame8.avif', '../assets/flame9.jpeg'];



  // Add lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 10.0); // soft white light
  scene.add(ambientLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-10, 0, -1);
  directionalLight2.target.position.set(100, 0, 1);
  scene.add(directionalLight2);

  // const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight3.position.set(20, 50, -5);
  // directionalLight3.target.position.set(20, -10, 5);
  // scene.add(directionalLight3);

  // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  // pointLight.position.set(0, 0, 0);
  // scene.add(pointLight);



  const spaceShipTexture = new THREE.TextureLoader().load(textures[2]);
  spaceShipTexture.wrapS = THREE.RepeatWrapping;
  spaceShipTexture.wrapT = THREE.RepeatWrapping;

  let noseCone = new THREE.Mesh( new THREE.ConeGeometry(0.8, 1.5, 128), new THREE.MeshStandardMaterial({ map: spaceShipTexture, roughness: 0.3, metalness: 1.0 })); //color: 0xffffff }));
  const noseConeHeight = 2.25;
  noseCone.position.set(0, noseConeHeight, 0);

  const boosterEngineWidth = 0.8;
  let boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(boosterEngineWidth, 0.8, 3), new THREE.MeshStandardMaterial({ map: spaceShipTexture, roughness: 0.3, metalness: 1.0 }));//THREE.MeshBasicMaterial({ color: 0xffffff }));
  boosterEngine.position.set(-8, -2.2, 0);

  const wingStabilityVertices = new Float32Array([
  0,  2.2, 0, // Top
  -1.8, -1.5, 0, // lower left
  1.8, -1.5, 0  // lower right
 ]);

  const wingsGeoBuffer = new THREE.BufferGeometry();
  wingsGeoBuffer.setAttribute('position', new THREE.BufferAttribute(wingStabilityVertices, 3));
  
  //stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ map: spaceShipTexture, side: THREE.DoubleSide }));
  let stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ color: 0x4293f5, side: THREE.DoubleSide }));

  const uvMapping = new Float32Array([
    0.5, 1, // top
    0, 0, // down left
    1, 0 // down right
  ]);
  // This keeps the wings a blue tint:
  //stabilityWings.geometry.setAttribute('uv', new THREE.BufferAttribute(uvMapping, 2));
  wingsGeoBuffer.setAttribute('uv', new THREE.BufferAttribute(uvMapping, 2));

  boosterEngine.material.map = spaceShipTexture;
  noseCone.material.map = spaceShipTexture;
  stabilityWings.material.map = spaceShipTexture;

  // add the flame to the boosterEngine
  const flameTexture = new THREE.TextureLoader().load(flametextures[6]);
  flameTexture.wrapS = THREE.RepeatWrapping;
  flameTexture.wrapT = THREE.RepeatWrapping;

  const flame = new THREE.ConeGeometry(0.7, 2, 32);
  const flameMaterial = new THREE.MeshBasicMaterial({ map: flameTexture, transparent: true, opacity: 0.7 });
  const flameMesh = new THREE.Mesh(flame, flameMaterial);
  flameMesh.position.set(0, -2.2, 0);
  flameMesh.rotation.x = Math.PI; // rotate the flame to point downwards
  //flameMesh.rotation.y = Math.PI;
  
  // assemble the spaceship...  
  boosterEngine.add(noseCone);
  boosterEngine.add(flameMesh);
  boosterEngine.add(stabilityWings);

  // boosterEngine combo alias:
  const rocket = boosterEngine;
  scene.add(rocket);
  rocket.position.set(0, 0, 0);//-10, -40);
  rocket.scale.set(0.35, 0.35, 0.35);



  window.addEventListener("keydown", function(event) {
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
     event.preventDefault();
   }
 });

 let timer = new THREE.Clock();


 function updateFlameEffect(elapsedTime) {
  // controls the flicker of the flame
  flameMesh.material.opacity = 1.0 - Math.sin(elapsedTime * 50)/6;
  // controls the rate of the up and down flame movement
  const scaleY = 1.5 + 0.3 * Math.sin(elapsedTime * 100);
  flameMesh.scale.y = scaleY;
  flameMesh.position.y = -2.2 - (scaleY - 1);
  flameMesh.rotation.y = flameMesh.rotation.y + 3; // rotate the flame for added realism
 }



 // setup obstancles
 const obstacles = [];
  //const obstacleCount = 10;
  // const obstacleGeometry = new THREE.SphereGeometry(2, 32, 32);
  // const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  // for (let i = 0; i < obstacleCount; i++) {
  //   const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
  //   obstacle.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
  //   obstacles.push(obstacle);
  //   scene.add(obstacle);
  // }

  // add a series of pipes and slits that the rocket must navigate through
  const gameScale = 0.35;
  //const pipe1Locationx = 5;
  //const pipe1Locationy = 7;
  
  const pipeTexture = new THREE.TextureLoader().load('../assets/pipetex3.jpg');
  pipeTexture.wrapS = THREE.RepeatWrapping;
  pipeTexture.wrapT = THREE.RepeatWrapping;
  pipeTexture.repeat.rotateAround(0.5, 0.5, Math.PI / 2);

  const pipeCapTexture = new THREE.TextureLoader().load('../assets/pipetex3.jpg');
  pipeCapTexture.wrapS = THREE.RepeatWrapping;
  pipeCapTexture.wrapT = THREE.RepeatWrapping;
  pipeCapTexture.repeat.rotateAround(0.5, 0.5, Math.PI / 2);

  const pipeGeometry = new THREE.CylinderGeometry(gameScale*2, gameScale*2, gameScale*20, 32);
  const pipeMaterial = new THREE.MeshStandardMaterial({ map: pipeTexture, roughness: 0.3, metalness: 1.0 });

  const HIGH_SIDE = 7;
  const LOW_SIDE = -10;
  let pipeLocationx = 5;
  let upperPipes = [];
  let lowerPipes = [];
  let rings = [];

  for (let i = 0; i < 10; i++)
  {
    let upperPipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
    let upperPipeLocation = HIGH_SIDE - 2 * Math.random();
    upperPipe.position.set(pipeLocationx, upperPipeLocation, 0);

    let pipeCapGeometry = new THREE.CylinderGeometry(gameScale*2.6, gameScale*2.6, gameScale*2, 32);
    let pipeCapMaterial = new THREE.MeshStandardMaterial({ map: pipeCapTexture, roughness: 0.3, metalness: 1.0 });
    let upperPipeCap = new THREE.Mesh(pipeCapGeometry, pipeCapMaterial);
    upperPipe.add(upperPipeCap);

    upperPipeCap.position.set(0, -3.5, 0);
    //upperPipeCap.rotation.y = Math.PI;
    
    let lowerPipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
    lowerPipe.position.set(pipeLocationx, LOW_SIDE + 2 * Math.random(), 0);
    lowerPipe.rotation.y = Math.PI;

    let lowerPipeCap = new THREE.Mesh(pipeCapGeometry, pipeCapMaterial);
    lowerPipe.add(lowerPipeCap);
    lowerPipeCap.position.set(0, 3.5, 0);
    

    let ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.5, 16, 100), new THREE.MeshStandardMaterial({ map: pipeTexture, roughness: 0.3, metalness: 1.0 }));
    let ringSide = LOW_SIDE;
    if (Math.random() > 0.5)
    {
      ringSide = HIGH_SIDE;
    }
    ring.position.set(pipeLocationx, ringSide / 2, 0);
    ring.rotation.x = Math.PI / 2;
    // store the high or low result in the ring
    //ring.userData.positionType = ringSide === HIGH_SIDE ? "HIGH_SIDE" : "LOW_SIDE";
    ring.userData.positionType = ringSide === HIGH_SIDE ? HIGH_SIDE : LOW_SIDE;


    pipeLocationx += (5 + Math.random());

    upperPipes.push(upperPipe);
    lowerPipes.push(lowerPipe);
    rings.push(ring);
    scene.add(lowerPipe);
    scene.add(upperPipe);
    scene.add(ring);


    // const slitGeometry = new THREE.BoxGeometry(gameScale*4, gameScale*4, gameScale*4);
    // const slitMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    // const slit = new THREE.Mesh(slitGeometry, slitMaterial);
    // slit.position.set(pipe1Locationx + 2.5 + i * 5, 0, 0);
    // scene.add(slit);
    // obstacles.push(slit);
  }


  // add some ring obstacles
  // const ringGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  // const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  // const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  // ring.position.set(0, 0, 0);
  // ring.rotation.x = Math.PI / 2;
  // scene.add(ring);
  // obstacles.push(ring);







  
  // const slitGeometry = new THREE.BoxGeometry(gameScale*4, gameScale*4, gameScale*4);
  // const slitMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  // const slit = new THREE.Mesh(slitGeometry, slitMaterial);
  // slit.position.set(0, 0, 0);
  // scene.add(slit);


  let upperPhases = [];
  let lowerPhases = [];
  let ringPhases = [];
  for (let i = 0; i < upperPipes.length; i++)
  {
    upperPhases.push(Math.random() * Math.PI);
    lowerPhases.push(Math.random() * Math.PI);
    ringPhases.push(Math.random() * Math.PI);
  }

  
  // angle the rocket
  rocket.rotateZ(-0.8);


  let pausePipeFlow = false;

  let prevRocketYPosition = rocket.position.y;
  let deltaRocketY = 0;
  let acceleration = 0.001;

  let velocityY = 0;

  function animate()
  {
    requestAnimationFrame(animate);

    // Get the elapsed time
    let elapsedTime = timer.getElapsedTime();
    updateFlameEffect(elapsedTime);


      // keep the rocket falling
      deltaRocketY = rocket.position.y - prevRocketYPosition;
      velocityY -= acceleration;
      rocket.position.y += velocityY - 0.13; //-= gameScale*0.05 + acceleration - deltaRocketY ** 2;
      prevRocketYPosition = rocket.position.y;
    



    // flow the pipes and rings to the left
    if (!pausePipeFlow)
    {
      for (let i = 0; i < upperPipes.length; i++)
      {
        upperPipes[i].position.x -= gameScale*0.05;
        lowerPipes[i].position.x -= gameScale*0.05;
             rings[i].position.x -= gameScale*0.05;
      }
    }


    // oscillate the pipes up and down a small amount at a rate of 1/6 hz
    const pipeOscFreq = 0.5;
    const pipeOscAmpl = 0.005;
    const ringOscFreq = 1.0;
    const ringOscAmpl = 0.01;
    for (let i = 0; i < upperPipes.length; i++)
    {
      upperPipes[i].position.y += pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - upperPhases[i]);
      lowerPipes[i].position.y += pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - lowerPhases[i]);
      
      rings[i].position.y += ringOscAmpl * Math.sin(elapsedTime * ringOscFreq - ringPhases[i]);
    }
    

    

    renderer.render(scene, camera);
 }
 animate();


  const redPlanetTexture = new THREE.TextureLoader().load('../assets/red.jpg');
  redPlanetTexture.wrapS = THREE.RepeatWrapping;
  redPlanetTexture.wrapT = THREE.RepeatWrapping;
  const redPlanetGeo = new THREE.SphereGeometry(2, 300, 900);
  const redPlanetMat = new THREE.MeshStandardMaterial({ map: redPlanetTexture, roughness: 0.5, metalness: 0.3 });
  const planet1 = new THREE.Mesh(redPlanetGeo, redPlanetMat);
  planet1.position.set(100, -60, -600);
  planet1.scale.set(20, 20, 20);
  scene.add(planet1);
  
   // Create the second planet
  const bluePlanetTexture = new THREE.TextureLoader().load('../assets/blue_orange.png');
  bluePlanetTexture.wrapS = THREE.RepeatWrapping;
  bluePlanetTexture.wrapT = THREE.RepeatWrapping;
  const bluePlanetGeo = new THREE.SphereGeometry(2, 300, 900);
  const bluePlanetMat = new THREE.MeshStandardMaterial({ map: bluePlanetTexture, roughness: 0.5, metalness: 0.3 });
  const planet2 = new THREE.Mesh(bluePlanetGeo, bluePlanetMat);
  planet2.position.set(-100, -120, -600);
  planet2.scale.set(20, 20, 20);
  scene.add(planet2);


  scene.fog = new THREE.Fog(0x000000, 50, 900);

  function createDistantStarField() {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 1, 
          transparent: true,
          fog: false
      });
  
      const starVertices = [];
      for (let i = 0; i < 5000; i++) { 
          const x = (Math.random() - 0.5) * 2000; 
          const y = (Math.random() - 0.5) * 2000; 
          const z = Math.min((Math.random() - 0.5) * 900 - 700, -700);
          starVertices.push(x, y, z);
      }
  
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      stars.userData.isStarField = true;
      return stars;
  }
  


  const distantStars = createDistantStarField();
  scene.add(distantStars);




   camera.position.z = 10;
   let moveSpeed = 0.5;//0.3;
  const sphereRadius = 2;//both planets right now have the radius of 2


   // Event listeners for movement using arrow keys
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp': velocityY = gameScale * moveSpeed; //rocket.position.y += gameScale*moveSpeed;
      break;
      case 'ArrowDown': //rocket.position.y -= gameScale*moveSpeed;
      break;
      case 'ArrowLeft':
                        pausePipeFlow = true;
                        break;

      case 'ArrowRight':
                         pausePipeFlow = false; break;
      case ' ' :
              velocityY = gameScale * moveSpeed; 
              break;
    }
    checkCollision();
  });
   // Function to check for collisions
  function checkCollision()
  {
    const planets = [planet1, planet2];
    let collisionDetected = false;
    for (let planet of planets) // change planet to obstacle
    {
      let distancey = Math.abs(rocket.position.y - planet.position.y);
      let distancex = Math.abs(rocket.position.x - planet.position.x);
      let distance = Math.sqrt(distancex*distancex + distancey*distancey);
      if (distance < (sphereRadius + noseConeHeight) && distancex < (sphereRadius + boosterEngineWidth))
      {
        collisionDetected = true;
        break;
      }
    }
     if (collisionDetected) {
      console.log("Collision detected!");
      // rocket turns red on collision
      rocket.material.color.set(0xff0000);
      noseCone.material.color.set(0xff0000);
      stabilityWings.material.color.set(0xff0000);
    } else {
      // reset back to normal color
      rocket.material.color.set(0xffffff);
      noseCone.material.color.set(0xffffff);
      stabilityWings.material.color.set(0x4293f5);
    }
  }

  // provide an initial impulse
  const spacebarEvent = new KeyboardEvent('keydown', { key: ' ', code: "Space", keyCode: 32, which: 32});
  document.dispatchEvent(spacebarEvent);

   return scene;
}
