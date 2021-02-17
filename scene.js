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
new Houses("not working", doorTexture, "right now").addHouses(scene);

// Create lampposts
let lamppost = new Lamppost(scene);
lamppost.addLamppost(0, 0, -20);

// Create trees
let tree = new Tree(scene);

tree.addTree(10, 0, -20);

// Add car
let car = new Car(scene, loader);
car.addCar(-50, 0, 8, 0, 0, -4.7);
car.addCar(10, 0, -8, 0, 0, 4.7);

// Move camera from center
camera.position.x = 1; // Move right from center of scene
camera.position.y = 1; // Move up from center of scene
camera.position.z = 15; // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

render();
