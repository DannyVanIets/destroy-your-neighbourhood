// todo: Change MeshBasicMaterial to MeshPhongMaterial for the lightning: https://threejsfundamentals.org/threejs/lessons/threejs-materials.html.
// todo: Make sure to read about material.needsUpdate once you are gonna work on that!

class Material {
    constructor() {

    }

    create(){
        // Only used for testing.
        // Every geometry does need to get at least a color!
        return new THREE.MeshNormalMaterial({});
    }

    createWithColor(color, transparent) {
        if(transparent){
            var material = new THREE.MeshBasicMaterial({color: color, refractionRatio: 0.5, side: THREE.DoubleSide}); // THREE.DoubleSide is used to show the texture on all sides.
            material.transparent = true;
            material.opacity = 0.5;
        } else {
            var material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        }
        return material;
    }

    createWithTexture(url, wrapping, transparent) {
        var texture = new THREE.TextureLoader().load(url);
        if (wrapping) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(20, 1);
        }
        if(transparent){
            var material = new THREE.MeshBasicMaterial({map: texture, refractionRatio: 0.5, side: THREE.DoubleSide});
            material.transparent = true;
            material.opacity = 0.5;
        } else {
            var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
        }
        return material;
    }
}