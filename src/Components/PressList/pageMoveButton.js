import { FIRST_NEWS_PAGE_INDEX } from "../../constant.js";
import { changeCategory } from "./categoryTab.js";
import { drawPressNews } from "./pressNews.js";
import { initProgress, setProgressPage } from "./progressBar.js";

const $newsPrevButton = document.querySelector('.press-news-left-button');
const $newsNextButton = document.querySelector('.press-news-right-button');
let newsPage = null;

let newsPrevBtnClickEventFlag = false;
let newsNextBtnClickEventFlag = false;
let progressEventFlagPerCategory = Array.from({ length: 7 }, () => false);
let categoryIdx = 0;

/**
페이지 넘기는 버튼의 클릭 및 animation이 반복되는지의 이벤트 핸들링
*/
function turnNewsPage(shuffledPressNews, categoryIndex, progressFlag) {
  categoryIdx = categoryIndex;
  newsPage = FIRST_NEWS_PAGE_INDEX;

  if ((!newsPrevBtnClickEventFlag) && (!newsNextBtnClickEventFlag)) {
    $newsPrevButton.addEventListener('click', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'left')
    });
    $newsNextButton.addEventListener('click', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'right')
    });
    newsPrevBtnClickEventFlag = true;
    newsNextBtnClickEventFlag = true;
  }

  //20초마다 다음 페이지로 뉴스 넘김
  if (progressFlag === 1 && progressEventFlagPerCategory[categoryIndex] === false) {
    const $progrsesAnimation = document.querySelector('.progress');
    $progrsesAnimation.addEventListener('animationiteration', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIndex, 'right')
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
  showNewsTurner(shuffledPressNews, categoryIndex);
  moveNextCategoryOfProgress(shuffledPressNews, categoryIndex, newsPage)
  drawPressNews(shuffledPressNews, categoryIndex, newsPage);
  setProgressPage(shuffledPressNews, categoryIndex, newsPage);
}

export { turnNewsPage, clickNewsTurner }
