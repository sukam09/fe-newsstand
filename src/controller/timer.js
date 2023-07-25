import { ENTIRE } from "../constant.js";
import { LIST_PAGE, VIEW } from "../model/global.js";
import { eachCategoryLength } from "../view/list.js";
import { news } from "../view/list.js";

const PAGE_AUTO_MOVING_TIME = 20000;
const PROGRESS_TAB_WIDTH = "166";

export let timerId;

export function startTimer() {
  const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
  const progressRatioTab = progressTab.querySelector(".progress-ratio");

  //프로그래스바 width 초기화
  let currentWidth = 0;

  function fillProgressBar() {
    timerId = setInterval(() => {
      if (currentWidth >= PROGRESS_TAB_WIDTH) {
        clearInterval(timerId);
        pageChange();
      } else {
        currentWidth += PROGRESS_TAB_WIDTH / 100;
        progressRatioTab.style.width = `${currentWidth}px`;
      }
    }, PAGE_AUTO_MOVING_TIME / 100); //0.2초 단위로 이동
  }

  function resetProgressBar() {
    const progressTab = document.querySelector("main .news-list-wrap .field-tab .progress-tab");
    const progressRatioTab = progressTab.querySelector(".progress-ratio");
    progressRatioTab.style.width = "0px";
    currentWidth = 0;
  }

  function pageChange() {
    //프로그래스바 초기화
    resetProgressBar();

    //페이지 & 카테고리 변수 변경
    if (VIEW.tab === ENTIRE) {
      if (LIST_PAGE.page === eachCategoryLength[LIST_PAGE.category] - 1) {
        LIST_PAGE.setCategory((LIST_PAGE.category + 1) % eachCategoryLength.length);
      } else {
        LIST_PAGE.setPage(LIST_PAGE.page + 1);
      }
    } else {
      LIST_PAGE.setCategory((LIST_PAGE.category + 1) % news.length);
    }

    //타이머 다시 시작
    startTimer();
  }

  fillProgressBar();
}
