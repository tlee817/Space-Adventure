import * as THREE from 'three';

export function createScene1() {
    const scene = new THREE.Scene();

    // Comment: Sun is just a light source in the main hub (No real usage , can remove later)
    let sun_Geometry = new THREE.SphereGeometry(1, 10, 10);
    let sun_Material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let sun = new THREE.Mesh(sun_Geometry, sun_Material);
    scene.add(sun);

    let sunLight = new THREE.PointLight(0xffffff, 1, 0, 1);
    sunLight.position.set(0, 3, 0);
    scene.add(sunLight);

    // Main Hub (Select game)
    let main_hub_planet_Geometry = new THREE.SphereGeometry(1, 8, 8);
    let main_hub_planet_Material = new THREE.MeshPhongMaterial({ 
        color: 0x80FFFF, 
        specular: 0xffffff, 
        shininess: 40 
    });
    let main_hub_planet = new THREE.Mesh(main_hub_planet_Geometry, main_hub_planet_Material);
    main_hub_planet.position.set(-2, 0, 0);
    scene.add(main_hub_planet);

    const main_hub_spaceship_geometry = new THREE.BoxGeometry(1, 1, 1);
    const main_hub_spaceship_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const main_hub_spaceship = new THREE.Mesh(main_hub_spaceship_geometry, main_hub_spaceship_material);
    main_hub_spaceship.position.set(2, 0, 0);
    scene.add(main_hub_spaceship);

    return { scene, main_hub_planet, main_hub_spaceship }; 
}
