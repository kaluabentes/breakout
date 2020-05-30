export default class Painter {
  /**
   * Responsible for draw things on the screen
   * @param {string} canvasId The canvas element id
   */
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
  }

  drawCircle(circle) {
    this.context.beginPath();
    this.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    this.context.fillStyle = circle.color;
    this.context.fill();
    this.context.closePath();
  }

  drawSquare(square) {
    this.context.beginPath();
    this.context.rect(square.x, square.y, square.width, square.height);
    this.context.fillStyle = square.color;
    this.context.fill();
    this.context.closePath();
  }

  /**
   * It clears the canvas for the next print
   */
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
