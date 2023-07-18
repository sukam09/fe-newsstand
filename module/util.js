import { ICON, MODE, BTN, GLOBAL } from "./variable.js";
import { moveGrid } from "./grid.js";
import { moveListPage, movePageFromEvent } from "./list.js";
import { alertBtnHandler, clickListSubscribe } from "./subscribe.js";

function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  GLOBAL.DOM.TODAY.innerHTML = todaystr;
}

function initBtn() {
  GLOBAL.DOM.RIGHT_BTN.addEventListener("click", () => handleMoveBtn(BTN.NEXT_PAGE));
  GLOBAL.DOM.LEFT_BTN.addEventListener("click", () => handleMoveBtn(BTN.PREV_PAGE));

  GLOBAL.DOM.LIST_BNT.addEventListener("click", () => {
    toggleView(BTN.LIST_VIEW);
  });
  GLOBAL.DOM.GRID_BTN.addEventListener("click", () => {
    toggleView(BTN.GRID_VIEW);
  });

  GLOBAL.DOM.FIELD_TAB.addEventListener("click", (event) => {
    movePageFromEvent(event);
  });
  GLOBAL.DOM.FIELD_TAB.addEventListener("animationiteration", () => {
    moveListPage((GLOBAL.LIST_CURRENT_PAGE + 1) % GLOBAL.TOTAL_NEWS_NUM);
  });

  GLOBAL.DOM.ALERT_YES_BTN.addEventListener("click", (event) => {
    alertBtnHandler(event);
  });
  GLOBAL.DOM.ALERT_NO_BTN.addEventListener("click", (event) => {
    alertBtnHandler(event);
  });

  GLOBAL.DOM.LIST_SUB_BTN.addEventListener("click", (event) => {
    clickListSubscribe(event);
  });
}

function toggleView(mode) {
  if (mode === BTN.GRID_VIEW) {
    GLOBAL.CURRENT_MODE = MODE.GRID;
    GLOBAL.DOM.GRID_BTN.childNodes[1].src = ICON.GRID_BTN_BLUE;
    GLOBAL.DOM.GRID_VIEW.style.display = "flex";
    GLOBAL.DOM.LIST_BNT.childNodes[1].src = ICON.LIST_BTN;
    GLOBAL.DOM.LIST_VIEW.style.display = "none";
    GLOBAL.DOM.LEFT_BTN.style.display = "none";
    GLOBAL.DOM.RIGHT_BTN.style.display = "block";
    GLOBAL.GRID_CURRENT_PAGE = 0;
  } else {
    GLOBAL.CURRENT_MODE = MODE.LIST;
    GLOBAL.DOM.GRID_BTN.childNodes[1].src = ICON.GRID_BTN;
    GLOBAL.DOM.GRID_VIEW.style.display = "none";
    GLOBAL.DOM.LIST_BNT.childNodes[1].src = ICON.LIST_BTN_BLUE;
    GLOBAL.DOM.LIST_VIEW.style.display = "inline-flex";
    GLOBAL.DOM.RIGHT_BTN.style.display = "block";
    GLOBAL.DOM.LEFT_BTN.style.display = "block";
    moveListPage(0);
  }
}

function handleMoveBtn(direction) {
  if (GLOBAL.CURRENT_MODE === MODE.GRID) {
    moveGrid(direction);
    return;
  }

  if (direction === BTN.NEXT_PAGE) {
    moveListPage((GLOBAL.LIST_CURRENT_PAGE + 1) % GLOBAL.TOTAL_NEWS_NUM);
  } else {
    moveListPage(GLOBAL.LIST_CURRENT_PAGE === 0 ? GLOBAL.TOTAL_NEWS_NUM - 1 : GLOBAL.LIST_CURRENT_PAGE - 1);
  }
}

export { initDate, initBtn };
