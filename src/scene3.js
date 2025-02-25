// import * as THREE from 'three';

export let spaceship2;
export let boosterEngine;
export let stabilityWings;

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
    spaceship2 = new THREE.Mesh( new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    spaceship2.position.set(-8, 0, 0);

    boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(0.8, 0.8, 3), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    boosterEngine.position.set(-8, -2.2, 0);

        const wingStabilityVertices = new Float32Array([
        -8,  1, 0, // Top
       -9, -4, 0, // lower left
        -7, -4, 0  // lower right
    ]);

        const wingsGeoBuffer = new THREE.BufferGeometry();
    wingsGeoBuffer.setAttribute('position', new THREE.BufferAttribute(wingStabilityVertices, 3));

    stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
        scene.add(spaceship2);
    scene.add(boosterEngine);
    scene.add(stabilityWings);
/////////
  window.addEventListener("keydown", function(event) {
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
     event.preventDefault();
   }
 });
  function animate() {
   requestAnimationFrame(animate);
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
      case 'ArrowUp': spaceship.position.y += moveSpeed; break;
      case 'ArrowDown': spaceship.position.y -= moveSpeed; break;
      case 'ArrowLeft': spaceship.position.x -= moveSpeed; break;
      case 'ArrowRight': spaceship.position.x += moveSpeed; break;
    }
    checkCollision();
  });
   // Function to find the closest point on the spaceship (AABB) to the planet
  function getClosestPoint(spaceship, spherePos) {
    const spaceshipMin = spaceship.position.clone().subScalar(0.5); // Half-size of box is 0.5
    const spaceshipMax = spaceship.position.clone().addScalar(0.5);
     return new THREE.Vector3(
      Math.max(spaceshipMin.x, Math.min(spherePos.x, spaceshipMax.x)),
      Math.max(spaceshipMin.y, Math.min(spherePos.y, spaceshipMax.y)),
      Math.max(spaceshipMin.z, Math.min(spherePos.z, spaceshipMax.z))
    );
  }
   // Function to check for collisions
  function checkCollision() {
    const planets = [planet1, planet2];
    let collisionDetected = false;
     for (let planet of planets) {
      const closestPoint = getClosestPoint(spaceship, planet.position);
      const distance = closestPoint.distanceTo(planet.position);
       if (distance < sphereRadius) {
        collisionDetected = true;
        break;
      }
    }
     if (collisionDetected) {
      console.log("Collision detected!");
      spaceship.material.color.set(0xff0000); //spaceship color will change to red if there is a collision detected
    } else {
      spaceship.material.color.set(0x00ff00); //will stay the same color (green)
    }
  }
   return scene;
}
