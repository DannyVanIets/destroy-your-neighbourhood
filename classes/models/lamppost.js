class Lamppost {
  /**
   * The scene the lamppost will be added to.
   * @private
   */
  scene;

  /**
   * The headcylinder of the lamppost this will be used to calculate the location of the topmost part of the lamppost.
   * @private
   */
  headcylinder;

  /**
   * Creates an instance of Lamppost.
   * @param {*} scene The scene the lamppost will be added to.
   * @param {Object} [baseoptions] Options to change how the lamppost base looks.
   * @param {number} [baseoptions.color] Option to change the lamppost base color.
   * @param {number} [baseoptions.radiustop] Option to change the lamppost base top radius.
   * @param {number} [baseoptions.radiusbottom] Option to change the lamppost base bottom radius.
   * @param {number} [baseoptions.height] Option to change the lamppost base height.
   * @param {number} [baseoptions.radialsegments] Option to change the lamppost base amount of radialsegments.
   * @param {Object} [headoptions] Options to change how the lamppost head looks.
   * @param {number} [headoptions.color] Option to change the lamppost head color.
   * @param {boolean} [headoptions.transparent] Option to change the lamppost head transparantie.
   * @param {number} [headoptions.opacity] Option to change the lamppost head opacity. NOTE: headoptions.transparent needs to be true
   * @param {number} [headoptions.radiustop] Option to change the lamppost head top radius.
   * @param {number} [headoptions.radiusbottom] Option to change the lamppost head bottom radius.
   * @param {number} [headoptions.height] Option to change the lamppost head height.
   * @param {number} [headoptions.radialsegments] Option to change the lamppost head amount of radialsegments
   * @param {Object} [topoptions] Options to change how the lamppost top looks.
   * @param {number} [topoptions.color] Option to change the lamppost top color.
   * @param {number} [topoptions.radiustop] Option to change the lamppost top top radius.
   * @param {number} [topoptions.radiusbottom] Option to change the lamppost top bottom radius.
   * @param {number} [topoptions.height] Option to change the lamppost top height.
   * @param {number} [topoptions.radialsegments] Option to change the lamppost top amount of radialsegments
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
   * @param {number} x The x location of the lamppost.
   * @param {number} y The y location of the lamppost.
   * @param {number} z The z location of the lamppost.
   * @memberof Lamppost
   */
  addLamppost(x, y, z) {
    this.createBase(x, y, z);
    this.createHead(x, y, z);
    this.createTop(x, z);
  }

  /**
   * Function to create and add the base of the lamppost to the scene.
   * @param {number} x The x location of the lamppost base.
   * @param {number} y The y location of the lamppost base.
   * @param {number} z The z location of the lamppost base.
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

    cylinder.castShadow = true;

    this.scene.add(cylinder);

    cylinder.position.set(x, y, z);
  };

  /**
   * Function to create and add the head of the lamppost to the scene.
   * @param {number} x The x location of the lamppost head.
   * @param {number} y The y location of the lamppost head.
   * @param {number} z The z location of the lamppost head.
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

    this.headcylinder.castShadow = true;

    this.scene.add(this.headcylinder);

    this.headcylinder.position.x = x;

    this.headcylinder.position.y =
      y + this.baseoptions.height / 2 + options.height / 2;

    this.headcylinder.position.z = z;
  };

  /**
   * Function to create and add the top of the lamppost to the scene.
   * @param {number} x The x location of the lamppost top.
   * @param {number} z The z location of the lamppost top.
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

    cylinder.castShadow = true;

    this.scene.add(cylinder);

    cylinder.position.x = x;

    cylinder.position.y =
      this.headcylinder.position.y +
      this.headoptions.height / 2 +
      options.height / 2;

    cylinder.position.z = z;
  };
}
