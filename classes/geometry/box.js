class Box {
    constructor() {

    }

    createGeometry(width, height, depth){
        return new THREE.BoxGeometry(width, height, depth); // width, height and depth.
    }

    createMesh(width, height, depth, url = false, wrapping = false, color, transparent = false){
        var geometry = this.createGeometry(width, height, depth);
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