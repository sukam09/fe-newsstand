import { setGrid } from "./setGrid.js";
import { setList } from "./setList.js";

const grid_btn = document.querySelector(".grid-view-btn");
const list_btn = document.querySelector(".list-view-btn");

const all_press = document.querySelector(".all_press");
const subscribe_press = document.querySelector(".subscribe_press");

export const setEvents = () => {
  grid_btn.addEventListener("click", () => {
    setGrid();
  });

  list_btn.addEventListener("click", () => {
    setList();
  });

  all_press.addEventListener("click", () => {
    if (all_press.getAttribute("subscribetype") === null) {
      all_press.setAttribute("subscribetype", true);
      subscribe_press.removeAttribute("subscribetype");
    }
    setGrid();
  });

  subscribe_press.addEventListener("click", () => {
    if (subscribe_press.getAttribute("subscribetype") === null) {
      subscribe_press.setAttribute("subscribetype", true);
      all_press.removeAttribute("subscribetype");
    }
    setList();
  });
};
