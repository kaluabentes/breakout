import Painter from "./Painter";
import Physics from "./Physics";

import Ball from "../objects/Ball";

const BALL_RADIUS = 10;

export default class Game {
  /**
   * The core game component
   * @param {string} canvasId The id of canvas element
   */
  constructor(canvasId) {
    this.painter = new Painter(canvasId);
    const { canvas } = this.painter;
    this.physics = new Physics({
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
      initialOffset: { x: 10, y: -10 },
    });

    this.ball = new Ball(
      canvas.width / 2,
      canvas.height - 30,
      BALL_RADIUS,
      "#0095DD"
    );

    const step = () => {
      this.draw();
      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

  draw() {
    this.painter.clear();
    this.painter.drawCircle(this.ball);

    this.physics.move(this.ball, { x: 3, y: -3 });
    console.log(this.ball);
  }
}
