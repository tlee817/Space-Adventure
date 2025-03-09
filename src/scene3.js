import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createScene3() {
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer();
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);


let light = new THREE.PointLight(0xffffff, 1, 0, 1);
light.position.set(10, 10, 10);
light.power=light.power*50;
scene.add(light);


let Spaceship=null;
let Vertices=null;
const loader = new GLTFLoader().setPath('assets/spaceship_gltf/');
loader.load('scene.gltf', (gltf) => {
const mesh= gltf.scene;
Spaceship=mesh;
Spaceship.scale.set(0.08,0.08,0.08);
Spaceship.position.set(0, 0, 8);
console.log(Spaceship.matrix);
scene.add(Spaceship);
});


 const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
 const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
 const spaceship = new THREE.Mesh(boxGeometry, boxMaterial);
 spaceship.position.set(0, 0, 8);
 scene.add(spaceship);
 spaceship.visible=false;

 const wingGeometry1 = new THREE.BoxGeometry(.5, .5, .5);
 const wing1 = new THREE.Mesh(wingGeometry1 , boxMaterial);
 wing1.position.set(.75, 0, 8);
 scene.add(wing1);
 wing1.visible=false;

 const wing2 = new THREE.Mesh(wingGeometry1 , boxMaterial);
 wing2.position.set(-.75, 0, 8);
 scene.add(wing2);
 wing2.visible=false;

 window.addEventListener("keydown", function(event) {
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
     event.preventDefault();
   }
 });


let planet1_Geometry = new THREE.SphereGeometry(2, 8, 6);
let planet1_Material= new THREE.MeshPhongMaterial( {
   color: 0xC83CB9,
   flatShading: true,
});
let planet1 = new THREE.Mesh( planet1_Geometry, planet1_Material );
planet1.position.set(
 (Math.random() * 10) - 5,  
 0,   
 -(Math.random() * 30 + 20)   
);
scene.add(planet1);
let planet2_Geometry = new THREE.SphereGeometry(2, 8, 6);
let planet2_Material= createPhongMaterial( {
   color: 0x80FFFF,
   ambient: 0.0,
   diffusivity: 0.5,
   specularity: 1.0,
   smoothness: 40.0,
   flatShading:false,
});
let planet2 = new THREE.Mesh(planet2_Geometry, planet2_Material);
planet2.position.set(
  (Math.random() * 10) - 5,  
  0,  
  -(Math.random() * 30 + 20)  
);
scene.add(planet2);

let planet3_Geometry = new THREE.SphereGeometry(2, 16, 16);
let planet3_Material= createPhongMaterial( {
   color: 0xB08040,
   ambient: 0.0,
   diffusivity: 1.0,
   specularity: 1.0,
   smoothness: 100.0,
   flatShading:false,
});
let planet3 = new THREE.Mesh(planet3_Geometry, planet3_Material);
planet3.position.set(
 (Math.random() * 10) - 5,  
 0,   
 -(Math.random() * 30 + 20)    
);
scene.add(planet3);


