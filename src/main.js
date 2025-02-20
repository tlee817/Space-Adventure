import { act } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 5, 20);
camera.lookAt(0, 0, 0);

// Control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enabled = true;
controls.minDistance = 10;
controls.maxDistance = 50;

// Main Hub
const scene1 = new THREE.Scene();

// Game 1: Platnet shooting
const scene2 = new THREE.Scene();

// Game 2 : Flying Spaceship
const scene3 = new THREE.Scene();

// Current Scene
let activeScene = scene1;

// Comment: Sun is just a light source in the main hub (No real usage , can remove later)
// Sun 
let sun_Geometry = new THREE.SphereGeometry(1,10,10);
let sun_Material = new THREE.MeshBasicMaterial({color: 0xffffff});
let sun = new THREE.Mesh(sun_Geometry, sun_Material);
scene1.add(sun);

let sunLight = new THREE.PointLight(0xffffff,1,0,1);
sunLight.position.set(0,0,0);
scene1.add(sunLight);

// Main Hub gameplay option (Button for Planet Shooting)
let main_hub_planet_Geometry = new THREE.SphereGeometry(1,8,8);
let main_hub_planet_Material = new THREE.MeshPhongMaterial({ color:0x80FFFF , ambient: 0.0 , diffusivity: 0.5 , specularity: 1.0 , smoothness: 40.0});
let main_hub_planet = new THREE.Mesh(main_hub_planet_Geometry,main_hub_planet_Material)
main_hub_planet.position.set(0,0,0);
scene1.add(main_hub_planet); 
main_hub_planet.position.x = -2;

// Main Hub gameplay option (Button for Flying spaceship)
const main_hub_spaceship_geometry = new THREE.BoxGeometry(1, 1, 1);
const main_hub_spaceship_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const main_hub_spaceship = new THREE.Mesh(main_hub_spaceship_geometry, main_hub_spaceship_material);
main_hub_spaceship.position.x = 2;
scene1.add(main_hub_spaceship);

// Comment: Random Object in gameplay scenes (This needs work)
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
scene2.add(sphere);

const spaceship = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
scene3.add(spaceship);




// Main Hub (Select game)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(activeScene.children);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;

        if (clickedObject === main_hub_planet) {
            activeScene = scene2;
        } else if (clickedObject === main_hub_spaceship) {
            activeScene = scene3;
        }
    }
});


function animate() {
    requestAnimationFrame(animate);

    if (controls.enabled) {
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