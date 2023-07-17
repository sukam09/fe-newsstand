import { checkPage } from "../utils/checkPage.js";
import { changeView } from "../utils/changeView.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
import { FIRST_PAGE_NUM, CATEGORY } from "../constants/constants.js";

let page = FIRST_PAGE_NUM;
let subscribedPress = [];

function MainView() {
  document.addEventListener("click", handleClick);
  showGridView(page, subscribedPress);
  checkPage(page, "grid");
}

// 부모 컴포넌트에서 자식 컴포넌트로 전달한 콜백 함수
export function parentCallback(_subscribedPress) {
  subscribedPress = _subscribedPress;
  console.log("구독한 언론사:", subscribedPress);
}

function changePage(target, view) {
  if (target === "left") {
    page--;
  } else if (target === "right") {
    page++;
  }
  if (view === "grid") {
    showGridView(page, subscribedPress);
    checkPage(page, "grid");
  } else {
    showListView(page, subscribedPress, "all");
    checkPage(page, "list");
  }
}

export function resetPage() {
  page = 1;
}

function handleClick(e) {
  const view_content = document.querySelector(".view-content");
  const target = e.target.id;
  switch (target) {
    case "grid-btn":
    case "grid-view-btn":
      page = FIRST_PAGE_NUM;
      changeView("grid");
      showGridView(page, subscribedPress);
      checkPage(page, "grid");
      break;
    case "list-btn":
    case "list-view-btn":
      page = FIRST_PAGE_NUM;
      changeView("list");
      showListView(page, subscribedPress, "all", CATEGORY[0]);
      checkPage(page, "list");
      break;
    case "left":
    case "right":
      view_content.getElementsByClassName("grid-view").length
        ? changePage(target, "grid")
        : changePage(target, "list");
      break;
    case "all":
      document.getElementById("subscribe").classList.remove("clicked");
      document.getElementById(`${target}`).classList.add("clicked");
      break;
    case "subscribe":
      document.getElementById("all").classList.remove("clicked");
      document.getElementById(`${target}`).classList.add("clicked");

      // subscribedPress.length
      //   ? showListView(page, subscribedPress)
      //   : showListView(page, subscribedPress, "subscribe", subscribedPress[0]);
      break;
    default:
      break;
  }
}

export { MainView };
