class Floors {
    constructor(grassTexture, roadTexture) {
        this.floors = [
            { height: 1000, width: 0.5, depth: 1000, texture: grassTexture, positionX: 0, positionY: -5.4, positionZ: 0 },
            { height: 600, width: 1, depth: 35, texture: roadTexture, wrapping: true, positionX: 0, positionY: -5.4, positionZ: -0 }
        ]
    }

    addFloors(scene){
        // Add all the floors in the array this.floors and add them to the scene automatically.
        for(var i = 0; i < this.floors.length; i++){

            var f = this.floors[i];

            // Add a floor.
            var floor = new Box().createMash(f.height, f.width, f.depth, f.texture, f.wrapping);
            scene.add(floor);
            floor.position.set(f.positionX, f.positionY, f.positionZ); // x, y, z.
        }
    }
}