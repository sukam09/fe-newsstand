import { store } from "../core/store.js";
import { getView } from "../core/getter.js";

export function changeView() {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  const target = document.querySelector(`.${getView()}-view`);
  if (getView() === "grid") {
    target.classList.remove(`${getView()}-view`);
    store.setState({ view: "list" });
    target.classList.add(`${getView()}-view`);
    grid_btn.src = "../assets/icons/grid-view.svg";
    list_btn.src = "../assets/icons/list-view-clicked.svg";
  } else {
    target.classList.remove(`${getView()}-view`);
    store.setState({ view: "grid" });
    target.classList.add(`${getView()}-view`);
    grid_btn.src = "../assets/icons/grid-view-clicked.svg";
    list_btn.src = "../assets/icons/list-view.svg";
  }
}
