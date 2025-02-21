import * as THREE from 'three';

export function createScene2() {
    const scene = new THREE.Scene();

    const sphere = new THREE.Mesh( new THREE.SphereGeometry(1, 32, 32),new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    scene.add(sphere);

    return scene;
}
