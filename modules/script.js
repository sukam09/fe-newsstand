import {
  handleGridButton,
  handleListButton,
  handleLogoButton,
  initDate,
} from "./global.js";
import {
  gridPage,
  initGrid,
  showNextGridPage,
  showPrevGridPage,
} from "./gridView.js";
import { showGridPage } from "./gridView.js";
import { fetchData, shuffleArray } from "./utils.js";
import { initHeadline, rolling } from "./headline.js";

window.addEventListener("DOMContentLoaded", async () => {
  const rightGridButton =
    document.getElementsByClassName("right_grid_button")[0];
  rightGridButton.addEventListener("click", () => showNextGridPage(gridPage));
  const leftGridButton = document.getElementsByClassName("left_grid_button")[0];
  leftGridButton.addEventListener("click", () => showPrevGridPage(gridPage));
  const listButton = document.getElementById("list_button");
  const gridButton = document.getElementById("grid_button");
  const titleContainer = document.getElementsByClassName("title_container")[0];

  const press = await fetchData("/data/press.json");
  const { data } = press;
  const shuffledPressData = shuffleArray(data);

  initDate();
  initHeadline();
  initGrid(shuffledPressData);
  showGridPage(0);

  listButton.addEventListener("click", handleListButton);
  gridButton.addEventListener("click", handleGridButton);
  titleContainer.addEventListener("click", handleLogoButton);
});
