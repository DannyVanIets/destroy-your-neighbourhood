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
   * @param {Object} [animateOptions=undefined] Options to set animations.
   * @param {Object} [animateOptions.car] Options to set the car animations.
   * @param {number} [animateOptions.car.posX] Option to set the car's position x animation.
   * @param {number} [animateOptions.car.posY] Option to set the car's position y animation.
   * @param {number} [animateOptions.car.posZ] Option to set the car's position z animation.
   * @param {number} [animateOptions.car.rotX] Option to set the car's rotation x animation.
   * @param {number} [animateOptions.car.rotY] Option to set the car's rotation y animation.
   * @param {number} [animateOptions.car.rotZ] Option to set the car's rotation z animation.
   * @param {Object} [animateOptions.tires] Options to set the tires animations.
   * @param {number} [animateOptions.tires.rotX] Option to set the tires rotation x animation.
   * @param {number} [animateOptions.tires.rotY] Option to set the tires rotation y animation.
   * @param {number} [animateOptions.tires.rotZ] Option to set the tires rotation z animation.
   * @param {animationCallback} [animateOptions.callback] Callback for the animation meant to change directions or change position when the car reached a certain destination.
   */
  addCar(
    posX,
    posY,
    posZ,
    rotX = 0,
    rotY = 0,
    rotZ = 0,
    animateOptions = undefined,
    easterEgg = false
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

        if (easterEgg) {
          // create an AudioListener and add it to the camera
          const listener = new THREE.AudioListener();
          camera.add(listener);

          // create the PositionalAudio object (passing in the listener)
          const sound = new THREE.PositionalAudio(listener);

          // load a sound and set it as the PositionalAudio object's buffer
          const audioLoader = new THREE.AudioLoader();
          audioLoader.load(
            "./assets/audio/Just-One-More-Night.mp3",
            function (buffer) {
              sound.setBuffer(buffer);
              sound.setRefDistance(10);
              sound.play();
            }
          );

          car.add(sound);
        }
      }
    });
  }

  /**
   * Function to animate the cars.
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
