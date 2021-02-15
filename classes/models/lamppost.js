class Lamppost {
  constructor(
    scene,
    basecolor = 0x9c9c9c,
    baseradiustop = 0.3,
    baseradiusbottom = 0.5,
    baseheight = 10,
    baseradialsegments = 50
  ) {
    this.scene = scene;
    this.basecolor = basecolor;
    this.baseradiustop = baseradiustop;
    this.baseradiusbottom = baseradiusbottom;
    this.baseheight = baseheight;
    this.baseradialsegments = baseradialsegments;
  }

  addLamppost(x = 0, y = 0, z = 0) {
    const basegeometry = new THREE.CylinderGeometry(
      this.baseradiustop,
      this.baseradiusbottom,
      this.baseheight,
      this.baseradialsegments
    );

    const basematerial = new Material().createWithColor(this.basecolor);
    const basecylinder = new THREE.Mesh(basegeometry, basematerial);

    this.scene.add(basecylinder);

    basecylinder.position.x = x;
    basecylinder.position.y = y;
    basecylinder.position.z = z;

    //Create HeadGeometry
    const headgeometry = new THREE.CylinderGeometry(1, 0.4, 0.6, 50);
    const headmaterial = new THREE.MeshBasicMaterial({
      color: 0x9f978d,
      transparent: true,
      opacity: 0.7,
    });

    const headcylinder = new THREE.Mesh(headgeometry, headmaterial);
    this.scene.add(headcylinder);

    headcylinder.position.y = 5;

    const topgeometry = new THREE.CylinderGeometry(0.8, 1, 0.2, 50);
    const topmaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const topcylinder = new THREE.Mesh(topgeometry, topmaterial);
    this.scene.add(topcylinder);

    topcylinder.position.y = 5.4;
  }
}
