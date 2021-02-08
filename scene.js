// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
  75, // fov - Camera frustum vertical field of view
  window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
  0.1, // near - Camera frustum near plane
  5000
); // far - Camera frustum far plane
// If the skybox gets added, change the far "1000" to "4000".

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a house model.
const basegeometry = new THREE.CylinderGeometry(0.3, 0.5, 10, 50);
const basematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const basecylinder = new THREE.Mesh(basegeometry, basematerial);
scene.add(basecylinder);

const headgeometry = new THREE.CylinderGeometry(1, 0.4, 0.6, 50);
const headmaterial = new THREE.MeshBasicMaterial({ color: 0xff230a });
const headcylinder = new THREE.Mesh(headgeometry, headmaterial);
scene.add(headcylinder);

headcylinder.position.y = 5;

const topgeometry = new THREE.CylinderGeometry(0.8, 1, 0.2, 50);
const topmaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const topcylinder = new THREE.Mesh(topgeometry, topmaterial);
scene.add(topcylinder);

topcylinder.position.y = 5.4;

console.log(headcylinder.geometry.parameters);

// Move camera from center
camera.position.x = 2; // Move right from center of scene
camera.position.y = 1; // Move up from center of scene
camera.position.z = 5; // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
controls = new THREE.OrbitControls(camera);

var render = function () {
  requestAnimationFrame(render);

  controls.update();

  renderer.render(scene, camera);
};

render();
