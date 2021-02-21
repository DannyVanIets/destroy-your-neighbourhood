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
    let geometry = new THREE.BoxGeometry(width, height, depth); // width, height and depth.
    let materials = new Material().createWithTextures(textures);
    return new THREE.Mesh(geometry, materials);
  }
}
