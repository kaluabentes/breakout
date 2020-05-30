export default class Input {
  constructor() {
    this.isLeftKeyPressed = false;
    this.isRightKeyPressed = false;

    document.addEventListener("keydown", (event) => {
      if (event.key === "Right" || event.key === "ArrowRight") {
        this.isRightKeyPressed = true;
      } else if (event.key === "Left" || event.key === "ArrowLeft") {
        this.isLeftKeyPressed = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Right" || event.key === "ArrowRight") {
        this.isRightKeyPressed = false;
      } else if (event.key === "Left" || event.key === "ArrowLeft") {
        this.isLeftKeyPressed = false;
      }
    });
  }
}
