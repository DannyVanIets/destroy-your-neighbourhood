class Plane {
    constructor() {

    }

    createGeometry(height, width, depth){
        return new THREE.PlaneGeometry(height, width, depth); // width, height and depth.
    }

    createMash(height, width, depth, url, wrapping = false, color, transparency = false) {
        var geometry = this.createGeometry(height, width, depth);
        if (color) {
            var material = new Material().createWithColor(color, transparency);
        } else if (url) {
            var material = new Material().createWithTexture(url, wrapping, transparency);
        } else {
            var material = new Material().create();
        }
        return new THREE.Mesh(geometry, material);
    }
}