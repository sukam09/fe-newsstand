import { ENTIRE } from "../constant.js";

const Tabs = document.querySelector(".tab-and-viewer .tabs");
const EntirePressBtn = Tabs.querySelector(".all-press-btn");
const SubscribePressBtn = Tabs.querySelector(".sub-press-btn");

export function renderPressFilterTab(tab) {
  let targetTab, inactiveTab;
  if (tab === ENTIRE) {
    targetTab = EntirePressBtn;
    inactiveTab = SubscribePressBtn;
  } else {
    targetTab = SubscribePressBtn;
    inactiveTab = EntirePressBtn;
  }
  targetTab.classList.add("selected-bold16");
  targetTab.classList.remove("available-medium16");
  inactiveTab.classList.add("available-medium16");
  inactiveTab.classList.remove("selected-bold16");
}
