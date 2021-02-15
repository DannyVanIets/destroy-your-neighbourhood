class Plane {
    constructor() {

    }
    createMesh(width, height, depth, url, wrapping = false, color, transparent = false) {
        var geometry = new THREE.PlaneGeometry(width, height, depth); // width, height and depth.
        if (color) {
            var material = new Material().createWithColor(color, transparent);
        } else if (url) {
            var material = new Material().createWithTexture(url, wrapping, transparent);
        } else {
            var material = new Material().create();
        }
        return new THREE.Mesh(geometry, material);
    }
}