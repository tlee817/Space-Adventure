//export 
let noseCone;
//export 
let boosterEngine;
//export 
let stabilityWings;

// export function createScene3() {
//     const scene = new THREE.Scene();

//     spaceship2 = new THREE.Mesh( new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
//     spaceship2.position.set(0, 0, 0);

//     boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(0.8, 0.8, 3), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
//     boosterEngine.position.set(0, -2.2, 0);

//     const wingStabilityVertices = new Float32Array([
//         0,  1, 0, // Top
//        -1, -4, 0, // lower left
//         1, -4, 0  // lower right
//     ]);
      
//     // BufferGeometry sets up wingStability from the vertices
//     const wingsGeoBuffer = new THREE.BufferGeometry();
//     wingsGeoBuffer.setAttribute('position', new THREE.BufferAttribute(wingStabilityVertices, 3));

//     stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));

    // scene.add(spaceship2);
    // scene.add(boosterEngine);
    // scene.add(stabilityWings);

//     // need light (currently from scene1)
//     let sunLight = new THREE.PointLight(0xffffff, 1, 0, 1);
//     sunLight.position.set(0, 3, 0);
//     scene.add(sunLight);

//     return scene;
// }

import * as THREE from 'three';



export function createScene3() {
  const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  // Create a box (spaceship)
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  const spaceship = new THREE.Mesh(boxGeometry, boxMaterial);
  spaceship.position.set(-5, 0, 0);
  scene.add(spaceship);
////////////

const textures = ['../assets/FuturisticCoating1.jpg', '../assets/FuturisticCoating2.jpg', '../assets/FuturisticCoating3.jpg', 
  '../assets/FuturisticCoating4.jpg', '../assets/FuturisticCoating5.jpg'];
  
const flametextures = ['../assets/flame1.jpg', '../assets/flame2.webp', '../assets/flame3.svg',
  '../assets/flame4.jpg', '../assets/flame5.jpg', '../assets/flame6.webp', '../assets/flame7.jpg',
  '../assets/flame8.avif', '../assets/flame9.jpeg'];


  //     for (let i = 0; i < 7; i++) {
  //         const planettexture = new THREE.TextureLoader().load(textures[i]);
  //         planettexture.wrapS = THREE.RepeatWrapping;
  //         planettexture.wrapT = THREE.RepeatWrapping;
  //         const sphere = new THREE.Mesh(
  //             new THREE.SphereGeometry(planetRadii[i], 64, 64),
  //             new THREE.MeshStandardMaterial({map: planettexture, roughness: 1.0, metalness: 0.2})
  //         );
  //         sphere.userData = {
  //             angle: Math.random() * Math.PI * 2,
  //             radius: orbitRadii[i],
  //             speed: orbitSpeeds[i]
  //         };
  //         scene.add(sphere);
  //         spheres.push(sphere);
          
  //     }



  const spaceShipTexture = new THREE.TextureLoader().load(textures[2]);
  spaceShipTexture.wrapS = THREE.RepeatWrapping;
  spaceShipTexture.wrapT = THREE.RepeatWrapping;

  noseCone = new THREE.Mesh( new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const noseConeHeight = 2.2;
  noseCone.position.set(0, noseConeHeight, 0);

  const boosterEngineWidth = 0.8;
  boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(boosterEngineWidth, 0.8, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  boosterEngine.position.set(-8, -2.2, 0);

  const wingStabilityVertices = new Float32Array([
  0,  3.2, 0, // Top
  -1.5, -1.5, 0, // lower left
  1.5, -1.5, 0  // lower right
 ]);

  const wingsGeoBuffer = new THREE.BufferGeometry();
  wingsGeoBuffer.setAttribute('position', new THREE.BufferAttribute(wingStabilityVertices, 3));
  
  //stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ map: spaceShipTexture, side: THREE.DoubleSide }));
  stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ color: 0x4293f5, side: THREE.DoubleSide }));

  const uvMapping = new Float32Array([
    0.5, 1, // top
    0, 0, // down left
    1, 0 // down right
  ]);
  // This keeps the wings a blue tint:
  stabilityWings.geometry.setAttribute('uv', new THREE.BufferAttribute(uvMapping, 2));

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



/////////



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

   const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });//red planet
  const planet1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  planet1.position.set(3, 0, 0); // Position of first planet
  scene.add(planet1);
   // Create the second planet
  const planet2 = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }));//blue planet
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










