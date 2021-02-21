class Box {
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
    // Create a geometry for boxes, with a color or a texture or neither,
    // and then mesh it together so it can be added to a scene.

    let geometry = new THREE.BoxGeometry(width, height, depth); // width, height and depth.
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

  createMeshWithTextureArray(width, height, depth, textures) {
    // Create boxgeometry with a unique texture applied to every side.

    let geometry = new THREE.BoxGeometry(width, height, depth); // width, height and depth.
    let materials = new Material().createWithTextures(textures);
    return new THREE.Mesh(geometry, materials);
  }
}
