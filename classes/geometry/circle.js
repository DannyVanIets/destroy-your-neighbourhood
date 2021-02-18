class Circle {
    constructor() {

    }

    createMesh(radius, segments, textureUrl = false, wrapping = false, color, transparent = false){
        var geometry = new THREE.CircleGeometry(radius, segments); // width, height and depth.
        if(color){
            var material = new Material().createWithColor(color, transparent);
        } else if(textureUrl) {
            var material = new Material().createWithTexture(textureUrl, wrapping, transparent);
        } else {
            var material = new Material().create();
        }
        return new THREE.Mesh(geometry, material);
    }
}