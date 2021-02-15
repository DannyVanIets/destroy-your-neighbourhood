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
   * @memberof Tree
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
      height: 10,
      radialsegments: 10,

      radiusoffset: -0.6,
      yoffset: 1.5,
      amount: 3,
    };

    this.trunkoptions = { ...this.trunkoptions, trunkoptions };
    this.topoptions = { ...this.topoptions, topoptions };
  }

  /**
   * Function to create and add an tree to the scene
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @memberof Tree
   */
  addTree(x, y, z) {
    this.#createTrunk(x, y, z);

    for (let i = 0; i < this.topoptions.amount; i++) {
      this.#createTop(
        x,
        y + this.topoptions.yoffset * i,
        z,
        this.topoptions.radius + this.topoptions.radiusoffset * i,
        this.topoptions.height - this.topoptions.yoffset * i
      );
    }
  }

  /**
   * Function to create the trunk of the tree and add it to the scene.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @memberof Tree
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
   * @memberof Tree
   */
  #createTop = (x, y, z, radius, height) => {
    const options = this.topoptions;

    const geometry = new THREE.ConeGeometry(
      radius,
      height,
      options.radialsegments
    );

    const material = new THREE.MeshBasicMaterial({
      color: options.color,
    });

    const cone = new THREE.Mesh(geometry, material);

    this.#scene.add(cone);

    cone.position.x = x;
    cone.position.y = y + this.topoptions.height / 4;
    cone.position.z = z;
  };
}
