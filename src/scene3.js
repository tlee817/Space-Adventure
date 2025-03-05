import * as THREE from 'three';

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

  // const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // soft white light
  // scene.add(ambientLight);

  // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  // pointLight.position.set(0, 0, 0);
  // scene.add(pointLight);



  const spaceShipTexture = new THREE.TextureLoader().load(textures[2]);
  spaceShipTexture.wrapS = THREE.RepeatWrapping;
  spaceShipTexture.wrapT = THREE.RepeatWrapping;

  let noseCone = new THREE.Mesh( new THREE.ConeGeometry(1, 2, 32), new THREE.MeshStandardMaterial({ map: spaceShipTexture, roughness: 0.5, metalness: 1.0 })); //color: 0xffffff }));
  const noseConeHeight = 2.2;
  noseCone.position.set(0, noseConeHeight, 0);

  const boosterEngineWidth = 0.8;
  let boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(boosterEngineWidth, 0.8, 3), new THREE.MeshStandardMaterial({ map: spaceShipTexture, roughness: 0.5, metalness: 1.0 }));//THREE.MeshBasicMaterial({ color: 0xffffff }));
  boosterEngine.position.set(-8, -2.2, 0);

  const wingStabilityVertices = new Float32Array([
  0,  3.2, 0, // Top
  -1.5, -1.5, 0, // lower left
  1.5, -1.5, 0  // lower right
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

  const flame = new THREE.ConeGeometry(0.8, 2, 32);
  const flameMaterial = new THREE.MeshBasicMaterial({ map: flameTexture, transparent: true, opacity: 0.7 });
  const flameMesh = new THREE.Mesh(flame, flameMaterial);
  flameMesh.position.set(0, -2.2, 0);
  flameMesh.rotation.x = Math.PI; // rotate the flame to point downwards
  
  // assemble the spaceship...  
  boosterEngine.add(noseCone);
  boosterEngine.add(flameMesh);
  boosterEngine.add(stabilityWings);

  // boosterEngine combo alias:
  const rocket = boosterEngine;
  scene.add(rocket);



  window.addEventListener("keydown", function(event) {
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
     event.preventDefault();
   }
 });

 let timer = new THREE.Clock();

  function animate() {
   requestAnimationFrame(animate);


  // Get the elapsed time
  let elapsedTime = timer.getElapsedTime();

  // controls the flicker of the flame
  flameMesh.material.opacity = 1.0 - Math.sin(elapsedTime * 50)/6;

  // controls the rate of the up and down flame movement
  flameMesh.scale.y = 1 + 0.1 * Math.sin(elapsedTime * 100);
  flameMesh.position.y = flameMesh.position.y + 0.01 * Math.sin(elapsedTime * 100);





   renderer.render(scene, camera);
 }
 animate();

  const redPlanetTexture = new THREE.TextureLoader().load('../assets/red.jpg');
  redPlanetTexture.wrapS = THREE.RepeatWrapping;
  redPlanetTexture.wrapT = THREE.RepeatWrapping;
  const redPlanetGeo = new THREE.SphereGeometry(2, 16, 16);
  const redPlanetMat = new THREE.MeshStandardMaterial({ map: redPlanetTexture, roughness: 0.5, metalness: 1.0 });
  const planet1 = new THREE.Mesh(redPlanetGeo, redPlanetMat);
  planet1.position.set(3, 0, 0);
  scene.add(planet1);
  
   // Create the second planet
  const bluePlanetTexture = new THREE.TextureLoader().load('../assets/blue_orange.png');
  bluePlanetTexture.wrapS = THREE.RepeatWrapping;
  bluePlanetTexture.wrapT = THREE.RepeatWrapping;
  const bluePlanetGeo = new THREE.SphereGeometry(2, 16, 16);
  const bluePlanetMat = new THREE.MeshStandardMaterial({ map: bluePlanetTexture, roughness: 0.5, metalness: 1.0 });
  const planet2 = new THREE.Mesh(bluePlanetGeo, bluePlanetMat);
  planet2.position.set(-3, 2, 0);
  scene.add(planet2);

   camera.position.z = 10;
   let moveSpeed = 0.3;
  const sphereRadius = 2;//both planets right now have the radius of 2
   // Event listeners for movement using arrow keys
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp': rocket.position.y += moveSpeed; break;
      case 'ArrowDown': rocket.position.y -= moveSpeed; break;
      case 'ArrowLeft': rocket.position.x -= moveSpeed; break;
      case 'ArrowRight': rocket.position.x += moveSpeed; break;
    }
    checkCollision();
  });
   // Function to check for collisions
  function checkCollision()
  {
    const planets = [planet1, planet2];
    let collisionDetected = false;
    for (let planet of planets) 
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
   return scene;
}
