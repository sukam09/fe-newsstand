import { getState, setState, subscribe } from "../observer/observer.js";
import { isListActivateState } from "../store/store.js";
import { startProgress, stopProgress } from "./list/ProgressBar.js";

const $gridView = document.querySelector(".grid-view");
const $listView = document.querySelector(".list-view");

const $mainNavView = document.querySelectorAll(".main-nav_viewer > button");
const $listButton = $mainNavView[0];
const $gridButton = $mainNavView[1];
const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);

const handleListButtonClick = () => {
  setState(isListActivateState, true);
};

const handleGridButtonClick = () => {
  setState(isListActivateState, false);
};

const setCurrentView = () => {
  if (getState(isListActivateState)) {
    $listButton.className = "main-nav_viewer--selected";
    $gridButton.className = "";

    $gridView.classList.add("hidden");
    $listView.classList.remove("hidden");

    startProgress();
  } else {
    $listButton.className = "";
    $gridButton.className = "main-nav_viewer--selected";

    $gridView.classList.remove("hidden");
    $listView.classList.add("hidden");

    stopProgress();
  }
};

const setListButtonDisplay = () => {
  if (getState(isListActivateState)) {
    $prevPageButton.classList.contains("hidden") &&
      $prevPageButton.classList.remove("hidden");
    $nextPageButton.classList.contains("hidden") &&
      $nextPageButton.classList.remove("hidden");
  }
};

export const setViewToggleButton = () => {
  subscribe(isListActivateState, setCurrentView);

  $listButton.addEventListener("click", handleListButtonClick);
  $gridButton.addEventListener("click", handleGridButtonClick);
};
