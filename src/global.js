import { $, $All } from "./core/utils/util.js";
import { getState, register, setState } from "./core/observer/observer.js";
import {
  gridPageIdx,
  isDarkMode,
  isGrid,
  isSubTab,
  listIdx,
  subscribeList,
} from "./core/store/store.js";
import { ALL_PRESS, SUB_PRESS } from "./core/store/constants.js";

const subTabButton = $(`.${SUB_PRESS}`);
const allTabButton = $(`.${ALL_PRESS}`);
const mainLogo = $(".container__header__main");
const listButton = $(".list_button");
const gridButton = $(".grid_button");
const toggleDarkButton = $(".toggle_darkmode");
const darkLogo = $(".dark_button", toggleDarkButton);
const lightLogo = $(".light_button", toggleDarkButton);

// 로고 새로고침
function refreshWindow() {
  location.reload();
}

// 메인 요소 가져오기
function getMainElements() {
  return {
    listContainer: $(".list_container"),
    gridContainer: $All(".grid_container")[getState(gridPageIdx)],
    leftNavigationButton: $(".left_navigation_button"),
    rightNavigationButton: $(".right_navigation_button"),
  };
}

// 그리드, 리스트 여부에 따른 요소 css 변환
function changeView(elements, currentMode) {
  listButton.src = currentMode
    ? "./assets/icons/list_off.svg"
    : "./assets/icons/list_on.svg";
  gridButton.src = currentMode
    ? "./assets/icons/grid_on.svg"
    : "./assets/icons/grid_off.svg";

  elements.listContainer.style.display = currentMode ? "none" : "block";
  elements.gridContainer.style.display = currentMode ? "grid" : "none";
  elements.leftNavigationButton.style.display = currentMode ? "none" : "block";
  elements.rightNavigationButton.style.display = currentMode ? "none" : "block";
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

function toggleGridClicked() {
  setState(isGrid, !getState(isGrid));
}

function toggleSubClicked() {
  const subListCount = getState(subscribeList).length;
  if (subListCount === 0) {
    alert("구독한 언론사가 없습니다!");
  } else {
    if (getState(isSubTab)) {
      setState(isGrid, true);
    } else {
      setState(isGrid, false);
    }
    setState(isSubTab, !getState(isSubTab));
    setState(listIdx, { category: 0, list: 1 });
  }
}

function toggleMainView() {
  const currentMode = getState(isGrid);
  const elements = getMainElements();
  changeView(elements, currentMode);
}
function updateSubViewButton() {
  const isSubMode = getState(isSubTab);
  if (isSubMode) {
    subTabButton.classList.replace(SUB_PRESS, ALL_PRESS);
    allTabButton.classList.replace(ALL_PRESS, SUB_PRESS);
  } else {
    subTabButton.classList.replace(ALL_PRESS, SUB_PRESS);
    allTabButton.classList.replace(SUB_PRESS, ALL_PRESS);
  }
}

function toggleDarkButtonClicked() {
  setState(isDarkMode, !getState(isDarkMode));
}
function toggleDarkMode() {
  if (getState(isDarkMode)) {
    document.documentElement.setAttribute("color-theme", "dark");
    lightLogo.setAttribute("color-theme", "dark");
    darkLogo.setAttribute("color-theme", "dark");
  } else {
    document.documentElement.setAttribute("color-theme", "light");
    lightLogo.setAttribute("color-theme", "light");
    darkLogo.setAttribute("color-theme", "light");
  }
}

function setGlobalEvent() {
  mainLogo.addEventListener("click", refreshWindow);
  listButton.addEventListener("click", toggleGridClicked);
  gridButton.addEventListener("click", toggleGridClicked);
  subTabButton.addEventListener("click", toggleSubClicked);
  allTabButton.addEventListener("click", toggleSubClicked);
  toggleDarkButton.addEventListener("click", toggleDarkButtonClicked);
  register(isGrid, toggleMainView);
  register(isSubTab, updateSubViewButton);
  register(isDarkMode, toggleDarkMode);
  updateDate();
}

export { setGlobalEvent };
