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

// Create lamppost model.
const basegeometry = new THREE.CylinderGeometry(0.3, 0.5, 10, 50);
const basematerial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c });
const basecylinder = new THREE.Mesh(basegeometry, basematerial);
scene.add(basecylinder);

const headgeometry = new THREE.CylinderGeometry(1, 0.4, 0.6, 50);
const headmaterial = new THREE.MeshBasicMaterial({
  color: 0x9f978d,
  transparent: true,
  opacity: 0.7,
});
const headcylinder = new THREE.Mesh(headgeometry, headmaterial);
scene.add(headcylinder);

headcylinder.position.y = 5;

const topgeometry = new THREE.CylinderGeometry(0.8, 1, 0.2, 50);
const topmaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const topcylinder = new THREE.Mesh(topgeometry, topmaterial);
scene.add(topcylinder);

topcylinder.position.y = 5.4;

function GenerateTree(
  x,
  y,
  radius,
  height,
  radialsegments,
  amount,
  yoffset = 0,
  xoffset = 0,
  radiusoffset = 0,
  treetrunkcolor = 0x2c3125,
  treetopcolor = 0x788a36,
) {
  //Tree model
  const treetrunkgeometry = new THREE.CylinderGeometry(0.3, 1, 10, 50);
  const treetrunkmaterial = new THREE.MeshBasicMaterial({ color: treetrunkcolor });
  const treetrunkcylinder = new THREE.Mesh(
    treetrunkgeometry,
    treetrunkmaterial
  );
  scene.add(treetrunkcylinder);

  treetrunkcylinder.position.x = x;

  for (let i = 0; i < amount; i++) {
    const treetopgeometry = new THREE.ConeGeometry(
      radius,
      height,
      radialsegments
    );

    const treetopmaterial = new THREE.MeshBasicMaterial({ color: treetopcolor });
    const treetopcone = new THREE.Mesh(treetopgeometry, treetopmaterial);
    scene.add(treetopcone);

    treetopcone.position.x = x;
    treetopcone.position.y = y;

    x += xoffset;
    y += yoffset;
    radius += radiusoffset;

    height -= yoffset;
  }
}

GenerateTree(5, 5, 3.5, 10, 10, 4, 1.5, 0, -0.6);
GenerateTree(15, 5, 3.5, 10, 10, 4, 0.5, 0, -0.6);

// Textures
var grassTexture = "./textures/grass-texture.jpg";
var doorTexture = "./textures/door-texture.png";
var roadTexture = "./textures/road-texture.jpeg";

// Add a floor and a road.
new Floors(grassTexture, roadTexture).addFloors(scene);

// Create houses.
new Houses("not working", doorTexture, "right now").addHouses(scene);

//Skybox
new Skybox().addSkybox(scene);

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
