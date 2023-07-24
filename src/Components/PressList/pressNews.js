import { START_CATEGORY_IDX, FIRST_PAGE_IDX } from "../../constant.js"
import pressStore from "../../pressDataStore.js";
import { turnNewsPage, setProgressEventFlag } from "./pageMoveButton.js";
import { setCategory, showNewsOfCategory } from "./categoryTab.js";
import { initProgress, removeProgress } from "./progressBar.js";
import { getClickedCategoryIndex, getPage, getPress, getView, setClickedCategoryIndex, setPage, getSubscribedPressId, removepress } from "../../store.js";

const shuffledAllPress = pressStore.getShuffledAllPress
const shuffledAllPressNews = pressStore.getShuffledAllPressNews
const $pressNews = document.querySelector('.press-news');

/**
전체 언론사 리스트보기, 내가 구독한 언론사 리스트보기에 따라 뉴스 띄우기
 */
function setDrawPressNews() {
  const myPressNews = getSubscribedPressOfList();
  getView() === 'list' && getPress() === 'all'
    ? drawPressNews(shuffledAllPressNews)
    : ''
  getView() === 'list' && getPress() === 'my' && getSubscribedPressId().length !== 0
    ? drawPressNews(myPressNews)
    : ''
}

/** 뉴스 띄우기 */
function drawPressNews(whatPressNews) {
  drawPressNewsHeader(whatPressNews);
  drawPressNewsMain(whatPressNews);
}

/** 언론사 로고, 편집 날짜 띄우기 */
function drawPressNewsHeader(whatPressNews) {
  $pressNews.innerHTML = `
  <div class="press-news-info">
    <img src="./assets/logo/light/img${whatPressNews[getClickedCategoryIndex()][getPage()]["id"]}.svg" alt="${whatPressNews[getClickedCategoryIndex()][getPage()]["name"]}">
    <span class="display-medium12 text-default">${whatPressNews[getClickedCategoryIndex()][getPage()]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  </div>
  `
}

/** 썸네일, 메인 뉴스, 서브 뉴스, 편집 권한 띄우기*/
function drawPressNewsMain(whatPressNews) {
  $pressNews.innerHTML = $pressNews.innerHTML + `
  <div class="press-news-content">
    <div class="press-news-main">
      <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
      <p class="press-news-title available-medium16 text-strong">${whatPressNews[getClickedCategoryIndex()][getPage()]["mainTitle"]}</p>
    </div>
    <div class="press-news-sub available-medium16 text-bold">
      ${whatPressNews[getClickedCategoryIndex()][getPage()]["subTitle"].map(sub => `<p class = "press-news-sub-list">${sub}</p>`).join('')}
      <p class = "text-weak display-medium14"> 편집 권한에 대한 문구</p>
    </div>
  </div>
  `
}

/**
 썸네일에 마우스 올리면 메인 제목에 밑줄
 */
function underlineNewsTitle() {
  const $newsThumbnail = document.querySelector('.press-news-thumbnail');
  $newsThumbnail.addEventListener('mouseenter', () => handlerHoverNewsTitle('underline'));
  $newsThumbnail.addEventListener('mouseleave', () => handlerHoverNewsTitle('none'));
}

/** 메인 제목에 밑줄 */
function handlerHoverNewsTitle(whatStyle) {
  const $newsMainTitle = document.querySelector('.press-news-title');
  $newsMainTitle.style.textDecoration = `${whatStyle}`;
}

/**  내가 구독한 언론사에 대한 정보 받아오기 */
function getSubscribedPressOfList() {
  const myPressTmp = shuffledAllPress.filter(press => getSubscribedPressId().includes(press.id))
  const myPress = myPressTmp.map(press => [press]);
  return myPress
}

function drawEmptyMessage() {
  $pressNews.innerHTML = `
    <div class = "no-subscribed-press-container">
      <div class = "no-subscribed-press-message">아직 구독한 언론사가 없습니다.</div>
    </div>
  `
}

/**
초기값으로 첫번 째 종합/경제 뉴스 보여주기
 */
async function initNews() {
  if (getPress() === 'all' || getSubscribedPressId().length !== 0) {
    setClickedCategoryIndex(START_CATEGORY_IDX);
    setPage(FIRST_PAGE_IDX);
    setCategory();
    setDrawPressNews();
    setProgressEventFlag();
    initProgress();
    showNewsOfCategory()
    underlineNewsTitle();
  }
  else {
    removeProgress();
    setCategory();
    drawEmptyMessage()
  }
}

export { initNews, setDrawPressNews, underlineNewsTitle, getSubscribedPressOfList }