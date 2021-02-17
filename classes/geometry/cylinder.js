class Cylinder {
    constructor() {

    }

    createMesh(width, height, depth, radialSegments = false, heightSegments, openEnded, thetaStart, thetaLength, textures, wrapping = false, color, transparent = false){
        if(!radialSegments){
            var geometry = new THREE.CylinderGeometry(width, height, depth); // width, height and depth.
        } else {
            var geometry = new THREE.CylinderGeometry(width, height, depth, radialSegments, heightSegments, openEnded, thetaStart, thetaLength);
        }
        if(color){
            var material = new Material().createWithColor(color, transparent);
        } else if(textures) {
            var material = new Material().createWithTextures(textures, wrapping, transparent);
        } else {
            var material = new Material().create();
        }
        return new THREE.Mesh(geometry, material);
    }
}