import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createScene1 } from './scene1.js';
import { createScene2 } from './scene2.js';
import { createScene3} from './scene3.js';
//import { createScene2Pt5 } from './scene2Pt5.js'; // TODO: enable when the js is available

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
const { scene: scene1, main_hub_planet, main_hub_spaceship, sun } = createScene1(renderer,camera);
const scene2 = createScene2(renderer, camera);

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
                // don't create scene 3 until it's been clicked on/selected
                const scene3 = createScene3();
                activeScene = scene3;
            }
            else if (clickedObject === sun)
            {
                // TODO: enable when scene2Pt5.js has been added
                //const scene2Pt5 = createScene2Pt5();
                //activeScene = scene2Pt5;
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
    
    if(activeScene===scene1)
    {
        const stars = activeScene.children.find(obj => obj.userData.isStarField);
        if (stars) {
            stars.rotation.y += 0.0003; 
            stars.rotation.x += 0.0001;
            stars.rotation.z += 0.0002;
        }
    }

    renderer.render(activeScene, camera);
}

animate();


/*
Notes:
Scene 1: Main Hub
Scene 2: Planet shooting
Scene 2Pt5 Flappy Bird Rocket Edition (if click on the big yellow sun)
Scene 3: Flying Spaceship

Comment:
- Might need to separate scenes into different files later
- 
- Run "npm start" to ensure vite dependency is installed and to start vite all in one easy command
*/
