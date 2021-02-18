// Create scene
let scene = new THREE.Scene();

// Create GLTF loader
const loader = new THREE.GLTFLoader();

// Create camera
let camera = new THREE.PerspectiveCamera(
  75, // fov - Camera frustum vertical field of view
  window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
  0.1, // near - Camera frustum near plane
  5000
); // far - Camera frustum far plane
// If the skybox gets added, change the far "1000" to "4000".

// Create renderer
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Textures
var grassTexture = "./textures/grass-texture.jpg";
var doorTexture = "./textures/door-texture.png";
var roadTexture = "./textures/road-texture.jpeg";
var houseTexture = "./textures/brick-texture.jpg";
var clockTexture = "./textures/clock-texture.png";
var houseTextures = [
  "./textures/brick-texture.jpg",
  "./textures/brick-texture.jpg",
  "./textures/roof-texture.jpg", // Top of the cube
  "./textures/brick-texture.jpg",
  "./textures/brick-texture.jpg",
  "./textures/brick-texture.jpg",
];
var windowTexture = "./textures/window-texture.png";
var roofTextures = [
  "./textures/roof-texture.jpg", // The sides of the cylinder.
  "./textures/brick-texture.jpg", // Top
  "./textures/brick-texture.jpg", // Bottom
];

// Skybox
new Skybox().addSkybox(scene);

//Define light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

// TODO: Dit kan weg wanneer we helemaal happy de peppie met het licht zijn
const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
scene.add(hemiLightHelper);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(-1, 1.75, 1);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = -0.0001;

// TODO: Dit kan weg wanneer we helemaal happy de peppie met het licht zijn
const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
scene.add(dirLightHelper);

// Add a floor and a road.
let floor = new Floors(grassTexture, roadTexture);
floor.addFloors(scene);

// Create houses.
new Houses(
  houseTexture,
  houseTextures,
  doorTexture,
  roofTextures,
  windowTexture
).addHouses(scene);

// Create clocks.
new Clock(clockTexture).addClocks(scene);

// Add car
let car = new Car(scene, loader);

car.addCar(-10, 0, 8, 0, 0, -4.7, {
  car: {
    posX: 30,
  },
  tires: {
    rotX: 30,
  },
  callback: (carobject) => {
    if (carobject.car.position.x >= floor.floors[1].width / 2) {
      carobject.car.position.x = -floor.floors[1].width / 2;
    }
  },
});

car.addCar(10, 0, -8, 0, 0, 4.7, {
  car: {
    posX: -35,
  },
  tires: {
    rotX: 30,
  },
  callback: (carobject) => {
    if (carobject.car.position.x <= -floor.floors[1].width / 2) {
      carobject.car.position.x = floor.floors[1].width / 2;
    }
  },
});

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
let ufo = new Ufo(scene, loader);
ufo.addUfo(50, -25, 35);

// Create lampposts
let lamppost = new Lamppost(scene);
lamppost.addLamppost(0, 0, -20);

// Create trees
let tree = new Tree(scene);
tree.addTree(10, 0, -20);
tree.addTree(10, 0, -40, false);
tree.addTree(10, 0, -60);
tree.addTree(10, 0, -80, false);

// Move camera from center
camera.position.x = 1; // Move right from center of scene
camera.position.y = 1; // Move up from center of scene
camera.position.z = 15; // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

let clock = new THREE.Clock();

let render = function () {
  requestAnimationFrame(render);
  controls.update();

  car.animateCars(clock.getDelta());

  renderer.render(scene, camera);
};

render();
