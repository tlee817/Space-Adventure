import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createScene1 } from './scene1.js';
import { createScene2 } from './scene2.js';
import { createScene3, spaceship, stabilityWings, boosterEngine } from './scene3.js';

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


// scene3 code:
// globals to keep track of scene3 spaceship's position
let spX = 0;
let spY = 0;
let beX = 0;
let beY = -2.2;
let swX = 0;
let swY = 0;
const jumpAmount = 0.3;
// onKeyPress is called each time a key is pressed
window.addEventListener('keydown', onKeyPress);
// keypress function scene3 spaceship flight controls
function onKeyPress(event) {
    //console.log(`Key ${event.key} pressed`);
    if (activeScene === scene3) // for flying the spaceship
    {
        switch (event.key) {
            case "ArrowUp": // up arrow
                spY = spY + jumpAmount;
                beY = beY + jumpAmount;
                swY = swY + jumpAmount;
                spaceship.position.set(spX, spY, 0);
                boosterEngine.position.set(beX, beY, 0);
                stabilityWings.position.set(swX, swY, 0);
                //console.log(`Key ${event.key} pressed`);
                break;
            case "ArrowDown": // down arrow pressed
                spY = spY - jumpAmount / 3;
                beY = beY - jumpAmount / 3;
                swY = swY - jumpAmount / 3;
                spaceship.position.set(spX, spY, 0);
                boosterEngine.position.set(beX, beY, 0);
                stabilityWings.position.set(swX, swY, 0);
                //console.log(`Key ${event.key} pressed`);
                break;
            case "ArrowLeft":
                spX = spX - jumpAmount / 2;
                beX = beX - jumpAmount / 2;
                swX = swX - jumpAmount / 2;
                spaceship.position.set(spX, spY, 0);
                boosterEngine.position.set(beX, beY, 0);
                stabilityWings.position.set(swX, swY, 0);
                //console.log(`Key ${event.key} pressed`);
                break;
            case "ArrowRight":
                spX = spX + jumpAmount / 2;
                beX = beX + jumpAmount / 2;
                swX = swX + jumpAmount / 2;
                spaceship.position.set(spX, spY, 0);
                boosterEngine.position.set(beX, beY, 0);
                stabilityWings.position.set(swX, swY, 0);
                //console.log(`Key ${event.key} pressed`);
                break;
            default:
                console.log(`Default Key ${event.key} pressed`);
        }
    }
}
const smallNegativeYMovement = 0.02;

let planetCollisionGeometry = new THREE.SphereGeometry(1, 8, 8);
let planetCollisionMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x80FFFF, 
    specular: 0xffffff, 
    shininess: 40 
});
let collisionPlanet = new THREE.Mesh(planetCollisionGeometry, planetCollisionMaterial);
collisionPlanet.position.set(-2, 10, 0);
let cpX = -2;
let cpY = 5;
let cpXDelta = 0.01;
let cpYDelta = -0.05;
let addedCollisionPlanet = false;

function scene3FlightSimulationUpdate()
{
    if (activeScene === scene3)
    {
        // auto enable negative movement of the spaceship, in -y direction to simulate flight
        spY = spY - smallNegativeYMovement;
        beY = beY - smallNegativeYMovement;
        swY = swY - smallNegativeYMovement;
        spaceship.position.set(spX, spY, 0);
        boosterEngine.position.set(beX, beY, 0);
        stabilityWings.position.set(swX, swY, 0);

        // for a certain amount of time, have planets zoom by the spaceship
        if (!addedCollisionPlanet)
        {
            addedCollisionPlanet = true;
            scene3.add(collisionPlanet); // do once
        }
        else
        {
            cpX = cpX + cpXDelta;
            cpY = cpY + cpYDelta;
            collisionPlanet.position.set(cpX, cpY, 0);
        }
    }
}


function animate() {
    requestAnimationFrame(animate);
    if(controls.enabled)
    {
     controls.update();
    }
    renderer.render(activeScene, camera);

    scene3FlightSimulationUpdate();
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
