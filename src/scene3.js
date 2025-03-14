import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createScene2Pt5(renderer, camera) {
    const pipeZPosition = -18.1;
    const listener = new THREE.AudioListener();
    camera.add(listener); 
    const backgroundMusic = new THREE.Audio(listener);
    
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/StarWars.mp3', function(buffer) {
        backgroundMusic.setBuffer(buffer);
        backgroundMusic.setLoop(true); 
        backgroundMusic.setVolume(0.1); 
        backgroundMusic.play();
    });

  const scene = new THREE.Scene();
  camera.position.set(0, 15, 35);
  camera.lookAt(new THREE.Vector3(0, 0, -5));
  
   // Add lighting
  const directionalLight = new THREE.DirectionalLight(0xffffd6, 10);
  directionalLight.position.set(-50, 100, 50)//5, 10, 7.5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x404040, 10.0); // soft white light
  scene.add(ambientLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight2.position.set(0, 0, 50);
  //directionalLight2.target.position.set(100, 0, 1);
  directionalLight2.castShadow = true;
  scene.add(directionalLight2);

  let gameComplete = false;
  let start=false;
  window.addEventListener('keydown', onKeyPress); 
  function onKeyPress(event) {
      switch (event.key) {
          case ' ': 
              start = true;
              break;
          default:
              //console.log(`Key ${event.key} pressed`);
  
      }
  }
//   const spaceShipTexture = new THREE.TextureLoader().load('../assets/FuturisticCoating3.jpg');
//   spaceShipTexture.wrapS = THREE.RepeatWrapping;
//   spaceShipTexture.wrapT = THREE.RepeatWrapping;


  // replacing cylinder and cone rocket with melin falcon
  // helpful loader code from scene3 (lightly modified)!
  let Spaceship;
  const loader = new GLTFLoader().setPath('assets/hull_spaceship_gltf/');
  loader.load('scene.gltf', (gltf) => {
    const mesh= gltf.scene;
    Spaceship=mesh;
    //Spaceship = new gltf.scene;
    Spaceship.scale.set(0.3,0.3,0.3);
    Spaceship.position.set(-8,-2.2, -22)
    Spaceship.rotation.set(0, -3.14/2, 0);
    //console.log(Spaceship.matrix);
    scene.add(Spaceship);

    // directionalLight.target = Spaceship;
    // scene.add(directionalLight.target);
  });
  let detectorGeometry = new THREE.CylinderGeometry(2, 2, .8, 32);
  const detectorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
   const detector = new THREE.Mesh(detectorGeometry, detectorMaterial);
   detector.position.set(-8, .7, -18.1);
   scene.add(detector);
   detector.visible=false;

   let detector2Geometry = new THREE.BoxGeometry(2,.8,2);
   const detector2 = new THREE.Mesh(detector2Geometry, detectorMaterial);
   detector2.position.set(-6, .7, -18.1);
   scene.add(detector2);
   detector2.visible=false;
  

  window.addEventListener("keydown", function(event) {
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
     event.preventDefault();
   }
 });

 let timer = new THREE.Clock();


  // add a series of pipe and ring obstacles that the rocket must navigate through
  const gameScale = 0.35;
  
  const pipeTexture = new THREE.TextureLoader().load('../assets/pipetex3.jpg');
  pipeTexture.wrapS = THREE.RepeatWrapping;
  pipeTexture.wrapT = THREE.RepeatWrapping;
  pipeTexture.repeat.rotateAround(0.5, 0.5, Math.PI / 2);

  const pipeCapTexture = new THREE.TextureLoader().load('../assets/pipetex3.jpg');
  pipeCapTexture.wrapS = THREE.RepeatWrapping;
  pipeCapTexture.wrapT = THREE.RepeatWrapping;
  pipeCapTexture.repeat.rotateAround(0.5, 0.5, Math.PI / 2);

  const pipeGeometry = new THREE.CylinderGeometry(gameScale*2, gameScale*2, gameScale*400, 32);
  const pipeMaterial = new THREE.MeshStandardMaterial({ map: pipeTexture, roughness: 0.3, metalness: 1.0 });

  const HIGH_SIDE = 70;
  const LOW_SIDE = -80;
  
  let upperPipes = [];
  let lowerPipes = [];
  let rings = [];

  let upperPhases = [];
  let lowerPhases = [];
  let ringPhases = [];

  const lowerPipeCapY = -70;

  const upperPipeCapY = 70; // number closer to 0 brings the cap up

  const startingPositionOfPipes = 20; // larger number starts pipes from farther to the right

  function setupPipesAndRings()
  {
    let pipeLocationx = startingPositionOfPipes; 

    for (let i = 0; i < 10; i++)
    {
      let upperPipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
      let upperPipeLocation = HIGH_SIDE - 2 * Math.random();
      upperPipe.position.set(pipeLocationx, upperPipeLocation, pipeZPosition); // upperPipeLocation + 60
      upperPipe.rotateZ(Math.PI);
  
      let pipeCapGeometry = new THREE.CylinderGeometry(gameScale*2.6, gameScale*2.6, gameScale*2, 32);
      let pipeCapMaterial = new THREE.MeshStandardMaterial({ map: pipeCapTexture, roughness: 0.3, metalness: 1.0 });
      let upperPipeCap = new THREE.Mesh(pipeCapGeometry, pipeCapMaterial);
      upperPipeCap.position.set(0, upperPipeCapY, 0);
      upperPipe.add(upperPipeCap);
  
      
      let lowerPipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
      let lowerPipeLocation = LOW_SIDE + 2 * Math.random();
      lowerPipe.position.set(pipeLocationx, lowerPipeLocation, pipeZPosition); // lowerPipeLocation -60
      lowerPipe.rotation.y = Math.PI;
      lowerPipe.rotateZ(Math.PI);
  
      let lowerPipeCap = new THREE.Mesh(pipeCapGeometry, pipeCapMaterial);
      lowerPipeCap.position.set(0, lowerPipeCapY, 0); // lowerPipeLocation + (lowerPipeCapY * -1*lowerPipeLocation)
      lowerPipe.add(lowerPipeCap);
      
  
      let ring = new THREE.Mesh(new THREE.TorusGeometry(6, 0.5, 16, 100), new THREE.MeshStandardMaterial({ map: pipeTexture, roughness: 0.3, metalness: 1.0 }));
      let ringSide = LOW_SIDE;
      if (Math.random() > 0.5)
      {
        ringSide = HIGH_SIDE;
      }
      ring.position.set(pipeLocationx, 0, pipeZPosition);
      ring.rotation.x = Math.PI / 2;
      // store the high or low result in the ring
      ring.userData.positionType = ringSide === HIGH_SIDE ? HIGH_SIDE : LOW_SIDE;
  
  
      pipeLocationx += (16 + Math.random());
  
      upperPipes.push(upperPipe);
      lowerPipes.push(lowerPipe);
      rings.push(ring);
      scene.add(lowerPipe);
      scene.add(upperPipe);
      scene.add(ring);
  
    }
  }

  setupPipesAndRings();

  for (let i = 0; i < upperPipes.length; i++)
  {
    upperPhases.push(Math.random() * Math.PI);
    lowerPhases.push(Math.random() * Math.PI);
    ringPhases.push(Math.random() * Math.PI);
  }

  let pausePipeFlow = false;

  // Can adjust the acceleration and verticalImpulse values to change gravity and rocket impulse effect
  let acceleration    = 0.009;//0.003;
  let verticalImpulse = 1.0;//0.9;//0.5;
  const obstacleHorizontalMovementSpeed = 0.4; // make this number bigger to "make the rocket fly to the right" faster (makes the obstacles shift faster)

  let velocityY = 0;
  let gameOverAlerted = false;
  alert("Mission: Get through the minefield without having two collisions! Press the space bar to go! ");

  function animate()
  {
    requestAnimationFrame(animate);
    //Spaceship.updateMatrixWorld();
    
    //console.log(start);
    if (!gameComplete && !gameOverAlerted&& start)
    {
        // Get the elapsed time
        let elapsedTime = timer.getElapsedTime();
        //updateFlameEffect(elapsedTime);

        // keep the rocket falling
        velocityY -= acceleration;

        if (Spaceship)
        {
            Spaceship.position.y += velocityY - 0.13;
            detector.position.y += velocityY - 0.13;
            detector2.position.y += velocityY - 0.13;
        }
        
        // the pipes and rings will be moving from right to left while the rocket navigates through
        // the pipes and rings can stop moving to the left when the left arrow button is pressed in case we want to wait for a safe time to proceed
        if (!pausePipeFlow)
        {
            // flow the pipes and rings to the left
            for (let i = 0; i < upperPipes.length; i++)
            {
                upperPipes[i].position.x -= gameScale*obstacleHorizontalMovementSpeed;
                lowerPipes[i].position.x -= gameScale*obstacleHorizontalMovementSpeed;
                     rings[i].position.x -= gameScale*obstacleHorizontalMovementSpeed;
            }
        }

        // oscillate the pipes up and down a small amount
        const pipeOscFreq = 0.5;
        const pipeOscAmpl = 0.05;
        const ringOscFreq = 1.0;
        const ringOscAmpl = 0.1;
        for (let i = 0; i < upperPipes.length; i++)
        {
            if ((upperPipes[i].position.y + pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - upperPhases[i])) > (lowerPipes[i].position.y + pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - lowerPhases[i]) + 140.5))
            {
                upperPipes[i].position.y += pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - upperPhases[i]);
                lowerPipes[i].position.y += pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - lowerPhases[i]);
            }
            else
            {
                upperPipes[i].position.y += pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - upperPhases[i]);
                lowerPipes[i].position.y += pipeOscAmpl * Math.sin(elapsedTime * pipeOscFreq - upperPhases[i]);
            }
            
            if (rings[i].userData.positionType == HIGH_SIDE)
            {
                // high side rings go down
                rings[i].position.y += ringOscAmpl * -1 * Math.sin(elapsedTime * ringOscFreq - ringPhases[i]);
            }
            else {
                rings[i].position.y += ringOscAmpl * Math.sin(elapsedTime * ringOscFreq - ringPhases[i]);
            }
            
        }
        
        if (Spaceship)
        {
            // check if the rocket fell off the map
            if (Spaceship.position.y < -29 || Spaceship.position.y > 29 && !gameOverAlerted)
                {
                    //gameOver();
                    alert("Game Over!");
                    gameOverAlerted = true;
                    //return;
                }
        
                // check if rocket.position.x is past the last marker
                if (Spaceship.position.x > (lowerPipes[9].position.x + 10))
                {
                    // done! Game complete!
                    gameComplete = true;
                    alert("Victory!");
                }
                checkCollision();
        }

    }


    renderer.render(scene, camera);
 }
 animate();


  const redPlanetTexture = new THREE.TextureLoader().load('../assets/orange.png');
  redPlanetTexture.wrapS = THREE.RepeatWrapping;
  redPlanetTexture.wrapT = THREE.RepeatWrapping;
  const redPlanetGeo = new THREE.SphereGeometry(2, 300, 900);
  const redPlanetMat = new THREE.MeshStandardMaterial({ map: redPlanetTexture, roughness: 0.9, metalness: 0.0 });
  const planet1 = new THREE.Mesh(redPlanetGeo, redPlanetMat);
  planet1.position.set(100, -60, -600);
  planet1.scale.set(20, 20, 20);
  scene.add(planet1);
  
   // Create the second planet
  const bluePlanetTexture = new THREE.TextureLoader().load('../assets/earth.png');
  bluePlanetTexture.wrapS = THREE.RepeatWrapping;
  bluePlanetTexture.wrapT = THREE.RepeatWrapping;
  const bluePlanetGeo = new THREE.SphereGeometry(2, 300, 900);
  const bluePlanetMat = new THREE.MeshStandardMaterial({ map: bluePlanetTexture, roughness: 0.9, metalness: 0.0 });
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
  

  let collisionCounter = 0;

  const distantStars = createDistantStarField();
  scene.add(distantStars);

 
   // Event listeners for movement using arrow keys
  document.addEventListener('keydown', (event) => {
    if (!gameComplete)
    {
      switch (event.key) {
        case 'ArrowUp': 
        velocityY = gameScale * verticalImpulse;
        break;
        case 'ArrowDown':
        break;
        case 'ArrowLeft':
                          pausePipeFlow = true;
                          break;

        case 'ArrowRight':
                          pausePipeFlow = false; break;
        case ' ' :
                velocityY = gameScale * verticalImpulse; 
                break;
      }

      if (Spaceship)
      {
        checkCollision();
      }
    }
  });