function createPhongMaterial(materialProperties) {
 const numLights = 1;
 let shape_color_representation = new THREE.Color(materialProperties.color);
 let shape_color = new THREE.Vector4(
     shape_color_representation.r,
     shape_color_representation.g,
     shape_color_representation.b,
     1.0
 );


 let vertexShader = `
     precision mediump float;
     const int N_LIGHTS = ${numLights};
     uniform float ambient, diffusivity, specularity, smoothness;
     uniform vec4 light_positions_or_vectors[N_LIGHTS];
     uniform vec4 light_colors[N_LIGHTS];
     uniform float light_attenuation_factors[N_LIGHTS];
     uniform vec4 shape_color;
     uniform vec3 squared_scale;
     uniform vec3 camera_center;
     varying vec3 N, vertex_worldspace;


     // ***** PHONG SHADING HAPPENS HERE: *****
     vec3 phong_model_lights(vec3 N, vec3 vertex_worldspace) {
         vec3 E = normalize(camera_center - vertex_worldspace); // View direction
         vec3 result = vec3(0.0); // Initialize the output color
         for(int i = 0; i < N_LIGHTS; i++) {
             // Calculate the vector from the surface to the light source
             vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz -
                 light_positions_or_vectors[i].w * vertex_worldspace;
             float distance_to_light = length(surface_to_light_vector); // Light distance
             vec3 L = normalize(surface_to_light_vector); // Light direction
            
             // Phong uses the reflection vector R
             vec3 R = reflect(-L, N); // Reflect L around the normal N
            
             float diffuse = max(dot(N, L), 0.0); // Diffuse term
             float specular = pow(max(dot(R, E), 0.0), smoothness); // Specular term
            
             // Light attenuation
             float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light);
            
             // Calculate the contribution of this light source
             vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                     + light_colors[i].xyz * specularity * specular;
             result += attenuation * light_contribution;
         }
         return result;
     }


     uniform mat4 model_transform;
     uniform mat4 projection_camera_model_transform;


     void main() {
         gl_Position = projection_camera_model_transform * vec4(position, 1.0);
         N = normalize(mat3(model_transform) * normal / squared_scale);
         vertex_worldspace = (model_transform * vec4(position, 1.0)).xyz;
     }
 `;

 let fragmentShader = `
     precision mediump float;
     const int N_LIGHTS = ${numLights};
     uniform float ambient, diffusivity, specularity, smoothness;
     uniform vec4 light_positions_or_vectors[N_LIGHTS];
     uniform vec4 light_colors[N_LIGHTS];
     uniform float light_attenuation_factors[N_LIGHTS];
     uniform vec4 shape_color;
     uniform vec3 camera_center;
     varying vec3 N, vertex_worldspace;


     // ***** PHONG SHADING HAPPENS HERE: *****
     vec3 phong_model_lights(vec3 N, vec3 vertex_worldspace) {
         vec3 E = normalize(camera_center - vertex_worldspace); // View direction
         vec3 result = vec3(0.0); // Initialize the output color
         for(int i = 0; i < N_LIGHTS; i++) {
             // Calculate the vector from the surface to the light source
             vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz -
                 light_positions_or_vectors[i].w * vertex_worldspace;
             float distance_to_light = length(surface_to_light_vector); // Light distance
             vec3 L = normalize(surface_to_light_vector); // Light direction
            
             // Phong uses the reflection vector R
             vec3 R = reflect(-L, N); // Reflect L around the normal N
            
             float diffuse = max(dot(N, L), 0.0); // Diffuse term
             float specular = pow(max(dot(R, E), 0.0), smoothness); // Specular term
            
             // Light attenuation
             float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light);
            
             // Calculate the contribution of this light source
             vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                     + light_colors[i].xyz * specularity * specular;
             result += attenuation * light_contribution;
         }
         return result;
     }


     void main() {
         // Compute an initial (ambient) color:
         vec4 color = vec4(shape_color.xyz * ambient, shape_color.w);
         // Compute the final color with contributions from lights:
         color.xyz += phong_model_lights(normalize(N), vertex_worldspace);
         gl_FragColor = color;
     }
 `;
 const uniforms = {
     ambient: { value: materialProperties.ambient },
     diffusivity: { value: materialProperties.diffusivity },
     specularity: { value: materialProperties.specularity },
     smoothness: { value: materialProperties.smoothness },
     shape_color: { value: shape_color },
     squared_scale: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
     camera_center: { value: new THREE.Vector3() },
     model_transform: { value: new THREE.Matrix4() },
     projection_camera_model_transform: { value: new THREE.Matrix4() },
     light_positions_or_vectors: { value: [] },
     light_colors: { value: [] },
     light_attenuation_factors: { value: [] }
 };

 return new THREE.ShaderMaterial({
     vertexShader: vertexShader,
     fragmentShader: fragmentShader,
     uniforms: uniforms
 });
}
function updatePlanetMaterialUniforms(planet) {
 const material = planet.material;
 if (!material.uniforms) return;


 const uniforms = material.uniforms;


 const numLights = 1;
 const lights = scene.children.filter(child => child.isLight).slice(0, numLights);
 if (lights.length < numLights) {
     console.warn(`Expected ${numLights} lights, but found ${lights.length}. Padding with default lights.`);
 }
 planet.updateMatrixWorld();
 camera.updateMatrixWorld();


 uniforms.model_transform.value.copy(planet.matrixWorld);
 uniforms.projection_camera_model_transform.value.multiplyMatrices(
     camera.projectionMatrix,
     camera.matrixWorldInverse
 ).multiply(planet.matrixWorld);

 uniforms.camera_center.value.setFromMatrixPosition(camera.matrixWorld);

 const scale = planet.scale;
 uniforms.squared_scale.value.set(
     scale.x * scale.x,
     scale.y * scale.y,
     scale.z * scale.z
 );

 uniforms.light_positions_or_vectors.value = [];
 uniforms.light_colors.value = [];
 uniforms.light_attenuation_factors.value = [];


 for (let i = 0; i < numLights; i++) {
     const light = lights[i];
     if (light) {
         let position = new THREE.Vector4();
         if (light.isDirectionalLight) {
             const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(light.quaternion);
             position.set(direction.x, direction.y, direction.z, 0.0);
         } else if (light.position) {
             position.set(light.position.x, light.position.y, light.position.z, 1.0);
         } else {
             position.set(0.0, 0.0, 0.0, 1.0);
         }
         uniforms.light_positions_or_vectors.value.push(position);

         const color = new THREE.Vector4(light.color.r, light.color.g, light.color.b, 1.0);
         uniforms.light_colors.value.push(color);

         let attenuation = 0.0;
         if (light.isPointLight || light.isSpotLight) {
             const distance = light.distance || 1000.0; 
             attenuation = 1.0 / (distance * distance);
         } else if (light.isDirectionalLight) {
             attenuation = 0.0; 
         }
         const intensity = light.intensity !== undefined ? light.intensity : 1.0;
         attenuation *= intensity;


         uniforms.light_attenuation_factors.value.push(attenuation);
     } else {
         uniforms.light_positions_or_vectors.value.push(new THREE.Vector4(0.0, 0.0, 0.0, 0.0));
         uniforms.light_colors.value.push(new THREE.Vector4(0.0, 0.0, 0.0, 1.0));
         uniforms.light_attenuation_factors.value.push(0.0);
     }
 }
}


 function createPlanet(color) {
   const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
   const sphereMaterial = new THREE.MeshBasicMaterial({ color: color });
   const planet = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
   // Random initial position
   planet.position.set(
     (Math.random() * 10) - 5,  // Random x (-5 to 5)
     0,   //don't move the planets up and down on the y axis (stays constant)
     -(Math.random() * 30 + 20)    // Random z (between 20 and 50)
   );
  
   scene.add(planet);
   return planet;
 }


 // Create multiple planets
 let planets = [planet1, planet2, planet3];


 camera.position.z = 10;
 let moveSpeed = 0.3;
 const sphereRadius = 2; // Planet radius


 // Event listeners for movement using arrow keys
 document.addEventListener('keydown', (event) => {
   switch (event.key) {
     case 'ArrowUp':
      Spaceship.position.y += moveSpeed; 
      spaceship.position.y += moveSpeed;
      wing1.position.y += moveSpeed;
      wing2.position.y += moveSpeed;
      break;
     case 'ArrowDown': 
      Spaceship.position.y -= moveSpeed;
      spaceship.position.y -= moveSpeed;
      wing1.position.y -= moveSpeed;
      wing2.position.y -= moveSpeed; 
      break;
     case 'ArrowLeft': 
      Spaceship.position.x -= moveSpeed;
      spaceship.position.x -= moveSpeed;
      wing1.position.x -= moveSpeed;
      wing2.position.x -= moveSpeed;  
      break;
     case 'ArrowRight': 
      Spaceship.position.x += moveSpeed; 
      spaceship.position.x += moveSpeed;
      wing1.position.x += moveSpeed;
      wing2.position.x += moveSpeed; 
      break;
   }
 });

 


 // Function to find the closest point on the spaceship (AABB) to the planet
 function getClosestPoint(spaceship, spherePos) {
  const spaceshipMin = spaceship.position.clone().subScalar(0.5); // Half-size of box is 0.5
  const spaceshipMax = spaceship.position.clone().addScalar(0.5);


  return new THREE.Vector3(
    Math.max(spaceshipMin.x, Math.min(spherePos.x, spaceshipMax.x)),
    Math.max(spaceshipMin.y, Math.min(spherePos.y, spaceshipMax.y)),
    Math.max(spaceshipMin.z, Math.min(spherePos.z, spaceshipMax.z))
  );
 }
 function getClosestPointWing(wing, spherePos) {
  const spaceshipMin = spaceship.position.clone().subScalar(0.25); // Half-size of box is 0.5
  const spaceshipMax = spaceship.position.clone().addScalar(0.25);


  return new THREE.Vector3(
    Math.max(spaceshipMin.x, Math.min(spherePos.x, spaceshipMax.x)),
    Math.max(spaceshipMin.y, Math.min(spherePos.y, spaceshipMax.y)),
    Math.max(spaceshipMin.z, Math.min(spherePos.z, spaceshipMax.z))
  );
}

