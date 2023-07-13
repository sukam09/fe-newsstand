import { showGridView } from "./makeGridView.js";
import { showListView } from "./makeListView.js";

export function changeView(target) {
  const grid_btn = document.getElementById("grid-btn");
  const list_btn = document.getElementById("list-btn");
  if (target === "grid") {
    showGridView();
    grid_btn.src = "../assets/icons/grid-view-clicked.svg";
    list_btn.src = "../assets/icons/list-view.svg";
  } else {
    showListView();
    grid_btn.src = "../assets/icons/grid-view.svg";
    list_btn.src = "../assets/icons/list-view-clicked.svg";
  }
}
