class Cylinder {
    constructor() {

    }

    createGeometry(height, width, depth){
        return new THREE.CylinderGeometry(height, width, depth); // width, height and depth.
    }

    createGeometryTheta(height, width, depth, radicalSegments, heightSegments, openEnded, thetaStart, thetaLength){
        return new THREE.CylinderGeometry(height, width, depth, radicalSegments, heightSegments, openEnded, thetaStart, thetaLength);
    }

    createMash(height, width, depth, radicalSegments = false, heightSegments, openEnded, thetaStart, thetaLength, url, wrapping = false, color, transparent = false){
        if(!radicalSegments){
            var geometry = this.createGeometry(height, width, depth);
        } else {
            var geometry = this.createGeometryTheta(height, width, depth, radicalSegments, heightSegments, openEnded, thetaStart, thetaLength)
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