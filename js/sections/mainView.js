import { changeView } from "../utils/changeView.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
import { FIRST_PAGE_NUM, CATEGORY } from "../constants/constants.js";
import { store } from "../core/store.js";
import { shuffleImgIndex } from "../utils/shuffleIndex.js";
import {
  getView,
  getPage,
  getSubscribedPress,
  getIndex,
} from "../core/getter.js";
function MainView() {
  // 옵저버 함수를 등록
  document.addEventListener("click", handleClick);

  store.setState({ index: shuffleImgIndex() });
  showGridView();
  // checkPage();
}

function changePage(target) {
  const _page = getPage();
  if (target === "left") {
    store.setState({ page: _page - 1 });
  } else if (target === "right") {
    store.setState({ page: _page + 1 });
  }
  if (getView() === "grid") {
    showGridView();
  } else {
    showListView("");
  }
  // checkPage();
}

function handleClick(e) {
  const view_content = document.querySelector(".view-content");
  const target = e.target.id;
  switch (target) {
    case "grid-btn":
    case "grid-view-btn":
    case "list-btn":
    case "list-view-btn":
      store.setState({ page: FIRST_PAGE_NUM });
      changeView();
      getView() === "list" ? showListView(CATEGORY[0]) : showGridView();
      // checkPage();
      break;
    case "left":
    case "right":
      view_content.getElementsByClassName("grid-view").length
        ? changePage(target)
        : changePage(target);
      break;
    case "all":
      document.getElementById("subscribe").classList.remove("clicked");
      document.getElementById(`${target}`).classList.add("clicked");
      store.setState({ page: FIRST_PAGE_NUM, tabMode: `${target}` });
      if (getView() === "grid") {
        showGridView();
        // checkPage();
      } else {
        showListView(CATEGORY[0]);
        // checkPage();
      }
      break;
    case "subscribe":
      document.getElementById("all").classList.remove("clicked");
      document.getElementById(`${target}`).classList.add("clicked");
      store.setState({ page: FIRST_PAGE_NUM, tabMode: `${target}` });
      if (getView() === "grid") {
        showGridView();
        // checkPage();
      } else {
        showListView(getSubscribedPress[0]);
        // checkPage();
      }
      break;
    default:
      break;
  }
}

export { MainView };
