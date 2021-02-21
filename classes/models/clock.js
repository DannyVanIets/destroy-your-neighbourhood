class Clock {
  constructor(clockTexture) {
    this.clocks = [
      {
        radius: 5,
        segments: 20,
        texture: clockTexture,
        positionX: 50,
        positionY: 27,
        positionZ: -69.9,
      },
    ];
  }

  addClocks(scene) {
    for (let i = 0; i < this.clocks.length; i++) {
      let c = this.clocks[i];
      let clock = new Circle().createMesh(c.radius, c.segments, c.texture);

      scene.add(clock);
      clock.position.set(c.positionX, c.positionY, c.positionZ); // x, y, z.
    }
  }
}
