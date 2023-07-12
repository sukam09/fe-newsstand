import { checkPage } from "../utils/checkPage.js";
import { changeView } from "../utils/changeView.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
import { FIRST_PAGE_NUM } from "../constants/constants.js";

let page = FIRST_PAGE_NUM;

function MainView() {
  showGridView(page);
  checkPage(page);

  const headerElement = document.createElement("h1");
  headerElement.textContent = "여기에 헤더 컴포넌트의 내용을 작성하세요";

  return headerElement;
}

//TODO: 옮기기
function changePage(target) {
  if (target === "left") {
    page--;
  } else if (target === "right") {
    page++;
  }
  showGridView(page);
  checkPage(page);
}

function handleClick(e) {
  const target = e.target.id;
  switch (target) {
    case "grid-btn":
    case "grid-view-btn":
      page = FIRST_PAGE_NUM;
      changeView("grid");
      showGridView(page);
      checkPage(page);
      break;
    case "list-btn":
    case "list-view-btn":
      page = FIRST_PAGE_NUM;
      changeView("list");
      showListView(page);
      checkPage(page);
      break;
    case "left":
    case "right":
      changePage(target);
      break;
    default:
      break;
  }
}

document.addEventListener("click", handleClick);

export { MainView };
