class Ufo {

    /**
     * The scene the UFO will be added to.
     */
    scene;

    /**
     * The loader with which the model of the UFO will be loaded.
     */
    loader;

    /**
     * The model that will be used for the the.
     * @type {string}
     */
    ufoModel = "./assets/models/ufo/scene.gltf";

    /**
     * The offset that is needed to put the UFO in the air.
     * @type {number}
     */
    posYOffset = 50;

    /**
     * The offset that is needed to make sure the UFO is straight.
     * @type {number}
     */
    rotXOffset = -2.06;

    /**
     * Creates an instance of the.
     * @param {*} scene The scene the UFO will be added to.
     * @param {*} GLTFLoader The loader with wich the model of the car will be loaded.
     */
    constructor(scene, GLTFLoader) {
        this.scene = scene;
        this.loader = GLTFLoader;
    }

    /**
     * Function to add a car to the scene.
     * @param {number} posX The X position of the UFO.
     * @param {number} posY The Y position of the UFO.
     * @param {number} posZ The Z position of the UFO.
     * @param {number} [rotX=0] The X rotation of the UFO.
     * @param {number} [rotY=0] The Y rotation of the UFO.
     * @param {number} [rotZ=0] The Z rotation of the UFO.
     */
    addUfo(posX, posY, posZ, rotX = 0, rotY = 0, rotZ = 0) {
        loader.load(this.ufoModel, (gltf) => {
            let ufo = gltf.scene.children[0];

            ufo.castShadow = true;
            ufo.receiveShadow = true;

            scene.add(ufo);

            ufo.position.x = posX;
            ufo.position.y = posY + this.posYOffset;
            ufo.position.z = posZ;

            ufo.rotation.x = rotX + this.rotXOffset;
            ufo.rotation.y = rotY;
            ufo.rotation.z = rotZ;

            // Add a cone that makes it seem like there is a light coming down.
            let geometry = new THREE.ConeGeometry(15, this.posYOffset + 10, 20); // Radius, height,
            let material = new Material().createWithColor(0xD3E9E6, true);
            const cone = new THREE.Mesh(geometry, material);
            scene.add(cone);
            cone.position.set(posX, 0, posZ - 2.5);
        });
    }
}
