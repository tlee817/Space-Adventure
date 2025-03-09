import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

export function createScene2Pt5(renderer, camera) {
    const pipeZPosition = -20;

  const scene = new THREE.Scene();
  camera.position.set(0, 7, 30);
  //camera.
   //let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   //const renderer = new THREE.WebGLRenderer();
   //renderer.setSize(window.innerWidth, window.innerHeight);
   //document.body.appendChild(renderer.domElement);
//    const controls = new OrbitControls(camera, renderer.domElement);
//    controls.maxDistance = 100;
//    controls.minDistance = 100;
  
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
    Spaceship.scale.set(0.5,0.5,0.5);
    Spaceship.position.set(-8, -2.2, -26);
    Spaceship.rotation.set(3.14/8, -3.14/2, 0);
    //console.log(Spaceship.matrix);
    scene.add(Spaceship);

    // directionalLight.target = Spaceship;
    // scene.add(directionalLight.target);
  });

  

  //let rocket = Spaceship;
  //scene.add(rocket);

  
  // angle the rocket
  //rocket.rotateZ(-0.8);

//   let noseCone = new THREE.Mesh( new THREE.ConeGeometry(0.8, 1.5, 128), new THREE.MeshStandardMaterial({ map: spaceShipTexture, roughness: 0.3, metalness: 1.0 })); //color: 0xffffff }));
//   const noseConeHeight = 2.25;
//   noseCone.position.set(0, noseConeHeight, 0);

//   const boosterEngineWidth = 0.8;
//   let boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(boosterEngineWidth, 0.8, 3), new THREE.MeshStandardMaterial({ map: spaceShipTexture, roughness: 0.3, metalness: 1.0 }));//THREE.MeshBasicMaterial({ color: 0xffffff }));
//   boosterEngine.position.set(-8, -2.2, 0);

//   const wingStabilityVertices = new Float32Array([
//   0,  2.2, 0, // Top
//   -1.8, -1.5, 0, // lower left
//   1.8, -1.5, 0  // lower right
//  ]);

//   const wingsGeoBuffer = new THREE.BufferGeometry();
//   wingsGeoBuffer.setAttribute('position', new THREE.BufferAttribute(wingStabilityVertices, 3));
  
//   //stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ map: spaceShipTexture, side: THREE.DoubleSide }));
//   let stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ color: 0x4293f5, side: THREE.DoubleSide }));

//   const uvMapping = new Float32Array([
//     0.5, 1, // top
//     0, 0, // down left
//     1, 0 // down right
//   ]);

//   wingsGeoBuffer.setAttribute('uv', new THREE.BufferAttribute(uvMapping, 2));

//   boosterEngine.material.map = spaceShipTexture;
//   noseCone.material.map = spaceShipTexture;
//   stabilityWings.material.map = spaceShipTexture;

//   // add the flame to the boosterEngine
//   const flameTexture = new THREE.TextureLoader().load('../assets/flame7.jpg');
//   flameTexture.wrapS = THREE.RepeatWrapping;
//   flameTexture.wrapT = THREE.RepeatWrapping;

//   const flame = new THREE.ConeGeometry(0.7, 2, 32);
//   const flameMaterial = new THREE.MeshBasicMaterial({ map: flameTexture, transparent: true, opacity: 0.7 });
//   const flameMesh = new THREE.Mesh(flame, flameMaterial);
//   flameMesh.position.set(0, -2.2, 0);
//   flameMesh.rotation.x = Math.PI; // rotate the flame to point downwards
  
//   // assemble the spaceship...  
//   boosterEngine.add(noseCone);
//   boosterEngine.add(flameMesh);
//   boosterEngine.add(stabilityWings);


  // boosterEngine combo alias:
  //const rocket = boosterEngine;
  //scene.add(rocket);
  //rocket.position.set(0, 0, 0);//-10, -40);
  //rocket.scale.set(0.35, 0.35, 0.35);

  window.addEventListener("keydown", function(event) {
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
     event.preventDefault();
   }
 });

 let timer = new THREE.Clock();


//  function updateFlameEffect(elapsedTime) {
//   // controls the flicker of the flame
//   flameMesh.material.opacity = 1.0 - Math.sin(elapsedTime * 50)/6;
//   // controls the rate of the up and down flame movement
//   const scaleY = 1.5 + 0.3 * Math.sin(elapsedTime * 100);
//   flameMesh.scale.y = scaleY;
//   flameMesh.position.y = -2.2 - (scaleY - 1);
//   flameMesh.rotation.y = flameMesh.rotation.y + 3; // rotate the flame for added realism
//  }

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
      
  
      let ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.5, 16, 100), new THREE.MeshStandardMaterial({ map: pipeTexture, roughness: 0.3, metalness: 1.0 }));
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

  function animate()
  {
    requestAnimationFrame(animate);

    if (!gameComplete && !gameOverAlerted)
    {
        // Get the elapsed time
        let elapsedTime = timer.getElapsedTime();
        //updateFlameEffect(elapsedTime);

        // keep the rocket falling
        velocityY -= acceleration;

        if (Spaceship)
        {
            Spaceship.position.y += velocityY - 0.13;
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

    
    //camera.position.z = -200;
    //camera.position.set(0, 0, -200);
    // if (Spaceship)
    // {
    //     camera.lookAt(Spaceship.position);
    // }
    //OrbitControls.length(100);

    renderer.render(scene, camera);
 }
 animate();

//  function gameOver()
//  {
//   // while (scene.children.length > 0)
//   // {
//   //   scene.remove(scene.children[0]);
//   // }
//  }


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

   // Function to check for collisions
  function checkCollision()
  {
    if (!Spaceship)
    {
        return;
    }

    let collisionDetected = false;

    const collisionDistance = 1.5;
    for (let i = 0; i < upperPipes.length; ++i)
    {
      let distanceX = Math.abs(Spaceship.position.x - upperPipes[i].position.x);
      let distanceY = Math.abs(Spaceship.position.y - upperPipes[i].position.y);
      if (distanceX < collisionDistance && Spaceship.position.y > (upperPipes[i].position.y - 72)) //distanceY < (collisionDistance - 2 )) 
      {
        collisionDetected = true;
        break;
      }
      distanceX = Math.abs(Spaceship.position.x - lowerPipes[i].position.x);
      distanceY = Math.abs(Spaceship.position.y - lowerPipes[i].position.y);
      if (distanceX < collisionDistance && Spaceship.position.y < (lowerPipes[i].position.y + 70)) //distanceY < (collisionDistance - 2))
      {
        collisionDetected = true;
        break;
      }
      distanceX = Math.abs(Spaceship.position.x - rings[i].position.x);
      distanceY = Math.abs(Spaceship.position.y - rings[i].position.y);
      if (distanceX < 2.0 && distanceY < 1)
      {
        collisionDetected = true;
        break;
      }

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

      //Spaceship.material.color.set(0xff0000);
      //noseCone.material.color.set(0xff0000);
      //stabilityWings.material.color.set(0xff0000);

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
      // reset back to normal color
      //Spaceship.material.color.set(0xffffff);
      //noseCone.material.color.set(0xffffff);
      //stabilityWings.material.color.set(0x4293f5);
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
