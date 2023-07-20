import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";
import { showListNewsData } from "./pressListChange.js";
import { moveCategoryProgressbar } from "./pressCategory.js";

// 언론사 뷰 전환시 아이콘 색상 변경(UI)
function pressViewChange() {
  const pressListView = getQuerySelector(document, '#pressbar-icon-list-view');
  const pressGridView = getQuerySelector(document, '#pressbar-icon-grid-view');

  pressListView.addEventListener('click', () => {
    updateViewButtons("list");
    showPressView("list");
    showListNewsData("종합/경제", 1); // 꼼수라서 아이디어 생각나면 고쳐야함..
    moveCategoryProgressbar();
  });

  pressGridView.addEventListener('click', () => {
    updateViewButtons("grid");
    showPressView("grid");
  });
}

function updateViewButtons(status) {
  const pressListView = getQuerySelector(document, '#pressbar-icon-list-view');
  const pressGridView = getQuerySelector(document, '#pressbar-icon-grid-view');

  pressListView.childNodes[1].setAttribute("fill", status === "list" ? "#4362D0" : "#879298");
  pressGridView.childNodes[1].setAttribute("fill", status === "grid" ? "#4362D0" : "#879298");
}

// 언론사 뷰 전환시 해당하는 뷰(그리드 or 리스트) 나타내기
function showPressView(status) {
  selectArrow(status);
  const pressContentContainer = getQuerySelectorAll(document, ".press-content-view");
  const pressContentListView = getQuerySelectorAll(document, ".press-content-list-view");
  
  pressContentContainer[0].style.display = (status === "grid") ? "grid" : "none";
  pressContentListView[0].style.display = (status === "list") ? "block" : "none";
}

function selectArrow(status) {
  const listPrevArrow = getQuerySelector(document, "#press-content-list-prev");
  const listNextArrow = getQuerySelector(document, "#press-content-list-next");

  const gridPrevArrow = getQuerySelector(document, "#press-content-grid-prev");
  const gridNextArrow = getQuerySelector(document, "#press-content-grid-next");

  listPrevArrow.style.display = status === "list" ? "block" : "none";
  listNextArrow.style.display = status === "list" ? "block" : "none";
  gridPrevArrow.style.display = status === "grid" ? "none" : "block";
  gridNextArrow.style.display = status === "grid" ? "none" : "block";

}

export { pressViewChange };
