// Create scene
let scene = new THREE.Scene();

// Create GLTF loader
const loader = new THREE.GLTFLoader();

// Create camera
let camera = new THREE.PerspectiveCamera(
  75, // fov - Camera frustum vertical field of view
  window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
  0.1, // near - Camera frustum near plane
  5000 // far - Camera frustum far plane.
);

// Create renderer
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Textures
let grassTexture = "./textures/grass-texture.jpg";
let doorTexture = "./textures/door-texture.png";
let roadTexture = "./textures/road-texture.jpeg";
let houseTexture = "./textures/brick-texture.jpg";
let clockTexture = "./textures/clock-texture.png";
let houseTextures = [
  "./textures/brick-texture.jpg",
  "./textures/brick-texture.jpg",
  "./textures/roof-texture.jpg", // Top of the cube
  "./textures/brick-texture.jpg",
  "./textures/brick-texture.jpg",
  "./textures/brick-texture.jpg",
];
let windowTexture = "./textures/window-texture.png";
let roofTextures = [
  "./textures/roof-texture.jpg", // The sides of the cylinder.
  "./textures/brick-texture.jpg", // Top
  "./textures/brick-texture.jpg", // Bottom
];

//Classes.
let skybox = new Skybox();
let movement = new Movement();
let lights = new Light(scene);
let floors = new Floors(grassTexture, roadTexture);
let houses = new Houses(
  houseTexture,
  houseTextures,
  doorTexture,
  roofTextures,
  windowTexture
);
let clocks = new Clock(clockTexture);
let car = new Car(scene, loader);
let ufo = new Ufo(scene, loader);
let lamppost = new Lamppost(scene);
let tree = new Tree(scene);

// Deltaclock for animation.
let clock = new THREE.Clock();

// Movement variables.
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// Add skybox
skybox.addSkybox(scene);

// Add lights
lights.addLights();

// Add a floor and a road.
floors.addFloors(scene);

// Add houses.
houses.addHouses(scene);

// Add clocks.
clocks.addClocks(scene);

// Add car
car.addCar(-10, 0, 8, 0, 0, -4.7, {
  car: {
    posX: 30,
  },
  tires: {
    rotX: 30,
  },
  callback: (carobject) => {
    if (carobject.car.position.x >= floors.floors[1].width / 2) {
      carobject.car.position.x = -floors.floors[1].width / 2;
    }
  },
});

let xrot = 0.05;
let tempxpos = 0;
car.addCar(
  10,
  0,
  -8,
  0,
  0,
  4.7,
  {
    car: {
      posX: -35,
    },
    tires: {
      rotX: 30,
    },
    callback: (carobject) => {
      if (carobject.car.position.x <= -floors.floors[1].width / 2) {
        carobject.car.position.x = floors.floors[1].width / 2;
        tempxpos = carobject.car.position.x;
      }

      if (carobject.car.position.x <= tempxpos - 7) {
        carobject.car.children[0].children[0].children[0].children[0].rotation.z = xrot;
        carobject.car.children[0].children[0].children[0].children[0].rotation.x =
          Math.random() * 0.1 - 0.05;

        xrot = xrot * -1;
        tempxpos = carobject.car.position.x;
      }
    },
  },
  true
);

car.addCar(50, 1, 33, 0, 0, 0, {
  car: {
    posY: 1,
    rotY: 0.1,
    rotX: 0.1,
    rotZ: 0.1,
  },
  callback: (carobject) => {
    if (carobject.car.position.y >= 20) {
      carobject.options.car.posY = -1;
    } else if (carobject.car.position.y <= 1) {
      carobject.options.car.posY = 1;
    }
  },
});

// Add ufo
ufo.addUfo(50, -25, 35);

// Add lampposts
lamppost.addLamppost(0, 0, -20);

// Add trees
tree.addTree(10, 0, -20);
tree.addTree(10, 0, -40, false);
tree.addTree(10, 0, -60);
tree.addTree(10, 0, -80, false);

// Move camera from center
camera.position.x = 1; // Move right from center of scene
camera.position.y = 1; // Move up from center of scene
camera.position.z = 15; // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the PointerLockcontrols
let controls = new THREE.PointerLockControls(camera, renderer.domElement);
movement.AddPointerEvents(controls, scene);

let render = function () {
  requestAnimationFrame(render);
  car.animateCars(clock.getDelta());

  // For the movement.
  const time = performance.now();

  if (controls.isLocked === true) {
    movement.CalculateMovement(time, prevTime, velocity, direction, controls);
  }

  prevTime = time;
  renderer.render(scene, camera);
};

render();
