class Circle {
  constructor() {}

  createMesh(
    radius,
    segments,
    textureUrl = false,
    wrapping = false,
    color,
    transparent = false
  ) {
    let geometry = new THREE.CircleGeometry(radius, segments); // width, height and depth.
    let material;

    if (color) {
      material = new Material().createWithColor(color, transparent);
    } else if (textureUrl) {
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
