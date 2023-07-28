import { dispatcher } from "../store/dispatcher.js";
import { store } from "../store/store.js";
import { setGrid } from "./setGrid.js";
import { setList, setSubList } from "./setList.js";
import { absoluteFilePath, qs } from "./utils.js";

const grid_btn = qs(".grid-view-btn");
const list_btn = qs(".list-view-btn");

const all_press = qs(".all_press");
const subscribe_press = qs(".subscribe_press");

const mode_selector = qs(".mode-selector");

const $body = document.body;

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
    setSubList();
  });

  mode_selector.addEventListener("click", () => {
    dispatcher({ type: "CHANGE_MODE", mode: !store.isDarkMode });
    $body.className = store.isDarkMode ? "dark-mode" : "";
    mode_selector.style.backgroundImage = store.isDarkMode
      ? absoluteFilePath("../asset/icon/dark-mode.svg")
      : absoluteFilePath("../asset/icon/light-mode.svg");
    setGrid();
  });
};
