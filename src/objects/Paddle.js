import BaseObject from "../core/BaseObject";

export default class Ball extends BaseObject {
  constructor(x, y, width, height, color) {
    super(x, y, color);

    this.width = width;
    this.height = height;
    this.color = color;
  }
}
