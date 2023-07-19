import { SUBSCRIBE_VIEW } from "../../global.js";
import { GRID_PAGE } from "../../global.js";
import { arrowStateInit } from "../components/Arrow.js";

const Tabs = document.querySelector(".tab-and-viewer .tabs");
const EntirePressBtn = Tabs.querySelector(".all-press-btn");
const SubscribePressBtn = Tabs.querySelector(".sub-press-btn");
const layout = document.querySelector("main");
const SUBSCRIBE = true;
const ENTIRE = false;

function tabStyleChange(targetTab, inactiveTab) {
  targetTab.classList.add("selected-bold16");
  targetTab.classList.remove("available-medium16");
  inactiveTab.classList.add("available-medium16");
  inactiveTab.classList.remove("selected-bold16");
}

export function PressFilterTab() {
  EntirePressBtn.addEventListener("click", () => {
    tabStyleChange(EntirePressBtn, SubscribePressBtn);
    GRID_PAGE.CURRENT_PAGE = 0;
    SUBSCRIBE_VIEW.changeView(ENTIRE);
    arrowStateInit();
  });
  SubscribePressBtn.addEventListener("click", () => {
    tabStyleChange(SubscribePressBtn, EntirePressBtn);
    GRID_PAGE.CURRENT_PAGE = 0;
    SUBSCRIBE_VIEW.changeView(SUBSCRIBE);
    arrowStateInit();
  });
}
