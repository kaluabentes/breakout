import BaseObject from "../core/BaseObject";

export default class Brick extends BaseObject {
  constructor(x, y, width, height, color) {
    super(x, y, color);

    this.width = width;
    this.height = height;
  }
}
