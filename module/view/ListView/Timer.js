import { updatePressNewsSection } from "./Actions/UpdateSection.js";
import { LIST_PAGE } from "../../components/Arrow.js";
import { changeCategory, changePageInfo } from "./Actions/ChangePress.js";
import { setCategory, setPage } from "./ListView.js";

const PAGE_AUTO_MOVING_TIME = 20000;
const PROGRESS_TAB_WIDTH = "166";

let timerId;

function startTimer(categoryLength, news_data, listState) {
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
    if (listState.CURRENT_PAGE === news_data[listState.CURRENT_CATEGORY].press.length) {
      setCategory(++listState.CURRENT_CATEGORY);
      setPage(0);
      LIST_PAGE.current_list_page = 0;
    }
    if (listState.CURRENT_CATEGORY === categoryLength.length) {
      setCategory(0);
      setPage(1);
      LIST_PAGE.current_list_page = 1;
    } else {
      setPage(++listState.CURRENT_PAGE);
      LIST_PAGE.current_list_page++;
    }

    //프로그래스바 정보 업데이트
    changePageInfo(listState);

    if (listState.CURRENT_PAGE === 1) {
      //카테고리 변경 후 내용 업데이트
      changeCategory(news_data, listState, categoryLength);
    } else {
      //내용 업데이트
      updatePressNewsSection(news_data, listState);
    }
    //타이머 다시 시작
    startTimer(categoryLength, news_data, listState);
  }

  fillProgressBar();
}

export { timerId, startTimer };
