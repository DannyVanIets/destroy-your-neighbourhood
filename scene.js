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

//Controls variables.
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// Skybox
new Skybox().addSkybox(scene);

// Add lights
let lights = new Light(scene);

lights.addLights();

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
      if (carobject.car.position.x <= -floor.floors[1].width / 2) {
        carobject.car.position.x = floor.floors[1].width / 2;
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

// Deltaclock for animation.
let clock = new THREE.Clock();

// Move camera from center
camera.position.x = 1; // Move right from center of scene
camera.position.y = 1; // Move up from center of scene
camera.position.z = 15; // Move camera away from center of scene

// Import camera control and rotation library
// Also update index.html for loading the orbit controls
//let controls = new THREE.OrbitControls(camera, renderer.domElement);
let controls = new THREE.PointerLockControls( camera, renderer.domElement );

document.addEventListener( 'click', function () {
  controls.lock();
} );

scene.add( controls.getObject() );

const onKeyDown = function ( event ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;
  }

};

const onKeyUp = function ( event ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;

  }
};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

let render = function () {
  requestAnimationFrame(render);
  //controls.update();
  car.animateCars(clock.getDelta());

  // For the movement.
  const time = performance.now();

  if ( controls.isLocked === true ) {
    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 200.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 200.0 * delta;

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    controls.getObject().position.y += ( velocity.y * delta ); // new behavior

    if ( controls.getObject().position.y < 10 ) {

      velocity.y = 0;
      controls.getObject().position.y = 1;
    }
  }

  prevTime = time;
  renderer.render(scene, camera);
};

render();
