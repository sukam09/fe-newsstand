import { CATEGORY, GLOBAL } from "../model/variable.js";
import { moveRight } from "./arrowBtnController.js";
import { moveListPageFromClickFieldTab } from "./listController.js";

function initFieldTabEvent() {
  const fieldTab = document.querySelector(".field-tab");
  fieldTab.addEventListener("animationiteration", () => {
    moveRight();
  });
  fieldTab.addEventListener("click", (event) => {
    moveListPageFromClickFieldTab(event);
  });
}

function updateCategory(listPage) {
  for (let category in GLOBAL.CATEGORY_START_INDEX) {
    if (GLOBAL.CATEGORY_START_INDEX[category] <= listPage) {
      GLOBAL.LIST_CURRENT_CATEGORY = CATEGORY[category];
    }
  }
}

export { initFieldTabEvent, updateCategory };
