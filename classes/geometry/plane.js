class Plane {
  constructor() {}
  createMesh(
    width,
    height,
    depth,
    textureUrl,
    wrapping = false,
    color,
    transparent = false
  ) {
    let geometry = new THREE.PlaneGeometry(width, height, depth); // width, height and depth.
    let material;

    if (color) {
      material = new Material().createWithColor(color, transparent);
    } else if (url) {
      material = new Material().createWithTexture(
        textureUrl,
        wrapping,
        transparent
      );
    } else {
      material = new Material().create();
    }

    return new THREE.Mesh(geometry, material);
  }
}
