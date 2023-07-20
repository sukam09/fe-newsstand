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

function updateCategory() {
  for (let category in GLOBAL.CATEGORY_START_INDEX) {
    if (GLOBAL.CATEGORY_START_INDEX[category] <= GLOBAL.LIST_CURRENT_PAGE) {
      GLOBAL.LIST_CURRENT_CATEGORY = CATEGORY[category];
    }
  }
}

export { initFieldTabEvent, updateCategory };
