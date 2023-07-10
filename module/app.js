import { initDate } from "./util.js";
import { right_btn, left_btn, printGrid, moveGrid } from "./grid.js";

const RIGHT = 1;
const LEFT = 0;

function init() {
  right_btn.addEventListener("click", () => moveGrid(RIGHT));
  left_btn.addEventListener("click", () => moveGrid(LEFT));

  initDate();
  printGrid();
}

init();
