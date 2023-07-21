import { store } from "../core/store.js";
import { getView } from "../core/getter.js";
import { ICON_IMG_PATH } from "../constants/constants.js";

export function changeView() {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
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
}
