import { ENTIRE, SUBSCRIBE } from "../../constant.js";
import { LIST_PAGE, VIEW } from "../../model/global.js";
import { timerId } from "../timer.js";

const Tabs = document.querySelector(".tab-and-viewer .tabs");
const EntirePressBtn = Tabs.querySelector(".all-press-btn");
const SubscribePressBtn = Tabs.querySelector(".sub-press-btn");

export function pressFilterTabs() {
  EntirePressBtn.addEventListener("click", () => {
    timerId && clearInterval(timerId);
    VIEW.setTab(ENTIRE);
  });
  SubscribePressBtn.addEventListener("click", () => {
    timerId && clearInterval(timerId);
    LIST_PAGE.category = 0;
    VIEW.setTab(SUBSCRIBE);
  });
}
