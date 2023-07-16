import handleClickLogo from "./clickTitleLogo.js";
import { FIRST_NEWS_PAGE } from "./constant.js";
import showNews from "./showNews.js";

const $newsPrevButton = document.querySelector('.press-news-left-button');
const $newsNextButton = document.querySelector('.press-news-right-button');
let newsPage = FIRST_NEWS_PAGE;

let newsPrevBtnClickEventFlag = false;
let newsNextBtnClickEventFlag = false;
let categoryIdx = 0;

/**
페이지 넘기는 버튼의 클릭 이벤트 핸들링
*/
function turnNewsPage(shuffledPressNews, categoryIndex) {
  categoryIdx = categoryIndex;
  newsPage = FIRST_NEWS_PAGE;

  if ((!newsPrevBtnClickEventFlag) && (!newsNextBtnClickEventFlag)) {
    $newsPrevButton.addEventListener('click', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'left')
    });
    $newsNextButton.addEventListener('click', (event) => {
      clickNewsTurner(shuffledPressNews, categoryIdx, 'right')
    });
  }
  newsPrevBtnClickEventFlag = true;
  newsNextBtnClickEventFlag = true;
}

/**
페이지 넘기는 버튼 유무 설정
 */
function showNewsTurner(shuffledPressNews, categoryIndex) {
  $newsPrevButton.style.display = newsPage !== 0 ? 'block' : 'none';
  $newsNextButton.style.display = newsPage === shuffledPressNews[categoryIndex].length - 1 ? 'none' : 'block';
}

/**
 해당 페이지에 맞는 뉴스 띄우기
 */
function clickNewsTurner(shuffledPressNews, categoryIndex, whatButton) {
  whatButton === 'left' ? newsPage-- : newsPage++;
  showNewsTurner(shuffledPressNews, categoryIndex);
  showNews(shuffledPressNews, categoryIndex, newsPage);
}

export default turnNewsPage
