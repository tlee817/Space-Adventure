# Space-Adventure

# 🌌 Space Hub – Interactive 3D Graphics Project


## 🚀 Overview

**Space Hub** is a 3D space-themed interactive scene built with **Three.js** for an introductory computer graphics course. The user begins on a floating platform in space where they can choose between two mini-games by clicking interactive objects. The project emphasizes real-time rendering, shader programming, lighting, animation, and user interactivity.

![Main Hub Screenshot](./assets/Screenshot%202025-03-31%20at%2010.23.46%E2%80%AFPM.png)

---

## 🕹️ Features

- 🌠 **Star Field**: Dynamic 3D star background using `THREE.Points`.
- ☀️ **Animated Sun**:
  - Custom GLSL shader simulating surface distortion and dynamic glow.
  - Emits directional light that realistically illuminates the scene.
- 🧭 **Interactive Main Hub**:
  - Clickable planet to enter the **Planet Shooting Game**.
  - Clickable spaceship to enter the **Spaceship Navigation Game**.
- 💡 **Lighting**:
  - Directional light from the sun and ambient lighting for scene balance.
- 💡 **Mappings**:
  - Texture mapping by loading images
  - Displacement mapping by loading displacement and normal maps 
  

---

## 🎮 Mini-Games

### 1. Planet Shooting Game
- Left click and point to shoot bullets toward moving planets.
- Each planet has hitpoints and disappears when destroyed.
- Uses `Raycaster`, custom bullet logic, and simple collision detection.
### Control
- **Mouse Click**: Point at the planet and left click to shoot

![Planet Shooting Screenshot](./assets/Screenshot%202025-03-31%20at%2010.31.48%E2%80%AFPM.png)


### 2. Spaceship Navigation Game
- Use keyboard controls to navigate a spaceship through obstacles.
- Restart if a collision occurs.
- Implements basic physics simulation (planned).
### Control
- **Space Bar**: Jump / ascend the spaceship.
- **Left Arrow**: Pause the forward movement of obstacles (stop the ship from moving forward).
- **Right Arrow**: Resume forward movement.

![Spaceship Game Screenshot](./assets/Screenshot%202025-03-31%20at%2010.32.20%E2%80%AFPM.png)

## 💻 How to Run

To run this project locally, follow these steps:

```bash
git clone https://github.com/tlee817/Space-Adventure.git
cd Space-Adventure
npx vite
```
After running npx vite, it should show something like the following:

![Running Screenshot](./assets/Screenshot%202025-03-31%20at%2010.38.25%E2%80%AFPM.png)

Copy the local host address and paste it in your browser:
![local host](./assets/Screenshot%202025-03-31%20at%2010.40.40%E2%80%AFPM.png)