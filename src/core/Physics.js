export default class Physics {
  /**
   * Basic physics feature
   * @param {object} options Configuration options
   * @param {number} options.canvasHeight Canvas total height
   * @param {number} options.canvasHeight Canvas total width
   * @param {object} options.initialOffset Determines in which velocity the object should move.
   * @param {number} options.initialOffset.x x axis
   * @param {number} options.initialOffset.y y axis
   */
  constructor(options) {
    const { canvasHeight, canvasWidth, bounceVelocity } = options;
    this.canvasHeight = options.canvasHeight;
    this.canvasWidth = options.canvasWidth;
    this.bounceVelocity = {
      x: bounceVelocity,
      y: -bounceVelocity,
    };
  }

  /**
   * Move a object to a direction
   * @param {object} object Object instance to be interact
   * @param {object} object.x current x axis
   * @param {object} object.y current y axis
   */
  bounce(object) {
    const radiusOffset = object.radius ? object.radius : 0;

    // Top collision detection
    if (
      object.y + this.bounceVelocity.y < radiusOffset ||
      object.y + this.bounceVelocity.y > this.canvasHeight - radiusOffset
    ) {
      this.bounceVelocity.y = -this.bounceVelocity.y;
    }

    // Bottom collision detection
    if (
      object.x + this.bounceVelocity.x > this.canvasWidth - radiusOffset ||
      object.x + this.bounceVelocity.x < radiusOffset
    ) {
      this.bounceVelocity.x = -this.bounceVelocity.x;
    }

    object.x += this.bounceVelocity.x;
    object.y += this.bounceVelocity.y;
  }

  moveX(object, direction) {
    switch (direction) {
      case "right": {
        if (object.x + 10 > this.canvasWidth - object.width + 5) {
          return;
        }

        object.x += 10;
        return;
      }
      case "left": {
        if (object.x - 10 < -5) {
          return;
        }

        object.x -= 10;
      }
    }
  }
}
