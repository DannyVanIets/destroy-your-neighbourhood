class Floors {
    constructor(grassTexture, roadTexture) {
        // Array used to add floors to the scene.

        this.floors = [
            { width: 1000, height: 0.5, depth: 1000, texture: grassTexture,
                wrapping: [
                    { x: 15, y: 15 }
                ],
                positionX: 0, positionY: -5.4, positionZ: 0 },
            { width: 600, height: 1, depth: 35, texture: roadTexture, wrapping: [
                    { x: 20, y: 1 }
                ],
                positionX: 0, positionY: -5.4, positionZ: -0 }
        ]
    }

    addFloors(scene){
        // Add all the floors in the array this.floors and add them to the scene automatically.

        for(let i = 0; i < this.floors.length; i++){
            let f = this.floors[i];

            let floor = new Box().createMesh(f.width, f.height, f.depth, f.texture, f.wrapping, f.color);
            scene.add(floor);
            floor.position.set(f.positionX, f.positionY, f.positionZ); // x, y, z.
        }
    }
}