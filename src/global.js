import { showGridPageButton, now_grid_page } from "./gridView.js";
import { listPageUp, updateCategory } from "./category.js";
import { $, $All } from "./util.js";

// 카테고리 탭 전환 시간
const CATEGORY_TAB_TIME = 20000;
// 로고 새로고침
function refresh() {
  location.reload();
}

// 프로그레스에 맞춘 탭 자동 넘김 Interval
let categoryInterval = setInterval(() => {
  listPageUp();
  updateCategory();
}, CATEGORY_TAB_TIME);

export function stopCategoryInterval() {
  clearInterval(categoryInterval);
}
export function startCategoryInterval() {
  categoryInterval = setInterval(() => {
    listPageUp();
    updateCategory();
  }, CATEGORY_TAB_TIME);
}

// 메인 요소 가져오기
function getMainElements() {
  return {
    listContainer: $(".list_container"),
    gridContainer: $All(".grid_container")[now_grid_page],
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
  }
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

(function init() {
  const mainLogo = $(".container__header__main");
  const listButton = $(".list_button");
  const gridButton = $(".grid_button");
  mainLogo.addEventListener("click", refresh);
  listButton.addEventListener("click", () => {
    changeMainView(false);
  });
  gridButton.addEventListener("click", () => {
    changeMainView(true);
  });
  stopCategoryInterval();
})();

export { updateDate };
