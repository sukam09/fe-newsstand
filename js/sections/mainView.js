import { changeView } from "../utils/changeView.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
import {
  FIRST_PAGE_NUM,
  CATEGORY,
  ICON_IMG_PATH,
} from "../constants/constants.js";
import { store } from "../core/store.js";
import { shuffleImgIndex } from "../utils/shuffleIndex.js";
import {
  getView,
  getPage,
  getSubscribedPress,
  getMode,
} from "../core/getter.js";
function MainView() {
  // 옵저버 함수를 등록
  document.addEventListener("click", handleClick);

  store.setState({ index: shuffleImgIndex() });
  showGridView();
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
}

function handleClick(e) {
  const view_content = document.querySelector(".view-content");
  const target = e.target.id;
  switch (target) {
    case "light-dark":
      let _mode;
      getMode() === "light" ? (_mode = "dark") : (_mode = "light");
      store.setState({ mode: _mode });
      document
        .getElementById(`${target}`)
        .setAttribute("src", `${ICON_IMG_PATH}${_mode}-mode.svg`);
      document.documentElement.setAttribute("color-theme", getMode());
      getView() === "grid" ? showGridView() : showListView();
      break;
    case "grid-btn":
    case "grid-view-btn":
    case "list-btn":
    case "list-view-btn":
      store.setState({ page: FIRST_PAGE_NUM });
      changeView(target.slice(0, 4));
      getView() === "list" ? showListView(CATEGORY[0]) : showGridView();
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
      } else {
        showListView(CATEGORY[0]);
      }
      break;
    case "subscribe":
      document.getElementById("all").classList.remove("clicked");
      document.getElementById(`${target}`).classList.add("clicked");
      store.setState({ page: FIRST_PAGE_NUM, tabMode: `${target}` });
      if (getView() === "grid") {
        showGridView();
      } else {
        showListView(getSubscribedPress[0]);
      }
      break;
    default:
      break;
  }
}

export { MainView };
