// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
    75,     // fov - Camera frustum vertical field of view
    window.innerWidth / window.innerHeight, // aspect - Camera frustum aspect ratio
    0.1,   // near - Camera frustum near plane
    5000); // far - Camera frustum far plane
// If the skybox gets added, change the far "1000" to "4000".

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Textures
var grassTexture = "./textures/grass-texture.jpg";
var doorTexture = "./textures/door-texture.png";
var roadTexture = "./textures/road-texture.jpeg";

// Floor.
var floor = new Plane().createMash(1000, 1000, 10, grassTexture);
scene.add(floor);
floor.rotation.x = Math.PI / 2;
floor.position.y = -5;

// Road.
var road = new Box().createMash(600, 1, 35, roadTexture,true);
scene.add(road);
road.position.y = -5.4;

// Glass to house.
var glass = new Box().createMash(5, 5, 1, false, false, 0xffffff, true);
scene.add(glass);
glass.position.set(-30, 0, -20.4); //x, y, z

// Door.
var door = new Box().createMash(5, 10, 1, doorTexture);
scene.add(door);
door.position.set(-20, 0, -20.4); //x, y, z

// Create a square model for a house and place it.
var house1Square = new Box().createMash(17.25, 10, 10);
scene.add(house1Square);
var positionHouse1 = -25;
house1Square.position.x = positionHouse1;
house1Square.position.z = positionHouse1;

// Create a cylinder model.
var roof = new Cylinder().createMash(8.63, 8.63, 10, 5, 1, false, Math.PI * 1, Math.PI * 1);

// Rotate the cylinder, so that it can be placed above a house.
roof.rotation.x = Math.PI / 2;
roof.rotation.y = Math.PI / 0.6666;

// Place the roof above house1.
scene.add(roof);
roof.position.x = positionHouse1;
roof.position.y = 10 / 2;
roof.position.z = positionHouse1;

// Move camera from center
camera.position.x = 1;  // Move right from center of scene
camera.position.y = 1;  // Move up from center of scene
camera.position.z = 15;  // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
controls = new THREE.OrbitControls(camera);

var render = function() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

render();