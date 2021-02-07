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

//Floor model.


// Create a square model.
var box1Geometry = new THREE.BoxGeometry(8.35, 10, 5); // width, height and depth.
var material = new THREE.MeshNormalMaterial();
var box1 = new THREE.Mesh(box1Geometry, material);

// Create a cylinder model, for on top of the square.
const radius =  5.0;
const height = 10.0;
const radialSegments =  4;
const heightSegments =  1;
const openEnded = false;
const thetaStart = Math.PI * 0.325;
const thetaLength = Math.PI * 1.35;
const roof1 = new THREE.CylinderGeometry(
    radius, radius, height,
    radialSegments, heightSegments,
    openEnded,
    thetaStart, thetaLength);

//Combine them both into a house.
box1.updateMatrix();
roof1.merge(box1.geometry, box1.matrix);
var house1 = new THREE.Mesh(roof1, material);
house1.rotation.x = Math.PI / 2;
scene.add(house1);
house1.position.set(20, 0, -20); //x, y, z

// Create square2 once model.
var box2Width = 17.25;
var box2Height = 10;
var box2Depth = 10;
var box2Geometry = new THREE.BoxGeometry(box2Width, box2Height, box2Depth); // width, height and depth.
var box2 = new THREE.Mesh(box2Geometry, material);

// Place the square2 somewhere.
scene.add(box2);
var positionBox2 = -25;
box2.position.x = positionBox2;
box2.position.z = positionBox2;

// Create a cilinder2 model.
const radius2 =  8.63;
const radialSegments2 =  5;
const thetaStart2 = Math.PI * 1;
const thetaLength2 = Math.PI * 1;
const Cylinder2Geometry = new THREE.CylinderGeometry(
    radius2, radius2, height,
    radialSegments2, heightSegments,
    openEnded, thetaStart2, thetaStart2);
var roof2 = new THREE.Mesh(Cylinder2Geometry, material);

// Rotate the cilinder, so that it can be placed above a box.
roof2.rotation.x = Math.PI / 2;
roof2.rotation.y = Math.PI / 0.6666;

// Place the roof2 above the previous box.
scene.add(roof2);
roof2.position.x = positionBox2;
roof2.position.y = box2Height / 2;
roof2.position.z = positionBox2;

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