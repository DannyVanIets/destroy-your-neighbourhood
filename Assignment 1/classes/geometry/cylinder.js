class Cylinder {
  constructor() {}

  createMesh(
    width,
    height,
    depth,
    radialSegments = false,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength,
    textures,
    wrapping = false,
    color,
    transparent = false
  ) {
    // Create a geometry for cylinders, with a color or a texture or neither,
    // and then mesh it together so it can be added to a scene.

    let geometry;
    let material;

    // Check if the cylinder should be open or not, depending if the radialSegments are added.
    if (!radialSegments) {
      geometry = new THREE.CylinderGeometry(width, height, depth); // width, height and depth.
    } else {
      geometry = new THREE.CylinderGeometry(
        width,
        height,
        depth,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength
      );
    }

    if (color) {
      material = new Material().createWithColor(color, transparent);
    } else if (textures) {
      material = new Material().createWithTextures(
        textures,
        wrapping,
        transparent
      );
    } else {
      material = new Material().create();
    }

    return new THREE.Mesh(geometry, material);
  }
}
