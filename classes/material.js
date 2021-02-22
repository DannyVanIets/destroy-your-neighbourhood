// todo: Change MeshBasicMaterial to MeshPhongMaterial for the lightning: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html.
// todo: Make sure to read about material.needsUpdate once you are gonna work on that!

class Material {
  constructor() {}

  create() {
    // Creates a mesh without anything added. Only used for testing!
    // Every geometry does need to get at least a color and a texture!

    return new THREE.MeshNormalMaterial({});
  }

  createWithColor(color, transparent) {
    // Create a mesh for the material with a color.

    let material;
    if (transparent) {
      material = new THREE.MeshPhongMaterial({
        color: color,
        refractionRatio: 0.5,
        side: THREE.DoubleSide,
      }); // THREE.DoubleSide is used to show the texture on all sides.

      material.transparent = true;
      material.opacity = 0.5;
    } else {
      material = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide,
      });
    }
    return material;
  }

  createWithTexture(textureUrl, wrapping, transparent) {
    // Create a mesh for the material with a texture,
    // and potentionally wrapping added to it.
    // The wrapping is used if the texture stretches.
    // side: THREE.DoubleSide is used to make the texture appear on both sides.

    let texture = new THREE.TextureLoader().load(textureUrl);
    if (wrapping) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(wrapping[0].x, wrapping[0].y); // 20, 1
    }

    let material;

    if (transparent) {
      material = new THREE.MeshPhongMaterial({
        map: texture,
        refractionRatio: 0.5,
        side: THREE.DoubleSide,
      });
      material.transparent = true;
      material.opacity = 0.5;
    } else {
      material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
    }

    return material;
  }

  createWithTextures(texturesArray, wrapping) {
    // Same as the function "createWithTexture", only it uses an array of textures.
    // This is used, for example, to create a different texture for every side of a cube.

    let materials = [];

    for (let i = 0; i < texturesArray.length; i++) {
      // Loop through every texture, load it and push it to the material array.
      let texture = new THREE.TextureLoader().load(texturesArray[i]);

      if (wrapping && i != 0) {
        // The first texture we load is for the roof which does not need the texture wrapping.
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(wrapping[0].x, wrapping[0].y);
      }
      materials.push(new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide
      }));
    }

    return materials;
  }
}