import { pressObjArr } from "./pressObj.js";
import { updateDate } from "./global.js";
import {
  gridPage,
  initGrid,
  showNextGridPage,
  showPrevGridPage,
  shuffleArray,
} from "./grid.js";
import { showGridPage } from "./grid.js";

window.addEventListener("load", () => {
  updateDate();
  initGrid();
  showGridPage(0);

  const $rightGridButton =
    document.getElementsByClassName("right_grid_button")[0];
  $rightGridButton.addEventListener("click", () => showNextGridPage(gridPage));
  const $leftGridButton =
    document.getElementsByClassName("left_grid_button")[0];
  $leftGridButton.addEventListener("click", () => showPrevGridPage(gridPage));
});
