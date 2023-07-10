import {
  handleGridButton,
  handleListButton,
  handleLogoButton,
  updateDate,
} from "./global.js";
import {
  gridPage,
  initGrid,
  showNextGridPage,
  showPrevGridPage,
} from "./grid.js";
import { showGridPage } from "./grid.js";
import { shufflePress } from "./pressObj.js";

window.addEventListener("DOMContentLoaded", () => {
  const rightGridButton =
    document.getElementsByClassName("right_grid_button")[0];
  rightGridButton.addEventListener("click", () => showNextGridPage(gridPage));
  const leftGridButton = document.getElementsByClassName("left_grid_button")[0];
  leftGridButton.addEventListener("click", () => showPrevGridPage(gridPage));
  const listButton = document.getElementById("list_button");
  const gridButton = document.getElementById("grid_button");
  const titleContainer = document.getElementsByClassName("title_container")[0];

  shufflePress();
  updateDate();
  initGrid();
  showGridPage(0);

  listButton.addEventListener("click", handleListButton);
  gridButton.addEventListener("click", handleGridButton);
  titleContainer.addEventListener("click", handleLogoButton);
});
