import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

export function createScene2(renderer, camera) {
    const scene = new THREE.Scene();
    const star = createStarField();
    scene.add(star);
    

    const pointLight = new THREE.PointLight(0xFFFFFF, 5, 25, 0.5);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xFFFFFF, 5, 5, 0.5);
    pointLight2.position.set(0, 0, 23);
    scene.add(pointLight2);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02); //0.02
    scene.add(ambientLight);

    let gun=null;
    //let Vertices=null;
    const loader = new GLTFLoader().setPath('assets/smoking_gun_gltf/');
    loader.load('scene.gltf', (gltf) => {
     const mesh= gltf.scene;
     gun=mesh;
     gun.scale.set(0.2,0.2,0.2);
     gun.position.set(0, -2, 23);
     //console.log(gun.matrix);
     scene.add(gun);
    });

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    window.addEventListener('mousemove', (event) => {
        if (!gun) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const targetPosition = new THREE.Vector3();
        raycaster.ray.at(30, targetPosition);

        gun.lookAt(targetPosition);
    });


    const spheres = [];
    const orbitSpeeds = [5/4, 5/5, 5/7.5, 5/10, 5/12.5, 5/15, 5/17.5];
    const orbitRadii = [2, 4, 6, 8, 11, 14, 19];
    const planetRadii = [1, 1.5, 1.5, 2, 2, 2.5, 3]
    const textures = ['../assets/planettexture.png', '../assets/orange.png', '../assets/red.jpg', '../assets/blue_orange.png',
    '../assets/emerald.png', '../assets/water.jpg', '../assets/earth.png'];

    for (let i = 0; i < 7; i++) {
        const planettexture = new THREE.TextureLoader().load(textures[i]);
        planettexture.wrapS = THREE.RepeatWrapping;
        planettexture.wrapT = THREE.RepeatWrapping;
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(planetRadii[i], 64, 64),
            new THREE.MeshStandardMaterial({map: planettexture, roughness: 1.0, metalness: 0.2})
        );
        sphere.userData = {
            angle: Math.random() * Math.PI * 2,
            radius: orbitRadii[i],
            speed: orbitSpeeds[i]
        };
        scene.add(sphere);
        spheres.push(sphere);
        
    }


    spheres[0].position.y=2.5;
    spheres[1].position.x=-4;
    spheres[2].position.y=-4;
    spheres[3].position.z=-4;
    spheres[4].position.x=6;
    spheres[5].position.x=-4;
    spheres[5].position.y=-4;
    spheres[6].position.y=6;
    spheres[6].position.z=-7;

    // Set Planets' Hitpoints
    for (let i = 0; i < 7; i++) 
    {
       spheres[i].userData.hitpoint = i+1;
    }
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        spheres.forEach(sphere => {
            sphere.userData.angle += sphere.userData.speed * 0.03;
            sphere.position.x = sphere.userData.radius * Math.cos(sphere.userData.angle);
            sphere.position.z = sphere.userData.radius * Math.sin(sphere.userData.angle);
        });
        
    }


    animate();

    return scene;
}
