class Light {
  /**
   * The scene the lights will be added to.
   */
  scene;

  /**
   * Creates an instance of Light.
   * @param {*} scene The scene the lights will be added to.
   */
  constructor(scene) {
    this.scene = scene;
  }

  /**
   * Add a hemisphere and a directional light to the scene. 
   */
  addLights() {
    this.addHemisphereLight();
    this.addDirectionalLight();
  }

  /**
   * Add a hemisphere light to the scene.
   * @private
   */
  addHemisphereLight() {
    const hemilight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);

    hemilight.color.setHSL(0.6, 1, 0.6);
    hemilight.groundColor.setHSL(0.095, 1, 0.75);
    hemilight.position.set(-150, 150, 0);

    this.scene.add(hemilight);

    // Enable this code to show the placement of the hemilight.
    //const helper = new THREE.HemisphereLightHelper(hemilight, 5);
    //this.scene.add(helper);
  }

  /**
   * Add a directional light to the scene.
   * @private
   */
  addDirectionalLight() {
    const dirlight = new THREE.DirectionalLight(0xffffff, 1);

    dirlight.color.setHSL(0.1, 1, 0.95);
    //dirlight.position.set(-1, 1.75, 1);
    dirlight.position.set(-10, 10, -10);
    dirlight.position.multiplyScalar(30);

    this.scene.add(dirlight);

    dirlight.castShadow = true;

    dirlight.shadow.mapSize.width = 2048;
    dirlight.shadow.mapSize.height = 2048;

    const direction = 500;

    dirlight.shadow.camera.left = -direction;
    dirlight.shadow.camera.right = direction;
    dirlight.shadow.camera.top = direction;
    dirlight.shadow.camera.bottom = -direction;

    dirlight.shadow.camera.far = 5000;
    dirlight.shadow.bias = -0.0001;

    // Enable this code to show the direction of the dirlight.
    //const helper = new THREE.DirectionalLightHelper(dirlight, 5);
    //this.scene.add(helper)
  }
}
