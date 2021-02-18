class Car {
  /**
   * The scene the car will be added to.
   */
  scene;

  /**
   * The loader with which the model of the car will be loaded.
   */
  loader;

  /**
   * The model that will be used for the car.
   * @type {string}
   */
  carModel = "./assets/models/car/scene.gltf";

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
   * List of all the cars.
   * @type {any[]}
   */
  cars = [];

  /**
   * List of cars that will be animated.
   * @type {any[]}
   * @private
   */
  carsToAnimate = [];

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
   * Callback for the animation meant to change directions or change position when the car reached a certain destination.
   * @callback animationCallback
   * @param {*} carobject
   */

  /**
   * Function to add a car to the scene.
   * @param {number} posX The X position of the car.
   * @param {number} posY The Y position of the car.
   * @param {number} posZ The Z position of the car.
   * @param {number} [rotX=0] The X rotation of the car.
   * @param {number} [rotY=0] The Y rotation of the car.
   * @param {number} [rotZ=0] The Z rotation of the car.
   * @param {Object} [animateOptions=undefined]
   * @param {Object} [animateOptions.car]
   * @param {number} [animateOptions.car.posX]
   * @param {number} [animateOptions.car.posY]
   * @param {number} [animateOptions.car.posZ]
   * @param {number} [animateOptions.car.rotX]
   * @param {number} [animateOptions.car.rotY]
   * @param {number} [animateOptions.car.rotZ]
   * @param {Object} [animateOptions.tires]
   * @param {number} [animateOptions.tires.rotX]
   * @param {number} [animateOptions.tires.rotY]
   * @param {number} [animateOptions.tires.rotZ]
   * @param {animationCallback} [animateOptions.callback]
   */
  addCar(
    posX,
    posY,
    posZ,
    rotX = 0,
    rotY = 0,
    rotZ = 0,
    animateOptions = undefined
  ) {
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

      this.cars.push(car);

      if (animateOptions) {
        let defaultcar = {
          posX: 0,
          posY: 0,
          posZ: 0,
          rotX: 0,
          rotY: 0,
          rotZ: 0,
        };

        let defaulttires = {
          rotX: 0,
          rotY: 0,
          rotZ: 0,
        };

        this.carsToAnimate.push({
          car,
          options: {
            car: { ...defaultcar, ...animateOptions.car },
            tires: { ...defaulttires, ...animateOptions.tires },
            callback: animateOptions.callback,
          },
        });
      }
    });
  }

  /**
   * Function to animate the cars
   * @param {number} delta
   */
  animateCars(delta) {
    this.carsToAnimate.map((carobject) => {
      let options = carobject.options;
      let car = carobject.car;

      car.position.x += options.car.posX * delta;
      car.position.y += options.car.posY * delta;
      car.position.z += options.car.posZ * delta;

      car.rotation.x += options.car.rotX * delta;
      car.rotation.y += options.car.rotY * delta;
      car.rotation.z += options.car.rotZ * delta;

      let tires = car.children[0].children[0].children[0].children;

      for (let i = 1; i < tires.length; i++) {
        let tire = tires[i];
        tire.rotation.x += options.tires.rotX * delta;
        tire.rotation.y += options.tires.rotY * delta;
        tire.rotation.z += options.tires.rotZ * delta;
      }

      if (options.callback) {
        options.callback(carobject);
      }
    });
  }
}
