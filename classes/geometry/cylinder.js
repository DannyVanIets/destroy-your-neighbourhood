class Cylinder {
    constructor() {

    }

    createGeometry(width, height, depth){
        return new THREE.CylinderGeometry(width, height, depth); // width, height and depth.
    }

    createGeometryTheta(width, height, depth, radicalSegments, heightSegments, openEnded, thetaStart, thetaLength){
        return new THREE.CylinderGeometry(width, height, depth, radicalSegments, heightSegments, openEnded, thetaStart, thetaLength);
    }

    createMesh(width, height, depth, radicalSegments = false, heightSegments, openEnded, thetaStart, thetaLength, url, wrapping = false, color, transparent = false){
        if(!radicalSegments){
            var geometry = this.createGeometry(width, height, depth);
        } else {
            var geometry = this.createGeometryTheta(width, height, depth, radicalSegments, heightSegments, openEnded, thetaStart, thetaLength)
        }
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