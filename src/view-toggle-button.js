import { startProgress, stopProgress } from "./progress-bar.js";

const $gridView = document.querySelector(".grid-view");
const $listView = document.querySelector(".list-view");

const $mainNavView = document.querySelectorAll(".main-nav_viewer > button");
const $listButton = $mainNavView[0];
const $gridButton = $mainNavView[1];

const handleListButtonClick = () => {
  $listButton.className = "main-nav_viewer--selected";
  $gridButton.className = "";

  $gridView.classList.add("hidden");
  $listView.classList.remove("hidden");

  startProgress();
};

const handleGridButtonClick = () => {
  $listButton.className = "";
  $gridButton.className = "main-nav_viewer--selected";

  $gridView.classList.remove("hidden");
  $listView.classList.add("hidden");

  stopProgress();
};

export const setViewToggleButton = () => {
  $listButton.addEventListener("click", handleListButtonClick);
  $gridButton.addEventListener("click", handleGridButtonClick);
};
