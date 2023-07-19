import { GRID, LIST } from "./LayoutBtn.js";
import { categoryLength, news_data, TimerReset } from "../view/ListView/ListView.js";
import { LIST_PAGE, GRID_PAGE, SUBSCRIBE } from "../../global.js";
import { store } from "../../store.js";
import { VIEW_MODE } from "../../global.js";

export const RIGHT = 1;
export const LEFT = 0;
const GRID_ENTIRE_PAGE = 3;
const PRESS_CNT_PER_PAGE = 24;
const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

function arrowBtnClickHandler(dir) {
  const CURRENT_VIEW = VIEW_MODE.CURRENT_LAYOUT;

  //그리드 뷰
  if (CURRENT_VIEW === GRID) {
    if (dir === RIGHT) {
      GRID_PAGE.setState(GRID_PAGE.CURRENT_PAGE + 1);
    } else {
      GRID_PAGE.setState(GRID_PAGE.CURRENT_PAGE - 1);
    }
    arrowStateInit();
  }
  //리스트뷰
  else if (CURRENT_VIEW === LIST) {
    if (dir === RIGHT) {
      if (LIST_PAGE.CURRENT_PAGE === news_data[LIST_PAGE.CURRENT_CATEGORY].press.length) {
        LIST_PAGE.setCategory((LIST_PAGE.CURRENT_CATEGORY + 1) % categoryLength.length);
        LIST_PAGE.setPage(1);
      } else {
        LIST_PAGE.setPage(LIST_PAGE.CURRENT_PAGE + 1);
      }
    } else {
      if (LIST_PAGE.CURRENT_PAGE === 1) {
        if (LIST_PAGE.CURRENT_CATEGORY === 0) {
          LIST_PAGE.setCategory(categoryLength.length - 1);
        } else {
          LIST_PAGE.setCategory(LIST_PAGE.CURRENT_CATEGORY - 1);
        }
        LIST_PAGE.setPage(categoryLength[LIST_PAGE.CURRENT_CATEGORY]);
      } else {
        LIST_PAGE.setPage(LIST_PAGE.CURRENT_PAGE - 1);
      }
    }

    TimerReset();
  }
}
export function arrowStateInit() {
  const CURRENT_VIEW = VIEW_MODE.CURRENT_LAYOUT;
  const SUBSCRIBE_PRESS_CNT = store.getSubscribe().length;
  const PAGE_LENGTH = VIEW_MODE.CURRENT_TAB === SUBSCRIBE ? Math.floor(SUBSCRIBE_PRESS_CNT / PRESS_CNT_PER_PAGE) : GRID_ENTIRE_PAGE;

  if (CURRENT_VIEW == GRID) {
    if (GRID_PAGE.CURRENT_PAGE === 0) {
      left_btn.style.display = "none";
      right_btn.style.display = PAGE_LENGTH === 0 ? "none" : "block";
    } else if (GRID_PAGE.CURRENT_PAGE === PAGE_LENGTH) {
      right_btn.style.display = "none";
      left_btn.style.display = "block";
    } else {
      left_btn.style.display = "block";
      right_btn.style.display = "block";
    }
  } else {
    //리스트뷰는 양쪽 모두 block
    left_btn.style.display = "block";
    right_btn.style.display = "block";
  }
}
export function BtnEventHandlerRegister() {
  right_btn.addEventListener("click", () => arrowBtnClickHandler(RIGHT));
  left_btn.addEventListener("click", () => arrowBtnClickHandler(LEFT));
}
