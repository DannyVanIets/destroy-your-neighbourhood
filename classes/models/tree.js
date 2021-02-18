class Tree {
  #scene;

  /**
   * Creates an instance of Tree.
   * @param {*} scene
   * @param {Object} [trunkoptions]
   * @param {number} [trunkoptions.color]
   * @param {number} [trunkoptions.radiustop]
   * @param {number} [trunkoptions.radiusbottom]
   * @param {number} [trunkoptions.height]
   * @param {number} [trunkoptions.radialsegments]
   * @param {Object} [topoptions]
   * @param {number} [topoptions.color]
   * @param {number} [topoptions.radius]
   * @param {number} [topoptions.height]
   * @param {number} [topoptions.radialsegments]
   * @param {number} [topoptions.radiusoffset]
   * @param {number} [topoptions.yoffset]
   * @param {number} [topoptions.amount]
   */
  constructor(scene, trunkoptions, topoptions) {
    this.#scene = scene;

    this.trunkoptions = {
      color: 0x2c3125,

      radiustop: 0.3,
      radiusbottom: 1,
      height: 10,
      radialsegments: 50,
    };

    this.topoptions = {
      color: 0x788a36,

      radius: 3.5,
      width: 10,
      height: 10,
      radialsegments: 10,

      radiusoffset: -0.6,
      yoffset: 1.5,
      amount: 3,
    };

    this.trunkoptions = { ...this.trunkoptions, ...trunkoptions };
    this.topoptions = { ...this.topoptions, ...topoptions };
  }

  /**
   * Function to create and add an tree to the scene
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} isCone
   */
  addTree(x, y, z, isCone = true) {
    this.#createTrunk(x, y, z);

    for (let i = 0; i < this.topoptions.amount; i++) {
      this.#createTop(
        x,
        y + this.topoptions.yoffset * i,
        z,
        this.topoptions.radius + this.topoptions.radiusoffset * i,
        this.topoptions.height - this.topoptions.yoffset * i,
          isCone,
      );
    }
  }

  /**
   * Function to create the trunk of the tree and add it to the scene.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  #createTrunk = (x, y, z) => {
    const options = this.trunkoptions;

    const geometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );
    const material = new THREE.MeshBasicMaterial({
      color: options.color,
    });
    const cylinder = new THREE.Mesh(geometry, material);

    this.#scene.add(cylinder);

    cylinder.position.set(x, y, z);
  };

  /**
   * Function to create the top of the tree and add it to the scene.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} height
   * @param {boolean} isCone, decided if it uses a cone geometry or a sphere one.
   */
  #createTop = (x, y, z, radius, height, isCone) => {
    const options = this.topoptions;

    if(isCone){
      var geometry = new THREE.ConeGeometry(
          radius,
          height,
          options.radialsegments
      );
    } else {
      var geometry = new THREE.SphereGeometry(
          radius,
          options.width,
          height
      );
    }

    const material = new THREE.MeshBasicMaterial({
      color: options.color,
    });

    const cone = new THREE.Mesh(geometry, material);

    this.#scene.add(cone);

    cone.position.x = x;
    cone.position.y =
      y + this.trunkoptions.height / 2 - this.topoptions.height / 6;
    cone.position.z = z;
  };
}