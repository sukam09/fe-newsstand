import { stopCategoryInterval } from "./category.js";
import { $, $All } from "./util.js";
import { getState, resister, setState } from "./observer/observer.js";
import {
  categoryIdx,
  gridPageIdx,
  isGrid,
  listPageIdx,
} from "./store/store.js";

// 로고 새로고침
function refreshWindow() {
  location.reload();
}

// 메인 요소 가져오기
function getMainElements() {
  return {
    listContainer: $(".list_container"),
    gridContainer: $All(".grid_container")[getState(gridPageIdx)],
    listButton: $(".list_button"),
    gridButton: $(".grid_button"),
    leftNavigationButton: $(".left_navigation_button"),
    rightNavigationButton: $(".right_navigation_button"),
  };
}

// 그리드, 리스트 여부에 따른 요소 css 변환
function changeView(elements, currentMode) {
  elements.listButton.src = currentMode
    ? "./assets/icons/list_off.png"
    : "./assets/icons/list_on.png";
  elements.gridButton.src = currentMode
    ? "./assets/icons/grid_on.png"
    : "./assets/icons/grid_off.png";

  elements.listContainer.style.display = currentMode ? "none" : "block";
  elements.gridContainer.style.display = currentMode ? "grid" : "none";
  elements.leftNavigationButton.style.display = currentMode ? "none" : "block";
  elements.rightNavigationButton.style.display = currentMode ? "none" : "block";
}

function toggleMainView() {
  const currentMode = getState(isGrid);
  const elements = getMainElements();
  changeView(elements, currentMode);
}

// 오늘 날짜 update
function updateDate() {
  let today = new Date();
  const dateHtml = $(".container__header_date");
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  today = today.toLocaleDateString("ko-KR", options);
  dateHtml.innerHTML = today;
}

function keyboardClicked(event) {
  const currentGridMode = getState(isGrid);
  const nowGridPage = getState(gridPageIdx);
  const nowListPage = getState(listPageIdx);
  if (currentGridMode) {
    if (event.key === "ArrowRight" && nowGridPage < 3) {
      setState(gridPageIdx, nowGridPage + 1);
    } else if (event.key === "ArrowLeft" && nowGridPage > 0) {
      setState(gridPageIdx, nowGridPage - 1);
    }
  } else {
    if (event.key === "ArrowRight") {
      setState(listPageIdx, nowListPage + 1);
    } else if (
      event.key === "ArrowLeft" &&
      (nowListPage - 1 > 0 || getState(categoryIdx) !== 0)
    ) {
      setState(listPageIdx, nowListPage - 1);
    }
  }
}

function toggleButtonClicked() {
  setState(isGrid, !getState(isGrid));
}

function setEvent() {
  const mainLogo = $(".container__header__main");
  const listButton = $(".list_button");
  const gridButton = $(".grid_button");
  mainLogo.addEventListener("click", refreshWindow);
  listButton.addEventListener("click", toggleButtonClicked);
  gridButton.addEventListener("click", toggleButtonClicked);
  window.addEventListener("keydown", (e) => {
    keyboardClicked(e);
  });
}

(function init() {
  setEvent();
  resister(isGrid, toggleMainView);
})();

export { updateDate };
