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
    this.bricks = options.bricks;
  }

  /**
   * Bounce an object and detect collisions
   * @param {object} object Object instance to be interact
   * @param {object} object.x current x axis
   * @param {object} object.y current y axis
   */
  bounce(object) {
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
        return true;
      }

      return false;
    }

    // X axis collision detection
    if (
      object.x + this.bounceVelocity.x > this.canvasWidth - radiusOffset ||
      object.x + this.bounceVelocity.x < radiusOffset
    ) {
      this.bounceVelocity.x = -this.bounceVelocity.x;
    }

    // Bricks collision detection
    this.bricks.forEach((rows, columnIndex) => {
      rows.forEach((brick, rowIndex) => {
        const offsetX = object.x + this.bounceVelocity.x;
        const offsetY = object.y + this.bounceVelocity.y;

        if (
          offsetX > brick.x &&
          offsetX < brick.x + brick.width &&
          offsetY > brick.y &&
          offsetY < brick.y + brick.height
        ) {
          delete this.bricks[columnIndex][rowIndex];
          this.bounceVelocity.y = -this.bounceVelocity.y;
        }
      });
    });

    object.x += this.bounceVelocity.x;
    object.y += this.bounceVelocity.y;
    return true;
  }

  /**
   * Move an object in the x axis
   * @param {object} object The object to move
   * @param {string} direction The direction to move
   */
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
