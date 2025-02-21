import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createScene1 } from './scene1.js';
import { createScene2 } from './scene2.js';
import { createScene3 } from './scene3.js';

// Renderer 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera 
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);
camera.lookAt(0, 0, 0);

// Control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.minDistance = 10;
controls.maxDistance = 50;

// Create Scenes
const { scene: scene1, main_hub_planet, main_hub_spaceship } = createScene1();
const scene2 = createScene2(renderer, camera);
const scene3 = createScene3();

let activeScene = scene1;

// Click
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if(activeScene === scene1)  // Main Hub
    {
    const intersects = raycaster.intersectObjects(scene1.children);
    if (intersects.length > 0) 
    {
        const clickedObject = intersects[0].object;

        if (clickedObject === main_hub_planet) 
        {
            activeScene = scene2;
        }else if (clickedObject === main_hub_spaceship) 
        {
            activeScene = scene3;
        }
    }
    }else if(activeScene===scene2)  // Planet Shooting
    {
        const intersects = raycaster.intersectObjects(scene2.children);
        if (intersects.length > 0) 
        {
            const clickedPlanet = intersects[0].object;
            clickedPlanet.userData.hitpoint =  clickedPlanet.userData.hitpoint -1;
            console.log("hitpoint: ", clickedPlanet.userData.hitpoint );
            if (clickedPlanet.userData.hitpoint === 0) 
            {
                activeScene.remove(clickedPlanet);
            }
        }
    }else   // Flying Spaceship
    {

    }
});


function animate() {
    requestAnimationFrame(animate);
    if(controls.enabled)
    {
     controls.update();
    }
    renderer.render(activeScene, camera);
}

animate();


/*
Notes:
Scene 1: Main Hub
Scene 2: Platnet shooting
Scene 3: Flying Spaceship

Comment:
- Might need to separate scenes into different files later
- 
*/