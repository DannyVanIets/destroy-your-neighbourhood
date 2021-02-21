class Sphere {
  constructor() {}

  createMesh(
    width,
    height,
    depth,
    textureUrl = false,
    wrapping = false,
    color,
    transparent = false
  ) {
    // Create a geometry for sphere, with a color or a texture or neither,
    // and then mesh it together so it can be added to a scene.
    let geometry = new THREE.SphereGeometry(width, height, depth); // width, height and depth.
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
