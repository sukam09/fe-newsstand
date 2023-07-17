import { LIST_PAGE } from "../../../global.js";

const PAGE_AUTO_MOVING_TIME = 20000;
const PROGRESS_TAB_WIDTH = "166";

let timerId;

function startTimer(categoryLength, news_data) {
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
    progressRatioTab.style.width = "0px";
    currentWidth = 0;
  }

  function pageChange() {
    //프로그래스바 초기화
    resetProgressBar();

    //페이지 & 카테고리 변수 변경
    if (LIST_PAGE.CURRENT_PAGE === news_data[LIST_PAGE.CURRENT_CATEGORY].press.length) {
      LIST_PAGE.setCategory((LIST_PAGE.CURRENT_CATEGORY + 1) % categoryLength.length);
      LIST_PAGE.setPage(1);
    } else {
      LIST_PAGE.setPage(LIST_PAGE.CURRENT_PAGE + 1);
    }

    //타이머 다시 시작
    startTimer(categoryLength, news_data);
  }

  fillProgressBar();
}

export { timerId, startTimer };
