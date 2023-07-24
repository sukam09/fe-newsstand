import {
  getQuerySelector,
  getQuerySelectorAll,
} from "../../utils/js/getElements.js";
import { showListNewsData } from "./pressListChange.js";
import { isGrid } from "../store/store.js";
import { getState, register, setState } from "../observer/observer.js";

function changeViewMode() {
  setState(isGrid, !getState(isGrid));
}

// 언론사 뷰 전환시 아이콘 색상 변경(UI)
function pressViewChange() {
  const pressListView = getQuerySelector("#pressbar-icon-list-view");
  const pressGridView = getQuerySelector("#pressbar-icon-grid-view");

  pressListView.addEventListener("click", () => {
    changeViewMode();
    showListNewsData("종합/경제", 1); // 꼼수라서 아이디어 생각나면 고쳐야함..
  });

  pressGridView.addEventListener("click", () => {
    changeViewMode();
  });

  register(isGrid, updateViewButtons);
  register(isGrid, showPressView);
}

function updateViewButtons() {
  const currentIsGridMode = getState(isGrid);
  const pressListView = getQuerySelector("#pressbar-icon-list-view");
  const pressGridView = getQuerySelector("#pressbar-icon-grid-view");

  pressListView.childNodes[1].setAttribute(
    "fill",
    !currentIsGridMode ? "#4362D0" : "#879298"
  );
  pressGridView.childNodes[1].setAttribute(
    "fill",
    currentIsGridMode ? "#4362D0" : "#879298"
  );
}

// 언론사 뷰 전환시 해당하는 뷰(그리드 or 리스트) 나타내기
function showPressView() {
  const currentIsGridMode = getState(isGrid);

  const pressContentContainer = getQuerySelectorAll(".press-content-view");
  const pressContentListView = getQuerySelectorAll(".press-content-list-view");

  pressContentContainer[0].style.display = currentIsGridMode ? "grid" : "none";
  pressContentListView[0].style.display = !currentIsGridMode ? "block" : "none";
}

export { pressViewChange };
