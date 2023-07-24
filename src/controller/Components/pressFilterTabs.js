import { LIST_PAGE, VIEW } from "../../model/global.js";
import { timerId } from "../timer.js";
import { fieldClick, fieldXScroll } from "./field.js";

const Tabs = document.querySelector(".tab-and-viewer .tabs");
const EntirePressBtn = Tabs.querySelector(".all-press-btn");
const SubscribePressBtn = Tabs.querySelector(".sub-press-btn");

export function pressFilterTabs() {
  EntirePressBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
    }
    VIEW.setTab("entire");
  });
  SubscribePressBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
    }
    LIST_PAGE.category = 0;
    VIEW.setTab("subscribe");
    fieldClick();
    fieldXScroll();
  });
}
