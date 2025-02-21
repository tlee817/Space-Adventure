import * as THREE from 'three';

export function createScene2(renderer, camera) {
    const scene = new THREE.Scene();

    const sphereSpacing = 2.5;
    const spheres = [];
    for (let i = 0; i < 7; i++) {
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x0000ff })
        );
        // sphere.position.y = i * sphereSpacing; 
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


    return scene;
}
