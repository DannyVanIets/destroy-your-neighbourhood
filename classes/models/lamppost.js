class Lamppost {
  /**
   * @private
   */
  scene;

  /**
   * @private
   */
  headcylinder;

  /**
   * Creates an instance of Lamppost.
   * @param {*} scene
   * @param {Object} [baseoptions]
   * @param {number} [baseoptions.color]
   * @param {number} [baseoptions.radiustop]
   * @param {number} [baseoptions.radiusbottom]
   * @param {number} [baseoptions.height]
   * @param {number} [baseoptions.radialsegments]
   * @param {Object} [headoptions]
   * @param {number} [headoptions.color]
   * @param {boolean} [headoptions.transparent]
   * @param {number} [headoptions.opacity]
   * @param {number} [headoptions.radiustop]
   * @param {number} [headoptions.radiusbottom]
   * @param {number} [headoptions.height]
   * @param {number} [headoptions.radialsegments]
   * @param {Object} [topoptions]
   * @param {number} [topoptions.color]
   * @param {number} [topoptions.radiustop]
   * @param {number} [topoptions.radiusbottom]
   * @param {number} [topoptions.height]
   * @param {number} [topoptions.radialsegments]
   * @memberof Lamppost
   */
  constructor(scene, baseoptions, headoptions, topoptions) {
    this.scene = scene;

    this.baseoptions = {
      color: 0x9c9c9c,

      radiustop: 0.3,
      radiusbottom: 0.5,
      height: 10,
      radialsegments: 50,
    };

    this.headoptions = {
      color: 0x9f978d,
      transparent: true,
      opacity: 0.7,

      radiustop: 1,
      radiusbottom: 0.4,
      height: 0.6,
      radialsegments: 50,
    };

    this.topoptions = {
      color: 0x000000,

      radiustop: 0.8,
      radiusbottom: 1,
      height: 0.2,
      radialsegments: 50,
    };

    this.baseoptions = { ...this.baseoptions, ...baseoptions };
    this.headoptions = { ...this.headoptions, ...headoptions };
    this.topoptions = { ...this.topoptions, ...topoptions };
  }

  /**
   * Function to add another lamppost to the scene.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @memberof Lamppost
   */
  addLamppost(x, y, z) {
    this.createBase(x, y, z);
    this.createHead(x, y, z);
    this.createTop(x, z);
  }

  /**
   * Function to create and add the base of the lamppost to the scene.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @private
   */
  createBase = (x, y, z) => {
    const options = this.baseoptions;

    const geometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );

    const material = new Material().createWithColor(options.color);
    const cylinder = new THREE.Mesh(geometry, material);

    this.scene.add(cylinder);

    cylinder.position.set(x, y, z);
  };

  /**
   * Function to create and add the head of the lamppost to the scene.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @private
   */
  createHead = (x, y, z) => {
    const options = this.headoptions;

    const geometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );

    const material = new THREE.MeshBasicMaterial({
      color: options.color,
      transparent: options.transparent,
      opacity: options.opacity,
    });

    this.headcylinder = new THREE.Mesh(geometry, material);

    this.scene.add(this.headcylinder);

    this.headcylinder.position.x = x;

    this.headcylinder.position.y =
      y + this.baseoptions.height / 2 + options.height / 2;

    this.headcylinder.position.z = z;
  };

  /**
   * Function to create and add the top of the lamppost to the scene.
   * @param {number} x
   * @param {number} z
   * @private
   */
  createTop = (x, z) => {
    const options = this.topoptions;

    const geometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );

    const material = new Material().createWithColor(options.color);
    const cylinder = new THREE.Mesh(geometry, material);

    this.scene.add(cylinder);

    cylinder.position.x = x;

    cylinder.position.y =
      this.headcylinder.position.y +
      this.headoptions.height / 2 +
      options.height / 2;

    cylinder.position.z = z;
  };
}
