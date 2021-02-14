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

// Create a house model.
const houseWidth = 2;
const houseHeight = 2;
const houseDepth = 2;
let geometry = new THREE.BoxGeometry(houseWidth, houseHeight, houseDepth);
let material = new THREE.MeshNormalMaterial();
let house1 = new THREE.Mesh(geometry, material);
scene.add(house1);

//Skybox
let directions = [
  "right.bmp",
  "left.bmp",
  "top.bmp",
  "bottom.bmp",
  "front.bmp",
  "back.bmp",
];

let materialArray = [];
for (let i = 0; i < 6; i++) {
  materialArray.push(
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(`./assets/skybox/${directions[i]}`),
      side: THREE.BackSide,
    })
  );
}

let skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
let skyBox = new THREE.Mesh(skyGeometry, materialArray);
scene.add(skyBox);

// Move camera from center
camera.position.x = 2; // Move right from center of scene
camera.position.y = 1; // Move up from center of scene
camera.position.z = 5; // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
let controls = new THREE.OrbitControls(camera);

let render = function () {
  requestAnimationFrame(render);

  controls.update();

  renderer.render(scene, camera);
};

render();