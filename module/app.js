import { initDate } from "./util.js";
import { printGrid, moveGrid } from "./grid.js";
import { initRollingNews, rollingCallback } from "./rolling.js";

const LEFT = 0;
const RIGHT = 1;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

function init() {
  initDate();
  initRollingNews();
  printGrid();

  right_btn.addEventListener("click", () => moveGrid(RIGHT));
  left_btn.addEventListener("click", () => moveGrid(LEFT));
  document.addEventListener("DOMContentLoaded", () => {
    window.setInterval(rollingCallback, 3000);
  });
}

init();

export { right_btn, left_btn };
