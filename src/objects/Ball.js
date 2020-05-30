import BaseObject from "../core/BaseObject";

export default class Ball extends BaseObject {
  constructor(x, y, radius, color) {
    super(x, y, color);

    this.radius = radius;
  }
}
