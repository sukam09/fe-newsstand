import { moveGrid } from "./grid.js";
import { ICON, MODE, BTN, GLOBAL, CATEGORY } from "./variable.js";
import { moveListPage, movePageFromEvent } from "./list.js";

// 날짜 관련 함수
function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  GLOBAL.DOM.today.innerHTML = todaystr;
}

// 버튼 관련 함수
function initBtn() {
  GLOBAL.DOM.right_btn.addEventListener("click", () => handleMoveBtn(BTN.NEXT_PAGE));
  GLOBAL.DOM.left_btn.addEventListener("click", () => handleMoveBtn(BTN.PREV_PAGE));

  GLOBAL.DOM.list_btn.addEventListener("click", () => {
    toggleView(BTN.LIST_VIEW);
  });
  GLOBAL.DOM.grid_btn.addEventListener("click", () => {
    toggleView(BTN.GRID_VIEW);
  });

  GLOBAL.DOM.field_tab.addEventListener("click", (event) => {
    movePageFromEvent(event);
  });

  GLOBAL.DOM.field_tab.addEventListener("animationiteration", () => {
    moveListPage((GLOBAL.list_cur_page + 1) % GLOBAL.total_news_num);
  });
}

function toggleView(mode) {
  if (mode === BTN.GRID_VIEW) {
    GLOBAL.cur_mode = MODE.GRID;
    GLOBAL.DOM.grid_btn.childNodes[1].src = ICON.GRID_BTN_BLUE;
    GLOBAL.DOM.grid_view.style.display = "flex";
    GLOBAL.DOM.list_btn.childNodes[1].src = ICON.LIST_BTN;
    GLOBAL.DOM.list_view.style.display = "none";
    GLOBAL.DOM.left_btn.style.display = "none";
    GLOBAL.DOM.right_btn.style.display = "block";
    GLOBAL.grid_cur_page = 0;
  } else {
    GLOBAL.cur_mode = MODE.LIST;
    GLOBAL.DOM.grid_btn.childNodes[1].src = ICON.GRID_BTN;
    GLOBAL.DOM.grid_view.style.display = "none";
    GLOBAL.DOM.list_btn.childNodes[1].src = ICON.LIST_BTN_BLUE;
    GLOBAL.DOM.list_view.style.display = "inline-flex";
    GLOBAL.DOM.right_btn.style.display = "block";
    GLOBAL.DOM.left_btn.style.display = "block";
    GLOBAL.list_cur_category = CATEGORY.ECONOMY;
    GLOBAL.list_cur_page = 0;
    moveListPage(GLOBAL.list_cur_page);
  }
}

function handleMoveBtn(dir) {
  if (GLOBAL.cur_mode === MODE.GRID) {
    moveGrid(dir);
    return;
  }

  if (dir === BTN.NEXT_PAGE) {
    moveListPage((GLOBAL.list_cur_page + 1) % GLOBAL.total_news_num);
  } else {
    moveListPage(GLOBAL.list_cur_page === 0 ? GLOBAL.total_news_num - 1 : GLOBAL.list_cur_page - 1);
  }
}

export { initDate, initBtn };
