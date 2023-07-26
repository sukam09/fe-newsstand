import { store } from "../core/store.js";
import { getTabMode, getView, getSubscribedPress } from "../core/getter.js";
import {
  CATEGORY,
  ICON_IMG_PATH,
  FIRST_PAGE_NUM,
} from "../constants/constants.js";
import { showGridView } from "../utils/makeGridView.js";
import { showListView } from "../utils/makeListView.js";
export function updateTabSelection(selectedTab) {
  const allTab = document.getElementById("all");
  const subscribeTab = document.getElementById("subscribe");
  if (allTab) {
    allTab.classList.remove("selected-bold16", "clicked");
    allTab.classList.add("available-medium16");
  }
  if (subscribeTab) {
    subscribeTab.classList.remove("selected-bold16", "clicked");
    subscribeTab.classList.add("available-medium16");
  }
  if (selectedTab) {
    selectedTab.classList.remove("available-medium16");
    selectedTab.classList.add("selected-bold16", "clicked");
  }
  store.setState({ page: FIRST_PAGE_NUM, tabMode: `${selectedTab.id}` });

  if (getView() === "grid") {
    showGridView();
  } else {
    showListView(
      getTabMode() === "all" ? CATEGORY[0] : getSubscribedPress()[0]
    );
  }
}
export function changeView(e_target) {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  const target = document.querySelector(`.${getView()}-view`);
  if (e_target === "grid") {
    if (target) target.classList.remove(`${getView()}-view`);
    store.setState({ view: "grid" });
    if (target) target.classList.add(`${getView()}-view`);
    grid_btn.src = `${ICON_IMG_PATH}grid-view-clicked.svg`;
    list_btn.src = `${ICON_IMG_PATH}list-view.svg`;
  } else {
    if (target) target.classList.remove(`${getView()}-view`);
    store.setState({ view: "list" });
    if (target) target.classList.add(`${getView()}-view`);
    grid_btn.src = `${ICON_IMG_PATH}grid-view.svg`;
    list_btn.src = `${ICON_IMG_PATH}list-view-clicked.svg`;
  }
  updateTabSelection(document.getElementById(`${getTabMode()}`));
}
