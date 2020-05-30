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
    this.paddle = options.paddle;
  }

  /**
   * Move a object to a direction
   * @param {object} object Object instance to be interact
   * @param {object} object.x current x axis
   * @param {object} object.y current y axis
   */
  bounce(object, hitBottomCallback) {
    const radiusOffset = object.radius ? object.radius : 0;

    // Y axis collision detection
    if (object.y + this.bounceVelocity.y < radiusOffset) {
      this.bounceVelocity.y = -this.bounceVelocity.y;
    } else if (
      object.y + this.bounceVelocity.y >
      this.canvasHeight - radiusOffset
    ) {
      if (
        object.x > this.paddle.x - object.radius &&
        object.x < this.paddle.x + this.paddle.width + object.radius
      ) {
        this.bounceVelocity.y = -this.bounceVelocity.y;
        return;
      }

      hitBottomCallback();
    }

    // X axis collision detection
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
        if (object.x + 10 > this.canvasWidth - object.width) {
          object.x = this.canvasWidth - object.width;
          return;
        }

        object.x += 10;
        return;
      }
      case "left": {
        if (object.x - 10 < -5) {
          object.x = 0;
          return;
        }

        object.x -= 10;
      }
    }
  }
}
