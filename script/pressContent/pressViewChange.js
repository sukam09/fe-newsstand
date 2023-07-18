import { getQuerySelector, getQuerySelectorAll } from "../../utils/js/getElements.js";
// 언론사 뷰 전환시 아이콘 색상 변경(UI)
function pressViewChange() {
  const pressListView = getQuerySelector(document, '#pressbar-icon-list-view');
  const pressGridView = getQuerySelector(document, '#pressbar-icon-grid-view');

  pressListView.addEventListener('click', () => {
    pressListView.childNodes[1].setAttribute("fill", "#4362D0");
    pressGridView.childNodes[1].setAttribute("fill", "#879298");
    showPressView("list");
  });

  pressGridView.addEventListener('click', () => {
    pressListView.childNodes[1].setAttribute("fill", "#879298");
    pressGridView.childNodes[1].setAttribute("fill", "#4362D0");
    showPressView("grid");
  });
}

// 언론사 뷰 전환시 해당하는 뷰(그리드 or 리스트) 나타내기
function showPressView(status) {
  selectArrow(status);
  const pressContentContainer = getQuerySelectorAll(document, ".press-content-view");
  const pressContentListView = getQuerySelectorAll(document, ".press-content-list-view");
  
  pressContentContainer[0].style.display = (status === "grid") ? "grid" : "none";
  pressContentListView[0].style.display = (status === "list") ? "block" : "none";

  
}


// 코드 리팩토링 해야함
function selectArrow(status) {
  const listPrevArrow = getQuerySelector(document, "#press-content-list-prev");
  const listNextArrow = getQuerySelector(document, "#press-content-list-next");

  const gridPrevArrow = getQuerySelector(document, "#press-content-grid-prev");
  const gridNextArrow = getQuerySelector(document, "#press-content-grid-next");

  if (status === "grid") {
    listPrevArrow.style.display = "none";
    listNextArrow.style.display = "none";
    gridPrevArrow.style.display = "none";
    gridNextArrow.style.display = "block";
  }

  else if (status === "list") {
    listPrevArrow.style.display = "block";
    listNextArrow.style.display = "block";
    gridPrevArrow.style.display = "none";
    gridNextArrow.style.display = "none";
  }

}

export { pressViewChange };
