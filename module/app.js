import { initDate } from "./util.js";
import { printGrid, moveGrid } from "./grid.js";

const RIGHT = 1;
const LEFT = 0;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

function init() {
  right_btn.addEventListener("click", () => moveGrid(RIGHT));
  left_btn.addEventListener("click", () => moveGrid(LEFT));

  initDate();
  printGrid();
}

init();

export { right_btn, left_btn };
