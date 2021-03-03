class Tree {
  /**
   * The scene the tree will be added to.
   * @private
   */
  scene;

  /**
   * Creates an instance of Tree.
   * @param {*} scene The scene the tree will be added to.
   * @param {Object} [trunkoptions] Options to modify how the tree trunk looks.
   * @param {number} [trunkoptions.color] Option to change the tree trunk color.
   * @param {number} [trunkoptions.radiustop] Option to change the tree trunk top radius.
   * @param {number} [trunkoptions.radiusbottom] Option to change the tree trunk bottom radius.
   * @param {number} [trunkoptions.height] Option to change the tree trunk height.
   * @param {number} [trunkoptions.radialsegments] Option to change the tree trunk radial segment amount.
   * @param {Object} [topoptions] Options to modify how the top part of the tree looks.
   * @param {number} [topoptions.color] Option to change the color of the top part of the tree.
   * @param {number} [topoptions.radius] Option to change the radius of the top part of the tree.
   * @param {number} [topoptions.height] Option to change the height of the top part of the tree.
   * @param {number} [topoptions.radialsegments] Option to change the radialsegments amount of the top part of the tree.
   * @param {number} [topoptions.radiusoffset] Option to change the radius offset of the top part of the tree. This is used to place multiple parts ontop of each other.
   * @param {number} [topoptions.yoffset] Option to change the y offset of the top part of the tree. This is used to place multiple parts ontop of each other.
   * @param {number} [topoptions.amount] Option to change the amount of top parts of the tree.
   * @param {number} [topoptions.cone] Option to change the shape of the top part of the tree.
   */
  constructor(scene, trunkoptions, topoptions) {
    this.scene = scene;

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

      cone: true,
    };

    this.trunkoptions = { ...this.trunkoptions, ...trunkoptions };
    this.topoptions = { ...this.topoptions, ...topoptions };
  }

  /**
   * Function to create and add an tree to the scene
   * @param {number} x The x position of the tree.
   * @param {number} y The y position of the tree.
   * @param {number} z The z position of the tree.
   */
  addTree(x, y, z) {
    this.createTrunk(x, y, z);

    for (let i = 0; i < this.topoptions.amount; i++) {
      this.createTop(
        x,
        y + this.topoptions.yoffset * i,
        z,
        this.topoptions.radius + this.topoptions.radiusoffset * i,
        this.topoptions.height - this.topoptions.yoffset * i,
      );
    }
  }

  /**
   * Function to create the trunk of the tree and add it to the scene.
   * @param {number} x The x position of the tree trunk.
   * @param {number} y The y position of the tree trunk.
   * @param {number} z The z position of the tree trunk.
   * @private
   */
  createTrunk = (x, y, z) => {
    const options = this.trunkoptions;

    const geometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );
    const material = new Material().createWithColor(options.color);
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.castShadow = true;
    this.scene.add(cylinder);

    cylinder.position.set(x, y, z);
  };

  /**
   * Function to create the top of the tree and add it to the scene.
   * @param {number} x The x position of the tree top.
   * @param {number} y The x position of the tree top.
   * @param {number} z The x position of the tree top.
   * @param {number} radius The radius of the tree top.
   * @param {number} height The height of the tree top.
   * @private
   */
  createTop = (x, y, z, radius, height) => {
    const options = this.topoptions;
    let geometry;

    if (options.cone) {
      geometry = new THREE.ConeGeometry(
        radius,
        height,
        options.radialsegments
      );
    } else {
      geometry = new THREE.SphereGeometry(radius, options.width, height);
    }

    const material = new Material().createWithColor(options.color);

    const cone = new THREE.Mesh(geometry, material);

    cone.castShadow = true;

    this.scene.add(cone);

    cone.position.x = x;
    cone.position.y =
      y + this.trunkoptions.height / 2 - this.topoptions.height / 6;
    cone.position.z = z;
  };
}
