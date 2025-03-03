import * as THREE from 'three';
// import planetImg from '../assets/planettexture.png';

export function createScene2(renderer, camera) {
    const scene = new THREE.Scene();

    const pointLight = new THREE.PointLight(0xFFFFFF, 5, 25, 0.5);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    scene.add(ambientLight);

    
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
