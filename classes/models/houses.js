// Useful: https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/.

class Houses {
    constructor(houseTexture, doorTexture, roofTexture) {
        this.houses = [
            { height: 17.25, width: 10, depth: 10, texture: null, positionX: -25, positionY: 0, positionZ: -25,
                window: { height: 5, width: 5, depth: 1, texture: false, wrapping: false, color: 0xffffff, transparent: true, positionX: -30, positionY: 0, positionZ: -20.4},
                door: { height: 5, width: 10, depth: 1, texture: doorTexture, wrapping: false, color: false, transparent: false, positionX: -20, positionY: 0, positionZ: -20.4},
                roof: { height: 8.63, width: 8.63, depth: 10, radicalSegments: 5, heightSegments: 1, openEnded: false, thetaStart: Math.PI * 1, thetaLength: Math.PI * 1, texture: null, wrapping: false, color: false, transparent: false, positionX: -25, positionY: 5, positionZ: -25 }
            }
        ]
    }

    addHouses(scene){
        // Add all the houses in the array this.houses and add them to the scene automatically.
        for(var i = 0; i < this.houses.length; i++){

            var h = this.houses[i];
            var w = this.houses[i].window;
            var d = this.houses[i].door;
            var r = this.houses[i].roof;

            // Add a box for the house.
            var house = new Box().createMesh(h.height, h.width, h.depth, h.texture);
            scene.add(house);
            house.position.set(h.positionX, h.positionY, h.positionZ); // x, y, z.

            // Add a window if that's declared.
            if(w){
                var window = new Box().createMesh(w.height, w.width, w.depth, w.texture, w.wrapping, w.color, w.transparent);
                scene.add(window);
                window.position.set(w.positionX, w.positionY, w.positionZ); // x, y, z.
            }

            // Add a door.
            if(d){
                var door = new Box().createMesh(d.height, d.width, d.depth, d.texture, d.wrapping, d.color, d.transparent);
                scene.add(door);
                door.position.set(d.positionX, d.positionY, d.positionZ); // x, y, z.
            }

            // Add a roof.
            if(r){
                var roof = new Cylinder().createMesh(r.height, r.width, r.depth, r.radicalSegments, r.heightSegments, r.openEnded, r.thetaStart, r.thetaLength, r.texture, r.wrapping, r.color, r.transparent);
                scene.add(roof);
                roof.position.set(r.positionX, r.positionY, r.positionZ); // x, y, z.

                // Rotate the cylinder, so that it can be placed above a house.
                roof.rotation.x = Math.PI / 2;
                roof.rotation.y = Math.PI / 0.6666;
            }
        }
    }
}