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

// Add a floor and a road.
new Floors(grassTexture, roadTexture).addFloors(scene);

// Create houses.
new Houses("not working", doorTexture, "right now").addHouses(scene);

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
camera.position.x = 1;  // Move right from center of scene
camera.position.y = 1;  // Move up from center of scene
camera.position.z = 15;  // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
let controls = new THREE.OrbitControls(camera);

var render = function() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

render();