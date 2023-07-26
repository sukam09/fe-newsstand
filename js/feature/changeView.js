import { getState, setState } from "../store/observer.js";
import {
  gridAllPage,
  listAllPage,
  viewOption,
  isDark,
} from "../store/store.js";
import {
  changeViewOptionToAll,
  changeViewOptionToSub,
  changeViewTypeToList,
  changeViewTypeToGrid,
} from "./eventHandlers.js";
import { ALL_PRESS, SUB_PRESS } from "../utils/constant.js";

function addEventToViewBtn() {
  const allPress = document.querySelector(".all-press");
  const subPress = document.querySelector(".sub-press");
  const listViewBtn = document.querySelector(".list-view-btn");
  const gridViewBtn = document.querySelector(".grid-view-btn");
  allPress.addEventListener("click", changeViewOptionToAll);
  subPress.addEventListener("click", changeViewOptionToSub);
  listViewBtn.addEventListener("click", () =>
    changeViewTypeToList(listViewBtn, gridViewBtn)
  );
  gridViewBtn.addEventListener("click", () =>
    changeViewTypeToGrid(listViewBtn, gridViewBtn)
  );
}

function changeViewOption() {
  const allPress = document.querySelector(".all-press");
  const subPress = document.querySelector(".sub-press");
  if (getState(viewOption) === ALL_PRESS) {
    allPress.classList.replace("unclicked-press", "clicked-press");
    subPress.classList.replace("clicked-press", "unclicked-press");
    setState(gridAllPage, 1);
    setState(listAllPage, 0);
  } else if (getState(viewOption) === SUB_PRESS) {
    subPress.classList.replace("unclicked-press", "clicked-press");
    allPress.classList.replace("clicked-press", "unclicked-press");
    setState(gridAllPage, 1);
    setState(listAllPage, 0);
  }
}
function addEventToDarkMode() {
  const darkMode = document.querySelector(".dark-mode");
  darkMode.addEventListener("click", () => {
    if (getState(isDark)) {
      document.documentElement.setAttribute("color-theme", "light");
      darkMode.setAttribute("src", "../images/icon/Dark.svg");
      setState(isDark, !getState(isDark));
    } else {
      document.documentElement.setAttribute("color-theme", "dark");
      darkMode.setAttribute("src", "../images/icon/Light.svg");
      setState(isDark, !getState(isDark));
    }
  });
}

export { addEventToViewBtn, changeViewOption, addEventToDarkMode };
