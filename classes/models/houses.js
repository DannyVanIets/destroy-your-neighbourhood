class Houses {
  constructor(
    houseTexture,
    houseTextures,
    doorTexture,
    roofTextures,
    windowTexture
  ) {
    // Array used to add houses to the scene.

    this.houses = [
      {
        width: 100,
        height: 20,
        depth: 30,
        textures: houseTextures,
        positionX: -50,
        positionY: 5,
        positionZ: -85,
        windows: [
          {
            width: 15,
            height: 15,
            depth: 1,
            texture: windowTexture,
            positionX: -85,
            positionY: 5,
          },
          {
            width: 15,
            height: 15,
            depth: 1,
            texture: windowTexture,
            positionX: -15,
            positionY: 5,
          },
        ],
        door: {
          height: 15,
          depth: 1,
          texture: doorTexture,
          wrapping: false,
          color: false,
          transparent: false,
          positionX: -50,
          positionY: 2,
        },
      },
      {
        width: 40,
        height: 20,
        depth: 30,
        textures: houseTextures,
        positionX: -50,
        positionY: 5,
        positionZ: -115,
      },
      {
        width: 40,
        height: 20,
        depth: 30,
        texture: houseTexture,
        positionX: -150,
        positionY: 5,
        positionZ: -85,
        windows: [
          {
            width: 15,
            height: 10,
            depth: 1,
            texture: windowTexture,
            positionY: 5,
          },
        ],
        door: {
          height: 15,
          depth: 1,
          texture: doorTexture,
          wrapping: false,
          color: false,
          transparent: false,
          positionY: 2,
        },
        roof: {
          radius: 20.3,
          radialSegments: 7,
          heightSegments: 1,
          openEnded: false,
          thetaStart: Math.PI * 1,
          thetaLength: Math.PI * 1,
          texture: roofTextures,
          wrapping: [{ x: 1, y: 2 }],
          color: false,
          transparent: false,
        },
      },
      {
        width: 40,
        height: 20,
        depth: 60,
        texture: houseTexture,
        positionX: 50,
        positionY: 5,
        positionZ: -100,
        windows: [
          {
            width: 15,
            height: 10,
            depth: 1,
            texture: windowTexture,
            positionY: 5,
          },
        ],
        door: {
          height: 15,
          depth: 1,
          texture: doorTexture,
          wrapping: false,
          color: false,
          transparent: false,
          positionY: 2,
        },
        roof: {
          radius: 20.3,
          radialSegments: 4,
          heightSegments: 1,
          openEnded: false,
          thetaStart: Math.PI * 1,
          thetaLength: Math.PI * 1,
          texture: roofTextures,
          wrapping: [{ x: 1, y: 2 }],
          color: false,
          transparent: false,
        },
      },
      {
        width: 40,
        height: 40,
        depth: 30,
        texture: houseTexture,
        positionX: 150,
        positionY: 15,
        positionZ: -85,
        windows: [
          {
            width: 15,
            height: 10,
            depth: 1,
            texture: windowTexture,
            positionY: 5,
          },
          {
            width: 15,
            height: 10,
            depth: 1,
            texture: windowTexture,
            positionY: 25,
          },
          {
            width: 15,
            height: 10,
            depth: 1,
            texture: windowTexture,
            positionX: 160,
            positionY: 25,
          },
        ],
        door: {
          height: 15,
          depth: 1,
          texture: doorTexture,
          wrapping: false,
          color: false,
          transparent: false,
          positionY: 2,
        },
        roof: {
          radius: 20.3,
          radialSegments: 7,
          heightSegments: 1,
          openEnded: false,
          thetaStart: Math.PI * 1,
          thetaLength: Math.PI * 1,
          texture: roofTextures,
          wrapping: [{ x: 1, y: 1 }],
          color: false,
          transparent: false,
        },
      },
    ];
  }

  addHouses(scene) {
    // Add all the houses in the array this.houses and add them to the scene automatically.

    for (let i = 0; i < this.houses.length; i++) {
      let h = this.houses[i];
      let w;

      // Check if the house has a window in the array.
      if (this.houses[i].windows) {
        w = this.houses[i].windows[0];
      }

      let d = this.houses[i].door;
      let r = this.houses[i].roof;

      let house;

      // Add a box for the house.
      if (h.textures) {
        house = new Box().createMeshWithTextureArray(
          h.width,
          h.height,
          h.depth,
          h.textures
        );
      } else {
        house = new Box().createMesh(
          h.width,
          h.height,
          h.depth,
          h.texture,
          null,
          h.color
        );
      }

      // Add the box to the scene and position it correctly.
      scene.add(house);
      house.position.set(h.positionX, h.positionY, h.positionZ); // x, y, z.

      // Add a window if that's declared.
      if (w) {
        let j = 1;

        // Loop through every window that the house has in the array.
        while (w) {
          let windowPositionX;

          // If the window does not have any x position filled in, we will automatically create one.
          if (w.positionX) {
            windowPositionX = w.positionX;
          } else {
            windowPositionX = h.positionX - 10;
          }

          let windowPositionZ = h.positionZ + h.depth / 2 - w.depth / 2.25; // Calculate where the window is gonna be, based on the position and the depth of the house. This will then be minus the window depth divided by 2.25.

          let window = new Box().createMesh(
            w.width,
            w.height,
            w.depth,
            w.texture,
            w.wrapping,
            w.color,
            w.transparent
          );
          scene.add(window);
          window.position.set(windowPositionX, w.positionY, windowPositionZ); // x, y, z.
          w = this.houses[i].windows[j];
          j++;
        }
      }

      // Add a door if that is in the array of the house.
      if (d) {
        let doorWidth = d.height / 2; // Based on the height, the width will be calculated.
        let doorPositionX;

        // If the window does not have any x position filled in, we will give it one.
        if (d.positionX) {
          doorPositionX = d.positionX;
        } else {
          doorPositionX = h.positionX + h.width / 3 - doorWidth / 3; // The door position X will be based on the house positionX added with the width, divided by 3 and then minus the doorwidth divided by 3.
        }

        let doorPositionZ = h.positionZ + h.depth / 2 - d.depth / 2.25; // Used to calculate the z position of the door. Same as the windowPositionZ.

        let door = new Box().createMesh(
          doorWidth,
          d.height,
          d.depth,
          d.texture,
          d.wrapping,
          d.color,
          d.transparent
        );
        scene.add(door);
        door.position.set(doorPositionX, d.positionY, doorPositionZ); // x, y, z.
      }

      // Add a roof.
      if (r) {
        // First we will calculate the y and x positions, based on the house x and y added with the width and height.
        let roofPositionX = h.positionX + h.width / 2 - r.radius + 0.25;
        let roofPositionY = h.positionY + h.height / 2 - 0.5;

        let roof = new Cylinder().createMesh(
          r.radius,
          r.radius,
          h.depth,
          r.radialSegments,
          r.heightSegments,
          r.openEnded,
          r.thetaStart,
          r.thetaLength,
          r.texture,
          r.wrapping,
          r.color,
          r.transparent
        );
        scene.add(roof);
        roof.position.set(roofPositionX, roofPositionY, h.positionZ); // x, y, z.

        // Rotate the cylinder, so that 90 degrees turned and that it fits on top of a box.
        roof.rotation.x = Math.PI / 2;
        roof.rotation.y = Math.PI / 0.6666;
      }
    }
  }
}
