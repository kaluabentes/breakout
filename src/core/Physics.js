import sumArraysLength from "../utils/sumArraysLength";

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
    const {
      canvasHeight,
      canvasWidth,
      bounceVelocity,
      paddleVelocity,
    } = options;
    this.canvasHeight = options.canvasHeight;
    this.canvasWidth = options.canvasWidth;
    this.bounceVelocity = {
      x: bounceVelocity,
      y: -bounceVelocity,
    };
    this.paddleVelocity = paddleVelocity;
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

    // Detect if ball hits the top
    if (object.y + this.bounceVelocity.y < radiusOffset) {
      this.bounceVelocity.y = -this.bounceVelocity.y;
    }
    // Detect if ball hits the bottom
    else if (object.y + this.bounceVelocity.y > this.canvasHeight) {
      // Detect paddle collision
      if (
        object.x > this.paddle.x - object.radius &&
        object.x < this.paddle.x + this.paddle.width + object.radius
      ) {
        this.bounceVelocity.y = -this.bounceVelocity.y;

        return {
          stop: false,
        };
      }

      return {
        stop: true,
        message: "Game Over",
      };
    }

    // Detect if ball hits horizontal sides
    if (
      object.x + this.bounceVelocity.x > this.canvasWidth - radiusOffset ||
      object.x + this.bounceVelocity.x < radiusOffset
    ) {
      this.bounceVelocity.x = -this.bounceVelocity.x;
    }

    let bricksResponse = undefined;

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
          this.bricks[columnIndex].splice(rowIndex, 1);

          if (sumArraysLength(this.bricks) === 0) {
            bricksResponse = {
              stop: true,
              message: "Congratulations! You win!",
            };
          }

          this.bounceVelocity.y = -this.bounceVelocity.y;
        }
      });
    });

    if (bricksResponse) return bricksResponse;

    object.x += this.bounceVelocity.x;
    object.y += this.bounceVelocity.y;

    return {
      stop: false,
    };
  }

  /**
   * Move an object in the x axis
   * @param {object} object The object to move
   * @param {string} direction The direction to move
   */
  moveX(object, direction) {
    switch (direction) {
      case "right": {
        if (object.x + this.paddleVelocity > this.canvasWidth - object.width) {
          object.x = this.canvasWidth - object.width;
          return;
        }

        object.x += this.paddleVelocity;
        return;
      }
      case "left": {
        if (object.x - this.paddleVelocity < -5) {
          object.x = 0;
          return;
        }

        object.x -= this.paddleVelocity;
      }
    }
  }
}
