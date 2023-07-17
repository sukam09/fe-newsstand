import { showGridPageButton, showGridPage } from "./gridView.js";
import {
  setFirstListPage,
  startCategoryInterval,
  stopCategoryInterval,
  updateCategoryClicked,
} from "./category.js";
import { $, $All } from "./util.js";
import { listArrowButtonClicked } from "./listView.js";
import {
  IS_GRID,
  NOW_CATEGORY_IDX,
  NOW_GRID_PAGE,
  NOW_LIST_PAGE,
} from "../constant/constants.js";

// 로고 새로고침
function refreshWindow() {
  location.reload();
}

// 메인 요소 가져오기
function getMainElements() {
  return {
    listContainer: $(".list_container"),
    gridContainer: $All(".grid_container")[NOW_GRID_PAGE.getValue()],
    listButton: $(".list_button"),
    gridButton: $(".grid_button"),
    leftListButton: $(".left_list_button"),
    rightListButton: $(".right_list_button"),
    leftGridButton: $(".left_grid_button"),
    rightGridButton: $(".right_grid_button"),
  };
}

// 그리드, 리스트 여부에 따른 요소 css 변환
function changeView(elements, isGrid) {
  elements.listButton.src = isGrid
    ? "./assets/icons/list_off.png"
    : "./assets/icons/list_on.png";
  elements.gridButton.src = isGrid
    ? "./assets/icons/grid_on.png"
    : "./assets/icons/grid_off.png";

  elements.listContainer.style.display = isGrid ? "none" : "block";
  elements.gridContainer.style.display = isGrid ? "grid" : "none";

  elements.leftListButton.style.display = isGrid ? "none" : "block";
  elements.rightListButton.style.display = isGrid ? "none" : "block";
  elements.leftGridButton.style.display = isGrid ? "block" : "none";
  elements.rightGridButton.style.display = isGrid ? "block" : "none";

  if (isGrid) {
    showGridPageButton();
    stopCategoryInterval();
  } else {
    startCategoryInterval();
    setFirstListPage();
    updateCategoryClicked();
  }
  IS_GRID.toggleValue();
}

function changeMainView(isGrid) {
  const elements = getMainElements();
  changeView(elements, isGrid);
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
  if (IS_GRID.getValue()) {
    if (event.key === "ArrowRight" && NOW_GRID_PAGE.getValue() < 3) {
      showGridPage(1);
    } else if (event.key === "ArrowLeft" && NOW_GRID_PAGE.getValue() > 0) {
      showGridPage(-1);
    }
  } else {
    if (event.key === "ArrowRight") {
      listArrowButtonClicked(1);
    } else if (
      event.key === "ArrowLeft" &&
      (NOW_LIST_PAGE.getValue() - 1 > 0 || NOW_CATEGORY_IDX.getValue() !== 0)
    ) {
      listArrowButtonClicked(-1);
    }
  }
}

(function init() {
  const mainLogo = $(".container__header__main");
  const listButton = $(".list_button");
  const gridButton = $(".grid_button");
  mainLogo.addEventListener("click", refreshWindow);
  listButton.addEventListener("click", () => {
    changeMainView(false);
  });
  gridButton.addEventListener("click", () => {
    changeMainView(true);
  });
  window.addEventListener("keydown", (e) => {
    keyboardClicked(e);
  });
  stopCategoryInterval();
})();

export { updateDate };