// const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });//red planet
// const planet1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
// planet1.position.set(3, 0, 0); // Position of first planet
// scene.add(planet1);
//  // Create the second planet
// const planet2 = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }));//blue planet
// planet2.position.set(-3, 2, 0);
// scene.add(planet2);
//  camera.position.z = 10;
//  let moveSpeed = 0.3;
// const sphereRadius = 2;//both planets right now have the radius of 2
//  // Event listeners for movement using arrow keys
// document.addEventListener('keydown', (event) => {
//   switch (event.key) {
//     case 'ArrowUp': spaceship.position.y += moveSpeed; break;
//     case 'ArrowDown': spaceship.position.y -= moveSpeed; break;
//     case 'ArrowLeft': spaceship.position.x -= moveSpeed; break;
//     case 'ArrowRight': spaceship.position.x += moveSpeed; break;
//   }
//   checkCollision();
// });
//  // Function to find the closest point on the spaceship (AABB) to the planet
// function getClosestPoint(spaceship, spherePos) {
//   const spaceshipMin = spaceship.position.clone().subScalar(0.5); // Half-size of box is 0.5
//   const spaceshipMax = spaceship.position.clone().addScalar(0.5);
//    return new THREE.Vector3(
//     Math.max(spaceshipMin.x, Math.min(spherePos.x, spaceshipMax.x)),
//     Math.max(spaceshipMin.y, Math.min(spherePos.y, spaceshipMax.y)),
//     Math.max(spaceshipMin.z, Math.min(spherePos.z, spaceshipMax.z))
//   );
// }
//  // Function to check for collisions
// function checkCollision() {
//   const planets = [planet1, planet2];
//   let collisionDetected = false;
//    for (let planet of planets) {
//     const closestPoint = getClosestPoint(spaceship, planet.position);
//     const distance = closestPoint.distanceTo(planet.position);
//      if (distance < sphereRadius) {
//       collisionDetected = true;
//       break;
//     }
//   }
//    if (collisionDetected) {
//     console.log("Collision detected!");
//     spaceship.material.color.set(0xff0000); //spaceship color will change to red if there is a collision detected
//   } else {
//     spaceship.material.color.set(0x00ff00); //will stay the same color (green)
//   }
// }
//  return scene;
// }





// import * as THREE from 'three';
// // import planetImg from '../assets/planettexture.png';

// export function createScene2(renderer, camera) {
//     const scene = new THREE.Scene();

//     const pointLight = new THREE.PointLight(0xFFFFFF, 5, 25, 0.5);
//     pointLight.position.set(0, 0, 0);
//     scene.add(pointLight);
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
//     scene.add(ambientLight);

    
//     const spheres = [];
//     const orbitSpeeds = [5/4, 5/5, 5/7.5, 5/10, 5/12.5, 5/15, 5/17.5];
//     const orbitRadii = [2, 4, 6, 8, 11, 14, 19];
//     const planetRadii = [1, 1.5, 1.5, 2, 2, 2.5, 3]
//     const textures = ['../assets/planettexture.png', '../assets/orange.png', '../assets/red.jpg', '../assets/blue_orange.png',
//     '../assets/emerald.png', '../assets/water.jpg', '../assets/earth.png'];

//     for (let i = 0; i < 7; i++) {
//         const planettexture = new THREE.TextureLoader().load(textures[i]);
//         planettexture.wrapS = THREE.RepeatWrapping;
//         planettexture.wrapT = THREE.RepeatWrapping;
//         const sphere = new THREE.Mesh(
//             new THREE.SphereGeometry(planetRadii[i], 64, 64),
//             new THREE.MeshStandardMaterial({map: planettexture, roughness: 1.0, metalness: 0.2})
//         );
//         sphere.userData = {
//             angle: Math.random() * Math.PI * 2,
//             radius: orbitRadii[i],
//             speed: orbitSpeeds[i]
//         };
//         scene.add(sphere);
//         spheres.push(sphere);
        
//     }


//     spheres[0].position.y=2.5;
//     spheres[1].position.x=-4;
//     spheres[2].position.y=-4;
//     spheres[3].position.z=-4;
//     spheres[4].position.x=6;
//     spheres[5].position.x=-4;
//     spheres[5].position.y=-4;
//     spheres[6].position.y=6;
//     spheres[6].position.z=-7;

//     // Set Planets' Hitpoints
//     for (let i = 0; i < 7; i++) 
//     {
//        spheres[i].userData.hitpoint = i+1;
//     }
//     const clock = new THREE.Clock();
//     function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//         spheres.forEach(sphere => {
//             sphere.userData.angle += sphere.userData.speed * 0.03;
//             sphere.position.x = sphere.userData.radius * Math.cos(sphere.userData.angle);
//             sphere.position.z = sphere.userData.radius * Math.sin(sphere.userData.angle);
//         });
        
//     }


//     animate();

//     return scene;
// }
