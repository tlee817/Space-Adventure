import * as THREE from 'three';

export function createScene3() {
    const scene = new THREE.Scene();

    const spaceship = new THREE.Mesh( new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    
    scene.add(spaceship);

    return scene;
}
