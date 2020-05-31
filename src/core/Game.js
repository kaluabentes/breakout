import Painter from "./Painter";
import Physics from "./Physics";
import Input from "./Input";

import Ball from "../objects/Ball";
import Paddle from "../objects/Paddle";
import Brick from "../objects/Brick";

const ballRadius = 10;
const paddleWidth = 150;
const paddleHeight = 10;
const shapeColor = "#0095DD";
const bounceVelocity = 10;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

export default class Game {
  /**
   * The core game component
   * @param {string} canvasId The id of canvas element
   */
  constructor(canvasId) {
    this.painter = new Painter(canvasId);
    const { canvas } = this.painter;

    this.paddle = new Paddle(
      canvas.width / 2 - paddleWidth / 2,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight,
      shapeColor
    );

    this.physics = new Physics({
      canvasHeight: canvas.height,
      canvasWidth: canvas.width,
      bounceVelocity,
      paddle: this.paddle,
    });

    this.ball = new Ball(
      canvas.width / 2,
      canvas.height - 30,
      ballRadius,
      shapeColor
    );

    this.input = new Input();

    this.bricks = new Array(brickColumnCount).fill(
      new Array(brickRowCount).fill(
        new Brick(0, 0, brickWidth, brickHeight, shapeColor)
      )
    );

    this.start();
  }

  start() {
    const step = () => {
      if (!this.draw()) {
        this.stop();
        return;
      }

      this.animationRequestId = window.requestAnimationFrame(step);
    };

    this.animationRequestId = window.requestAnimationFrame(step);
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

    return this.physics.bounce(this.ball);
  }

  stop() {
    alert("Game Over");
    document.location.reload();
    window.cancelAnimationFrame(this.animationRequestId);
    this.animationRequestId = undefined;
  }
}
