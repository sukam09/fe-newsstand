// import {
//   handleGridButton,
//   handleListButton,
//   handleLogoButton,
//   initDate,
// } from "./global.js";
// import {
//   initGridView,
//   showNextGridPage,
//   showPrevGridPage,
// } from "./gridView.js";
// import { showGridPage } from "./gridView.js";
// import { fetchData, shuffleArray } from "./utils.js";
// import { initHeadline } from "./components/headlineSection/headline/headline.js";
// import {
//   initListView,
//   showNextListPage,
//   showPrevListPage,
// } from "./listView.js";
// import { initMainHeader } from "./components/mainSection/mainHeader/mainHeader.js";
// import { mainSection } from "./components/mainSection/mainSection.js";
// import { headlineSection } from "./components/headlineSection/headlineSection.js";
import { rolling } from "./components/headlineSection/headline/headline.js";
import { headlineSection } from "./components/headlineSection/headlineSection.js";
import { mainSection } from "./components/mainSection/mainSection.js";
import { titleSection } from "./components/titleSection/titleSection.js";

window.addEventListener("DOMContentLoaded", async () => {
  // const rightGridButton =
  //   document.getElementsByClassName("right_grid_button")[0];
  // const leftGridButton = document.getElementsByClassName("left_grid_button")[0];

  // const titleContainer = document.getElementsByClassName("title_container")[0];
  // const rightListButton =
  //   document.getElementsByClassName("right_list_button")[0];
  // const leftListButton = document.getElementsByClassName("left_list_button")[0];
  // const press = await fetchData("/data/press.json");
  // const { data } = press;
  // const shuffledPressData = shuffleArray(data);

  // initMainHeader();
  // initDate();
  // initHeadline();
  // initGridView(shuffledPressData);
  // showGridPage(0);
  // initListView();

  // const listButton = document.getElementById("list_button");
  // const gridButton = document.getElementById("grid_button");
  // rightGridButton.addEventListener("click", showNextGridPage);
  // leftGridButton.addEventListener("click", showPrevGridPage);
  // rightListButton.addEventListener("click", showNextListPage);
  // rightListButton.addEventListener("click", showPrevListPage);
  // listButton.addEventListener("click", handleListButton);
  // gridButton.addEventListener("click", handleGridButton);
  // titleContainer.addEventListener("click", handleLogoButton);

  const $root = document.getElementById("root");

  console.log($root);
  $root.innerHTML += titleSection();
  $root.innerHTML += await headlineSection();
  $root.innerHTML += await mainSection();

  rolling();
});
