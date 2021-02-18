class Car {

  /**
   * The scene the car will be added to.
   */
  scene;

  /**
   * The loader with wich the model of the car will be loaded.
   */
  loader;

  /**
   * The model that will be used for the car.
   * @type {string}
   */
  carModel = "./assets/models/scene.gltf";

  /**
   * The offset that is needed to put the car on the ground.
   * @type {number}
   */
  posYOffset = -3.5;

  /**
   * The offset that is needed to put the car with the wheels on the ground instead of its nose.
   * @type {number}
   */
  rotXOffset = -1.59;

  /**
   * Creates an instance of Car.
   * @param {*} scene The scene the car will be added to.
   * @param {*} GLTFLoader The loader with wich the model of the car will be loaded.
   */
  constructor(scene, GLTFLoader) {
    this.scene = scene;
    this.loader = GLTFLoader;
  }

  /**
   * Function to add a car to the scene.
   * @param {number} posX The X position of the car.
   * @param {number} posY The Y position of the car.
   * @param {number} posZ The Z position of the car.
   * @param {number} [rotX=0] The X rotation of the car.
   * @param {number} [rotY=0] The Y rotation of the car.
   * @param {number} [rotZ=0] The Z rotation of the car.
   */
  addCar(posX, posY, posZ, rotX = 0, rotY = 0, rotZ = 0) {
    loader.load(this.carModel, (gltf) => {
      let car = gltf.scene.children[0];

      car.castShadow = true;
      car.receiveShadow = true;

      scene.add(car);

      car.position.x = posX;
      car.position.y = posY + this.posYOffset;
      car.position.z = posZ;

      car.rotation.x = rotX + this.rotXOffset;
      car.rotation.y = rotY;
      car.rotation.z = rotZ;
    });
  }
}
