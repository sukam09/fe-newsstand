import { changeView } from "../utils/changeView.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
import {
  FIRST_PAGE_NUM,
  CATEGORY,
  ICON_IMG_PATH,
  gridIndex,
} from "../constants/constants.js";
import { store } from "../core/store.js";
import { shuffleArray } from "../utils/shuffleIndex.js";
import {
  getView,
  getPage,
  getSubscribedPress,
  getMode,
  getCurrentPress,
} from "../core/getter.js";
import { getData } from "../core/api.js";
function MainView() {
  document.addEventListener("click", handleClick);

  store.setState({
    gridIndex: shuffleArray(gridIndex),
    // listIndex: shuffleArray(data),
  });
  drawPopup();
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

function drawPopup() {
  const view_content = document.querySelector(".view-content");
  // alert 그리는 부분
  const new_div_alert = document.createElement("div");
  new_div_alert.classList.add("popup", "alert");
  new_div_alert.innerHTML += `
        <div class="display-medium16 message"><span class="display-bold16 press">${
          getCurrentPress().name
        }</span>을(를)<br>구독해지하시겠습니까?</div>
        <div class="buttons">
          <button class="available-medium16 btn-yes">예, 해지합니다</button>
          <button class="available-medium16 btn-no">아니오</button>
        </div>`;

  // snackbar 그리는 부분
  const new_div_snackbar = document.createElement("div");
  new_div_snackbar.classList.add("popup", "snackbar");
  new_div_snackbar.textContent = "내가 구독한 언론사에 추가되었습니다.";

  // popup창들 추가
  view_content.append(new_div_alert, new_div_snackbar);
}

function updateTabSelection(selectedTab) {
  const allTab = document.getElementById("all");
  const subscribeTab = document.getElementById("subscribe");

  allTab.classList.remove("selected-bold16", "clicked");
  allTab.classList.add("available-medium16");
  subscribeTab.classList.remove("selected-bold16", "clicked");
  subscribeTab.classList.add("available-medium16");
  selectedTab.classList.remove("available-medium16");
  selectedTab.classList.add("selected-bold16", "clicked");
  store.setState({ page: FIRST_PAGE_NUM, tabMode: `${selectedTab.id}` });

  if (getView() === "grid") {
    showGridView();
  } else {
    showListView(
      selectedTab.id === "all" ? CATEGORY[0] : getSubscribedPress()[0]
    );
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
      updateTabSelection(document.getElementById("all"));
      break;
    case "subscribe":
      updateTabSelection(document.getElementById("subscribe"));
      break;
    default:
      break;
  }
}

export { MainView };
