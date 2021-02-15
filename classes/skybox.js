class Skybox {
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
