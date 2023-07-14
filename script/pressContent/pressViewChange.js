import { getElemId, getElemClass } from "../../utils/js/getElements.js";

// 언론사 뷰 전환시 아이콘 색상 변경(UI)
function pressViewChange() {
  const pressListView = getElemId(document, 'pressbar-icon-list-view');
  const pressGridView = getElemId(document, 'pressbar-icon-grid-view');

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
  const pressContentContainer = getElemClass(document, "press-content-view");
  const pressContentListView = getElemClass(document, "press-content-list-view");

  pressContentContainer[0].style.display = (status === "grid") ? "grid" : "none";
  pressContentListView[0].style.display = (status === "list") ? "block" : "none";

}
export { pressViewChange };
