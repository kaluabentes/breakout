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

  /**
   * Draws a circle on screen
   * @param {object} circle The circle object
   * @param {number} circle.x The x axis
   * @param {number} circle.y The y axis
   * @param {number} circle.radius The radius size
   * @param {string} circle.color The fill color
   */
  drawCircle(circle) {
    this.context.beginPath();
    this.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    this.context.fillStyle = circle.color;
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
