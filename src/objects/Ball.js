import Object from "../core/Object";

export default class Ball extends Object {
  constructor(x, y, radius, color) {
    super(x, y, color);
    this.radius = radius;
  }
}
