import { checkPage } from "../utils/checkPage.js";
import { changeView } from "../utils/changeView.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
import { FIRST_PAGE_NUM, CATEGORY } from "../constants/constants.js";

let page = FIRST_PAGE_NUM;

function MainView() {
  document.addEventListener("click", handleClick);
  showGridView(page);
  checkPage(page, "grid");

  const headerElement = document.createElement("h1");
  headerElement.textContent = "여기에 헤더 컴포넌트의 내용을 작성하세요";

  return headerElement;
}

function changePage(target, view) {
  if (target === "left") {
    page--;
  } else if (target === "right") {
    page++;
  }
  if (view === "grid") {
    showGridView(page);
    checkPage(page, "grid");
  } else {
    showListView(page, CATEGORY); //TODO: showList에서 해당 category 마지막 언론사면 다음 카테고리로
    checkPage(page, "list");
  }
}

function handleClick(e) {
  const view_content = document.querySelector(".view-content");
  const target = e.target.id;
  switch (target) {
    case "grid-btn":
    case "grid-view-btn":
      page = FIRST_PAGE_NUM;
      changeView("grid");
      showGridView(page);
      checkPage(page, "grid");
      break;
    case "list-btn":
    case "list-view-btn":
      page = FIRST_PAGE_NUM;
      changeView("list");
      showListView(page, CATEGORY[0]);
      checkPage(page, "list");
      break;
    case "left":
    case "right":
      view_content.getElementsByClassName("grid-view").length
        ? changePage(target, "grid")
        : changePage(target, "list");
      break;
    default:
      break;
  }
}

export { MainView };
