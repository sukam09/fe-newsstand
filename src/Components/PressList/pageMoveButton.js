import { FIRST_NEWS_PAGE_INDEX } from "../../constant.js";
import { changeCategory } from "./categoryTab.js";
import { drawPressNews } from "./pressNews.js";
import { initProgress, setProgressPage, startProgressAnimation } from "./progressBar.js";

const $newsPrevButton = document.querySelector('.press-news-left-button');
const $newsNextButton = document.querySelector('.press-news-right-button');
let newsPage = FIRST_NEWS_PAGE_INDEX;

let newsPrevBtnClickEventFlag = false;
let newsNextBtnClickEventFlag = false;
let progressEventFlagPerCategory = Array.from({ length: 7 }, () => false);
let categoryIdx = 0;

/**
페이지 넘기는 버튼의 클릭 및 animation이 반복되는지의 이벤트 핸들링,
페이지 이동 버튼 누르면 애니메이션 재시작
*/
function turnNewsPage(shuffledPressNews, categoryIndex, newsPageIndex ,progressFlag) {
  categoryIdx = categoryIndex;
  newsPage = newsPageIndex;
  showNewsTurner(shuffledPressNews, categoryIndex);

  if ((!newsPrevBtnClickEventFlag) && (!newsNextBtnClickEventFlag)) {
    $newsPrevButton.addEventListener('click', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'left')
      startProgressAnimation(shuffledPressNews, categoryIdx, newsPage)
    });
    $newsNextButton.addEventListener('click', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'right')
      startProgressAnimation(shuffledPressNews, categoryIdx, newsPage)
    });
    newsPrevBtnClickEventFlag = true;
    newsNextBtnClickEventFlag = true;
  }

  //20초마다 다음 페이지로 뉴스 넘김
  if (progressFlag === 1 && progressEventFlagPerCategory[categoryIndex] === false) {
    const $progrsesAnimation = document.querySelector('.progress');
    $progrsesAnimation.addEventListener('animationiteration', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'right')
    })
    progressEventFlagPerCategory[categoryIndex] = true;
  }
}

/**
페이지 넘기는 버튼 유무 설정
 */
function showNewsTurner(shuffledPressNews, categoryIndex) {
  $newsPrevButton.style.display = newsPage === 0 ? 'none' : 'block';
  $newsNextButton.style.display = newsPage === shuffledPressNews[categoryIndex].length - 1 ? 'none' : 'block';

}

/**
 (progressBar) 끝 페이지면 다음 페이지로 이동
 */
function moveNextCategoryOfProgress(shuffledPressNews, categoryIndex) {
  if (newsPage === shuffledPressNews[categoryIndex].length) {
    changeCategory(shuffledPressNews, (categoryIndex + 1) % 7);
  }
}


/**
 해당 페이지에 맞는 뉴스 띄우기
 */
function clickNewsTurner(shuffledPressNews, categoryIndex, whatButton) {
  whatButton === 'left' ? newsPage -= 1 : newsPage += 1;
  moveNextCategoryOfProgress(shuffledPressNews, categoryIndex, newsPage)
  showNewsTurner(shuffledPressNews, categoryIndex);
  drawPressNews(shuffledPressNews, categoryIndex, newsPage);
  setProgressPage(shuffledPressNews, categoryIndex, newsPage);
}

export { turnNewsPage }
