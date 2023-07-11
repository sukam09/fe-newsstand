import { updateGrid } from "./GridView.js";

export let current_grid_page = 0;

const RIGHT = 1;
const LEFT = 0;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");
right_btn.addEventListener("click", () => moveGrid(RIGHT));
left_btn.addEventListener("click", () => moveGrid(LEFT));

function moveGrid(dir) {
  if (dir === RIGHT) {
    current_grid_page++;
  } else {
    current_grid_page--;
  }
  if (current_grid_page === 0) {
    left_btn.style.display = "none";
    right_btn.style.display = "block";
  } else if (current_grid_page === 3) {
    right_btn.style.display = "none";
    left_btn.style.display = "block";
  } else {
    right_btn.style.display = "block";
    left_btn.style.display = "block";
  }
  updateGrid();
}
