import { VIEW } from "./LayoutBtn.js";
import { categoryLength, news_data, TimerReset } from "../view/ListView/ListView.js";
import { LIST_PAGE, GRID_PAGE } from "../../global.js";

export const RIGHT = 1;
export const LEFT = 0;

const GRID_ENTIRE_PAGE = 3;
const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");

function arrowBtnClickHandler(dir) {
  const CURRENT_VIEW = VIEW.CURRENT_VIEW_MODE;
  //그리드 뷰
  if (CURRENT_VIEW == VIEW.GRID) {
    if (dir === RIGHT) {
      GRID_PAGE.setState(GRID_PAGE.CURRENT_PAGE + 1);
    } else {
      GRID_PAGE.setState(GRID_PAGE.CURRENT_PAGE - 1);
    }
    if (GRID_PAGE.CURRENT_PAGE === 0) {
      left_btn.style.display = "none";
      right_btn.style.display = "block";
    } else if (GRID_PAGE.CURRENT_PAGE === GRID_ENTIRE_PAGE) {
      right_btn.style.display = "none";
      left_btn.style.display = "block";
    } else {
      arrowStateInit();
    }
  }
  //리스트뷰
  else if (CURRENT_VIEW == VIEW.LIST) {
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

    tabsAndTimerReset();
  }
}
export function arrowStateInit() {
  right_btn.style.display = "block";
  left_btn.style.display = "block";
}
export function BtnEventHandlerRegister() {
  right_btn.addEventListener("click", () => arrowBtnClickHandler(RIGHT));
  left_btn.addEventListener("click", () => arrowBtnClickHandler(LEFT));
}
