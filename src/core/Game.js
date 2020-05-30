import Painter from "./Painter";
import Physics from "./Physics";
import Input from "./Input";

import Ball from "../objects/Ball";
import Paddle from "../objects/Paddle";

const BALL_RADIUS = 10;
const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 10;
const SHAPE_COLOR = "#0095DD";
const BOUNCE_VELOCITY = 10;

export default class Game {
  /**
   * The core game component
   * @param {string} canvasId The id of canvas element
   */
  constructor(canvasId) {
    this.painter = new Painter(canvasId);
    const { canvas } = this.painter;

    this.paddle = new Paddle(
      canvas.width / 2 - PADDLE_WIDTH / 2,
      canvas.height - PADDLE_HEIGHT,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      SHAPE_COLOR
    );

    this.physics = new Physics({
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
      bounceVelocity: BOUNCE_VELOCITY,
      paddle: this.paddle,
    });

    this.ball = new Ball(
      canvas.width / 2,
      canvas.height - 30,
      BALL_RADIUS,
      SHAPE_COLOR
    );

    this.input = new Input();

    const step = () => {
      this.draw();
      this.loop = window.requestAnimationFrame(step);
    };

    this.loop = window.requestAnimationFrame(step);
  }

  draw() {
    this.painter.clear();
    this.painter.drawCircle(this.ball);
    this.painter.drawSquare(this.paddle);

    if (this.input.isLeftKeyPressed) {
      this.physics.moveX(this.paddle, "left");
    } else if (this.input.isRightKeyPressed) {
      this.physics.moveX(this.paddle, "right");
    }

    this.physics.bounce(this.ball, this.handleGameOver);
  }

  handleGameOver() {
    alert("Game over");
    window.cancelAnimationFrame(this.loop);
  }
}