let collisionTime = 0;
//FUNCTIONS for collsion
function isCylinderThroughRing(detector, ring) {
    const distanceX = Math.abs(detector.position.x - ring.position.x);
    const ringInnerRadius = ring.geometry.parameters.radius - ring.geometry.parameters.tube;
    if (distanceX <= ringInnerRadius-(2)) {//2 for cylender radius
      //console.log(`Spaceship went through ring`);
      return true;
    }else{
      return false;
    }
}
function isBoxThroughRing(detector, ring) {
    const distanceX = Math.abs(detector.position.x - ring.position.x);
    const ringInnerRadius = ring.geometry.parameters.radius - ring.geometry.parameters.tube;
    if (distanceX <= ringInnerRadius-(1)) {//1 for half the distange from center of box
      //console.log(`Spaceship went through ring`);
      return true;
    }else{
      return false;
    }
  
}

function getBoundingBox(mesh) {
  const box = new THREE.Box3().setFromObject(mesh);
  return box;
}
function detectCollision(detector, pipes) {
  const detectorBox = getBoundingBox(detector);
  for (let i = 0; i < pipes.length; i++) {
      const upperPipeBox = getBoundingBox(upperPipes[i]);
      const lowerPipeBox = getBoundingBox(lowerPipes[i]);
      if (detectorBox.intersectsBox(upperPipeBox) || detectorBox.intersectsBox(lowerPipeBox)) {
          console.log(`Collision detected with pipe pair ${i}!`);
          return true;
      }
  }
  return false;
}

