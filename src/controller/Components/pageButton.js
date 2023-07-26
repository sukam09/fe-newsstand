import { ENTIRE, GRID, LIST } from "../../constant.js";
import { GRID_PAGE, LIST_PAGE, VIEW } from "../../model/global.js";
import { scrollMove } from "../../util/scroll.js";
import { category, news } from "../../view/list.js";
import { eachCategoryLength } from "../../view/list.js";
import { startTimer, timerId } from "../timer.js";

export const RIGHT = 1;
export const LEFT = 0;

function arrowBtnClickHandler(dir) {
  const layout = VIEW.layout;
  //그리드 뷰
  if (layout === GRID) {
    if (dir === RIGHT) {
      GRID_PAGE.setPage(GRID_PAGE.page + 1);
    } else {
      GRID_PAGE.setPage(GRID_PAGE.page - 1);
    }
  }
  //리스트뷰
  else if (layout === LIST) {
    if (VIEW.tab === ENTIRE) {
      let page = LIST_PAGE.page;
      let currentCategoryIdx = LIST_PAGE.category;

      dir === RIGHT ? page++ : page--;

      if (page > news.length - 1) {
        currentCategoryIdx++;
        if (category.length - 1 < currentCategoryIdx) {
          LIST_PAGE.setCategory(0);
        } else {
          LIST_PAGE.setCategory(currentCategoryIdx);
        }
      } else if (page < 0) {
        currentCategoryIdx--;
        if (currentCategoryIdx < 0) {
          currentCategoryIdx = eachCategoryLength.length - 1;
        }
        LIST_PAGE.setCategory(currentCategoryIdx, eachCategoryLength[currentCategoryIdx]);
      } else {
        LIST_PAGE.setPage(page);
      }
    } else {
      let currentCategoryIdx = LIST_PAGE.category;
      dir === RIGHT ? currentCategoryIdx++ : currentCategoryIdx--;
      if (currentCategoryIdx > news.length - 1) {
        currentCategoryIdx = 0;
      } else if (currentCategoryIdx < 0) {
        currentCategoryIdx = news.length - 1;
      }
      LIST_PAGE.setCategory(currentCategoryIdx);
    }
  }

  //가로 스크롤 조정
  scrollMove();

  //타이머 초기화
  timerId && clearInterval(timerId);
  startTimer();
}

export function pageButton() {
  const right_btn = document.querySelector(".right-btn");
  const left_btn = document.querySelector(".left-btn");
  right_btn.addEventListener("click", () => arrowBtnClickHandler(RIGHT));
  left_btn.addEventListener("click", () => arrowBtnClickHandler(LEFT));
}
