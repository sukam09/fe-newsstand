import { store } from "../core/store.js";
import { getTabMode, getView } from "../core/getter.js";
import { ICON_IMG_PATH } from "../constants/constants.js";

export function changeView() {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  const all_press = document.getElementById("all");
  const subscribed_press = document.getElementById("subscribe");
  const target = document.querySelector(`.${getView()}-view`);
  if (getView() === "grid") {
    target.classList.remove(`${getView()}-view`);
    store.setState({ view: "list" });
    target.classList.add(`${getView()}-view`);
    grid_btn.src = `${ICON_IMG_PATH}grid-view.svg`;
    list_btn.src = `${ICON_IMG_PATH}list-view-clicked.svg`;
  } else {
    target.classList.remove(`${getView()}-view`);
    store.setState({ view: "grid" });
    target.classList.add(`${getView()}-view`);
    grid_btn.src = `${ICON_IMG_PATH}grid-view-clicked.svg`;
    list_btn.src = `${ICON_IMG_PATH}list-view.svg`;
  }
  if (getTabMode === "all") {
    all_press.classList.add("clicked");
    subscribed_press.classList.remove("clicked");
  } else {
    all_press.classList.remove("clicked");
    subscribed_press.classList.add("clicked");
  }
}
