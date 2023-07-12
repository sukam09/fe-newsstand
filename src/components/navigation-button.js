import { getState, setState } from "../observer/observer.js";
import {
  gridPageState,
  isListActivateState,
  listPageState,
} from "../store/store.js";

const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);

const handlePrevButtonClick = () => {
  if (getState(isListActivateState))
    setState(listPageState, getState(listPageState) - 1);
  else setState(gridPageState, getState(gridPageState) - 1);
};

const handleNextButtonClick = () => {
  if (getState(isListActivateState))
    setState(listPageState, getState(listPageState) + 1);
  else setState(gridPageState, getState(gridPageState) + 1);
};

export const setNavigationButtons = () => {
  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
};