function checkCollisionWithToruses(mesh, rings) {
  const shipAABB = getBoundingBox(mesh);

  for (let i = 0; i < rings.length; i++) {
      const ringAABB = getBoundingBox(rings[i]);

      if (shipAABB.intersectsBox(ringAABB)&&!isCylinderThroughRing(detector,rings[i])&&!isBoxThroughRing(detector2,rings[i])) {
          console.log(`Collision detected with ring ${i}!`);
          return true; 
      }
  }

  return false; 
}


  function checkCollision()
  {
    if (!Spaceship)
    {
        return;
    }
//THIS WAS ADDED: basically uses the functions I made with AABB bounding box mesh for upper and lower pipes and the mesh object I custom made because the GLTF object center was really off
    let collisionDetected = false;
    if(detectCollision(detector,upperPipes)||detectCollision(detector2,upperPipes)){
      collisionDetected=true;
    }
    //ALSO ADDED: uses bounded box and also checks if the object is going through the ring
    if(checkCollisionWithToruses(detector2,rings)||checkCollisionWithToruses(detector,rings)){
      collisionDetected=true;
    }
    


    
    
     if (collisionDetected) {
      console.log("Collision detected!");
      // rocket turns red on collision
      if (collisionTime == 0.0)
      {
        ++collisionCounter;
        collisionTime = timer.getElapsedTime();
      }

      if ((timer.getElapsedTime() - collisionTime) > 2) // 2 second break after collision
      {
        ++collisionCounter;
      }        

      if (Spaceship)
      {
         Spaceship.traverse((child) => {
            if (child.isMesh) {
                child.material.color.set(0xff0000);
            }
         })
      }

      if (collisionCounter >= 2)
      {
        collisionCounter = 0;
        deleteAllPipesAndRings();
        setupPipesAndRings();
        collisionTime = 0.0;
      }
    } else {
      if (Spaceship)
        {
           Spaceship.traverse((child) => {
              if (child.isMesh) {
                  child.material.color.set(0xffffff);
              }
           })
        }
    }
  }

  // this gets called after multiple collisions
  function deleteAllPipesAndRings()
  {
    for (let i = 9; i >= 0; --i)
      {
        scene.remove(upperPipes[i]);
        scene.remove(lowerPipes[i]);
        scene.remove(rings[i]);

        upperPipes.pop();
        lowerPipes.pop();
        rings.pop();
      }
  }

  // provide an initial impulse
  const spacebarEvent = new KeyboardEvent('keydown', { key: ' ', code: "Space", keyCode: 32, which: 32});
  document.dispatchEvent(spacebarEvent);
  document.dispatchEvent(spacebarEvent);

  return scene;
}



