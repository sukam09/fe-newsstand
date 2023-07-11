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
} from "./gridView.js";
import { showGridPage } from "./gridView.js";
import { rolling } from "./listView.js";
import { shuffleArray } from "./utils.js";

window.addEventListener("DOMContentLoaded", async () => {
  const rightGridButton =
    document.getElementsByClassName("right_grid_button")[0];
  rightGridButton.addEventListener("click", () => showNextGridPage(gridPage));
  const leftGridButton = document.getElementsByClassName("left_grid_button")[0];
  leftGridButton.addEventListener("click", () => showPrevGridPage(gridPage));
  const listButton = document.getElementById("list_button");
  const gridButton = document.getElementById("grid_button");
  const titleContainer = document.getElementsByClassName("title_container")[0];

  const press = await fetchPressData();
  const { data } = press;
  const shuffledPressData = shuffleArray(data);

  updateDate();
  initGrid(shuffledPressData);
  showGridPage(0);
  rolling();

  listButton.addEventListener("click", handleListButton);
  gridButton.addEventListener("click", handleGridButton);
  titleContainer.addEventListener("click", handleLogoButton);
});

const fetchPressData = async () => {
  const res = await fetch("/data/press.json");
  const jsonData = await res.json();
  return jsonData;
};
