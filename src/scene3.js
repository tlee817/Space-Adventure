import * as THREE from 'three';

export function createScene3() {
    const scene = new THREE.Scene();

    const spaceship = new THREE.Mesh( new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
    spaceship.position.set(0, 0, 0);

    const boosterEngine = new THREE.Mesh( new THREE.CylinderGeometry(0.8, 0.8, 3), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    boosterEngine.position.set(0, -2.2, 0);

    const wingStabilityVertices = new Float32Array([
        0,  1, 0,   // Top
        -1, -4, 0, // lower left
        1, -4, 0   // lower right
      ]);
      
      // geometry sets up wingStability from the vertices
      const wingsGeoBuffer = new THREE.BufferGeometry();
      wingsGeoBuffer.setAttribute('position', new THREE.BufferAttribute(wingStabilityVertices, 3));

      const stabilityWings = new THREE.Mesh(wingsGeoBuffer, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
      scene.add(stabilityWings);

    scene.add(spaceship);
    scene.add(boosterEngine);

    return scene;
}
