// Create scene
let scene = new THREE.Scene();

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

// Add a floor and a road.
let floor = new Floors(grassTexture, roadTexture);
floor.addFloors(scene);

// Create houses.
new Houses(houseTexture, houseTextures, doorTexture, roofTextures, windowTexture).addHouses(scene);

// Create lampposts
let lamppost = new Lamppost(scene);
lamppost.addLamppost(0, 0, -20);

// Create trees
let tree = new Tree(scene);

tree.addTree(10, 0, -20);

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
