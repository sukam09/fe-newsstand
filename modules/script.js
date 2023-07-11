import {
  handleGridButton,
  handleListButton,
  handleLogoButton,
  initDate,
} from "./global.js";
import {
  initGridView,
  showNextGridPage,
  showPrevGridPage,
} from "./gridView.js";
import { showGridPage } from "./gridView.js";
import { fetchData, shuffleArray } from "./utils.js";
import { initHeadline, rolling } from "./headline.js";
import {
  initListView,
  showNextListPage,
  showPrevListPage,
} from "./listView.js";

window.addEventListener("DOMContentLoaded", async () => {
  const rightGridButton =
    document.getElementsByClassName("right_grid_button")[0];
  const leftGridButton = document.getElementsByClassName("left_grid_button")[0];
  const listButton = document.getElementById("list_button");
  const gridButton = document.getElementById("grid_button");
  const titleContainer = document.getElementsByClassName("title_container")[0];
  const rightListButton =
    document.getElementsByClassName("right_list_button")[0];
  const leftListButton = document.getElementsByClassName("left_list_button")[0];

  const press = await fetchData("/data/press.json");
  const { data } = press;
  const shuffledPressData = shuffleArray(data);

  initDate();
  initHeadline();
  initGridView(shuffledPressData);
  showGridPage(0);
  initListView();
  rightGridButton.addEventListener("click", showNextGridPage);
  leftGridButton.addEventListener("click", showPrevGridPage);
  rightListButton.addEventListener("click", showNextListPage);
  rightListButton.addEventListener("click", showPrevListPage);
  listButton.addEventListener("click", handleListButton);
  gridButton.addEventListener("click", handleGridButton);
  titleContainer.addEventListener("click", handleLogoButton);
});
