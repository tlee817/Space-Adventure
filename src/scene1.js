import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let clock = new THREE.Clock();
let time = clock.getElapsedTime();

// Star Background
export function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1, 
        transparent: true
    });

    const starVertices = [];
    for (let i = 0; i < 5000; i++) { 
        const x = (Math.random() - 0.5) * 100; 
        const y = (Math.random() - 0.5) * 100; 
        const z = (Math.random() - 0.5) * 100;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    stars.userData.isStarField = true;
    return stars;
}


// Moon texture
const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load('assets/moon_bump.jpg');  
const displacementMap = textureLoader.load('assets/moon_map.jpg'); 
const normalMap = textureLoader.load('assets/moon_normal.jpg');



// Main Hub Scene

export function createScene1(renderer, camera) {
    const scene = new THREE.Scene();

    camera.position.set(0, 5, 20);


    const star = createStarField();
    scene.add(star);

    
    //const sunMaterial = createSunMaterial();
    //const sunGeometry = new THREE.SphereGeometry(50, 32, 32); 
    const sunColor = new THREE.Color("#FFFFFF");    //FD8813
    const sunMaterial = new THREE.MeshStandardMaterial({
        emissive: sunColor,   
        emissiveIntensity: 3, 
        roughness: 0.5,      
    });
    const sunGeometry = new THREE.IcosahedronGeometry(1,15);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    //sun.position.set(-140, -50, -500); 
    sun.position.set(-20,0,-40);
    scene.add(sun);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3,100); 
    sunLight.position.set(-250, -50, -500);
    sunLight.target.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(sunLight.target);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Text


    // Main Hub (Select game)
    let main_hub_planet_Geometry = new THREE.SphereGeometry(1.5, 32, 32);
    let main_hub_planet_Material = new THREE.MeshPhongMaterial({
        map: moonTexture,
        displacementMap: displacementMap, 
        displacementScale: 0.3,
        normalMap: normalMap
    });
    let main_hub_planet = new THREE.Mesh(main_hub_planet_Geometry, main_hub_planet_Material);
    main_hub_planet.position.set(-2, 0, 0);
    scene.add(main_hub_planet);

    let Spaceship;
    const spaceship_loader = new GLTFLoader().setPath('assets/hull_spaceship_gltf/');
    spaceship_loader.load('scene.gltf', (gltf) => {
    const mesh= gltf.scene;
    Spaceship=mesh;
    //Spaceship = new gltf.scene;
    Spaceship.scale.set(0.1,0.1,0.1);
    Spaceship.position.set(2,0,0);
    Spaceship.rotation.set(3.14/8, -3.14/2, 0);
    //console.log(Spaceship.matrix);
    scene.add(Spaceship);

    // directionalLight.target = Spaceship;
    // scene.add(directionalLight.target);
  });


    const main_hub_spaceship_geometry = new THREE.BoxGeometry(1, 1, 1);
    const main_hub_spaceship_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const main_hub_spaceship = new THREE.Mesh(main_hub_spaceship_geometry, main_hub_spaceship_material);
    main_hub_spaceship.position.set(2, 0, 0);
    scene.add(main_hub_spaceship);

    function animate() {
        requestAnimationFrame(animate);
        
        main_hub_planet.rotation.y += 0.002; 
        let time = clock.getElapsedTime();
  
        let period10 = time % 10.0;
    
        let scaleFactor = 1;
        if(period10 < 5)
        {
            scaleFactor = 1 + 1.2 *(period10/5);
        }
        else{  //period10 >= 5
            scaleFactor = 1 + 1.2 *((10-period10)/5);
        }

        sun.scale.set(scaleFactor, scaleFactor, scaleFactor);
        renderer.render(scene, camera);
    }
    animate();


    return { scene, main_hub_planet, main_hub_spaceship, sun }; 
}


