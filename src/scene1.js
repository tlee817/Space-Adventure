import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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

    // 2nd Directional Light
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight2.position.set(50, -100, 50);
    directionalLight2.castShadow = true;
    scene.add(directionalLight2);

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


    const transparent_geometry = new THREE.BoxGeometry(5, 2, 1);
    const transparent_material = new THREE.MeshBasicMaterial
    ({
    color: 0x00ff00, 
    transparent: true, 
    opacity: 0,     
    });
    const main_hub_spaceship = new THREE.Mesh(transparent_geometry, transparent_material);
    scene.add(main_hub_spaceship);
    main_hub_spaceship.position.set(3.2, 0, 5.3);

    //Spaceship
    let spaceship;
    const loader = new GLTFLoader().setPath('assets/hull_spaceship_gltf/');
    loader.load('scene.gltf', (gltf) => {
      const mesh= gltf.scene;
      spaceship=mesh;
      //Spaceship = new gltf.scene;
      spaceship.scale.set(0.3,0.3,0.3);
      spaceship.position.set(3, -3, 0);
      spaceship.rotation.set(0, -3.14/2, 0);
      //console.log(Spaceship.matrix);
      scene.add(spaceship);
  
      // directionalLight.target = Spaceship;
      // scene.add(directionalLight.target);
    });

    function animate() {
        requestAnimationFrame(animate);
        
        main_hub_planet.rotation.y += 0.002;
        //Spaceship.rotation.x += 0.005;
        //Spaceship.rotation.y += 0.005;
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


