class Skybox {
  constructor(width = 5000, height = 5000, depth = 5000, directions = null) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    if (directions) {
      this.directions = directions;
    } else {
      this.directions = [
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
            `./assets/skybox/${this.directions[i]}`
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