function checkCollision() {
  let collisionDetected = false;


  for (let planet of planets) {
    const closestPoint = getClosestPoint(spaceship, planet.position);
    const distance = closestPoint.distanceTo(planet.position);

    const closestPointWing1 = getClosestPoint(wing1, planet.position);
    const distanceWing1 = closestPointWing1.distanceTo(planet.position);

    const closestPointWing2 = getClosestPoint(wing2, planet.position);
    const distanceWing2 = closestPointWing2.distanceTo(planet.position);

    if (distance < sphereRadius|| distanceWing1 < sphereRadius || distanceWing2 < sphereRadius) {
      collisionDetected = true;
      break;
    }
  }


    if (collisionDetected) {
      console.log("Collision detected!");
      //spaceship.material.color.set(0xff0000); 
      const texture = new THREE.TextureLoader().load('/assets/Game-Over (1).png');
      const geometry = new THREE.BoxGeometry( 4, 4, 4);
      const material = new THREE.MeshBasicMaterial( { map: texture } );
      const GameOverMesh = new THREE.Mesh(geometry, material);
      GameOverMesh.position.set(0,3,12);
      scene.add(GameOverMesh);
      for(let planet of planets){
        planet.visible=!visibility;
      }
      start=false;
    } 
  }

 let planetSpeed=0.2;
 function animate() {
   requestAnimationFrame(animate);
  if(start){
   planets.forEach(planet => {
     planet.position.z += planetSpeed; 
     checkCollision();
     if (planet.position.z > 10) {
       planet.position.set(
         (Math.random() * 10) - 5,  
         0,  
         -(Math.random() * 30 + 20)    
       );
     }
     checkCollision();
   });
    planetSpeed+=.00005;
    checkCollision();
  }
  for(let planet of planets){
     updatePlanetMaterialUniforms(planet);
  }
   renderer.render(scene, camera);
 }
 
 animate();
 return scene;

}

let start=false;
let visibility=true;
window.addEventListener('keydown', onKeyPress); 
function onKeyPress(event) {
    switch (event.key) {
        case 's': 
            start = !start;
            break;
        default:
            console.log(`Key ${event.key} pressed`);

    }
}



