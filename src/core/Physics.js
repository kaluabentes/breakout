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
    const { canvasHeight, canvasWidth, initialOffset } = options;
    this.canvasHeight = options.canvasHeight;
    this.canvasWidth = options.canvasWidth;
    this.axisOffset = {
      x: initialOffset.x,
      y: initialOffset.y,
    };
  }

  /**
   * Move a object to a direction
   * @param {object} object Object instance to be interact
   * @param {object} object.x current x axis
   * @param {object} object.y current y axis
   */
  move(object) {
    const radiusOffset = object.radius ? object.radius : 0;

    if (
      object.y + this.axisOffset.y < radiusOffset ||
      object.y + this.axisOffset.y > this.canvasHeight - radiusOffset
    ) {
      this.axisOffset.y = -this.axisOffset.y;
    }

    if (
      object.x + this.axisOffset.x > this.canvasWidth - radiusOffset ||
      object.x + this.axisOffset.x < radiusOffset
    ) {
      this.axisOffset.x = -this.axisOffset.x;
    }

    object.x += this.axisOffset.x;
    object.y += this.axisOffset.y;
  }
}
