class Skybox {
  /**
   * Creates an instance of Skybox.
   * @param {number} [width=5000] The width of the skybox.
   * @param {number} [height=5000] The height of the skybox.
   * @param {number} [depth=5000] The depth of the skybox.
   * @param {string} [skyboxdirectory="./assets/skybox/"] The directory of the skybox images.
   * @param {string[]} [skyboximages=null] An array containing the names of the skybox images. In the order of RIGHT, LEFT, TOP, BOTTOM, FRONT, BACK.
   */
  constructor(
    width = 5000,
    height = 5000,
    depth = 5000,
    skyboxdirectory = "./assets/skybox/",
    skyboximages = null
  ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.skyboxdirectory = skyboxdirectory;

    if (skyboximages) {
      this.skyboximages = skyboximages;
    } else {
      this.skyboximages = [
        "right.bmp",
        "left.bmp",
        "top.bmp",
        "bottom.bmp",
        "front.bmp",
        "back.bmp",
      ];
    }
  }

  /**
   * Function to add the skybox to a scene.
   * @param {*} scene The scene the skybox will be added to.
   */
  addSkybox(scene) {
    let materialArray = [];

    for (let i = 0; i < 6; i++) {
      materialArray.push(
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(
            `${this.skyboxdirectory}${this.skyboximages[i]}`
          ),
          side: THREE.BackSide,
        })
      );
    }

    let skyGeometry = new THREE.BoxGeometry(
      this.width,
      this.height,
      this.depth
    );

    let skyBox = new THREE.Mesh(skyGeometry, materialArray);
    scene.add(skyBox);
  }
}
