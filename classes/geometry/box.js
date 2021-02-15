class Box {
    constructor() {

    }

    createGeometry(height, width, depth){
        return new THREE.BoxGeometry(height, width, depth); // width, height and depth.
    }

    createMesh(height, width, depth, url = false, wrapping = false, color, transparent = false){
        var geometry = this.createGeometry(height, width, depth);
        if(color){
            var material = new Material().createWithColor(color, transparent);
        } else if(url) {
            var material = new Material().createWithTexture(url, wrapping, transparent);
        } else {
            var material = new Material().create();
        }
        return new THREE.Mesh(geometry, material);
    }
}