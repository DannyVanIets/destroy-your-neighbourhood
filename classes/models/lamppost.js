class Lamppost {
  constructor(
    scene,
    baseoptions = undefined,
    headoptions = undefined,
    topoptions = undefined
  ) {
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

  //TODO: Hier nog naar kijken of Puja een browser heeft die dit ondersteund https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#browser_compatibility
  #headcylinder;

  addLamppost(x = 0, y = 0, z = 0) {
    this.#createBase(x, y, z);
    this.#createHead(x, y, z);
    this.#createTop(x, y, z);
  }

  //TODO: Hier nog naar kijken of Puja een browser heeft die dit ondersteund https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#browser_compatibility
  #createBase = (x, y, z) => {
    const options = this.baseoptions;

    const basegeometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );

    const basematerial = new Material().createWithColor(options.color);
    const basecylinder = new THREE.Mesh(basegeometry, basematerial);

    this.scene.add(basecylinder);

    basecylinder.position.x = x;
    basecylinder.position.y = y;
    basecylinder.position.z = z;
  };

  //TODO: Hier nog naar kijken of Puja een browser heeft die dit ondersteund https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#browser_compatibility
  #createHead = (x, y, z) => {
    const options = this.headoptions;

    const headgeometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );

    const headmaterial = new THREE.MeshBasicMaterial({
      color: options.color,
      transparent: true,
      opacity: 0.7,
    });

    this.#headcylinder = new THREE.Mesh(headgeometry, headmaterial);

    this.scene.add(this.#headcylinder);

    this.#headcylinder.position.y =
      y + this.baseoptions.height / 2 + options.height / 2;

    this.#headcylinder.position.x = x;
    this.#headcylinder.position.z = z;
  };

  //TODO: Hier nog naar kijken of Puja een browser heeft die dit ondersteund https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields#browser_compatibility
  #createTop = (x, y, z) => {
    const options = this.topoptions;

    const topgeometry = new THREE.CylinderGeometry(
      options.radiustop,
      options.radiusbottom,
      options.height,
      options.radialsegments
    );

    const topmaterial = new THREE.MeshBasicMaterial({ color: options.color });
    const topcylinder = new THREE.Mesh(topgeometry, topmaterial);

    this.scene.add(topcylinder);

    topcylinder.position.y =
      this.#headcylinder.position.y +
      this.headoptions.height / 2 +
      options.height / 2;

    topcylinder.position.x = x;
    topcylinder.position.z = z;
  };
}
