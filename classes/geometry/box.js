class Box {
    constructor() {

    }

    createMesh(width, height, depth, url = false, wrapping = false, color, transparent = false){
        var geometry = new THREE.BoxGeometry(width, height, depth); // width, height and depth.
        if(color){
            var material = new Material().createWithColor(color, transparent);
        } else if(url) {
            var material = new Material().createWithTexture(url, wrapping, transparent);
        } else {
            var material = new Material().create();
        }
        return new THREE.Mesh(geometry, material);
    }

    createMeshWithTextureArray(width, height, depth, textures){
        var geometry = new THREE.BoxGeometry(width, height, depth); // width, height and depth.
        var materials = new Material().createWithTextures(textures);
        return new THREE.Mesh(geometry, materials);
    }
}