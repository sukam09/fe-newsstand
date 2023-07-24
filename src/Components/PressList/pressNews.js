import { START_CATEGORY_IDX, FIRST_PAGE_IDX } from "../../constant.js"
import pressStore from "../../pressDataStore.js";
import { turnNewsPage } from "./pageMoveButton.js";
import { setCategory, showNewsOfCategory } from "./categoryTab.js";
import { initProgress } from "./progressBar.js";
import { getClickedCategoryIndex, getPage, getPress, getView, setClickedCategoryIndex, setPage } from "../../store.js";
import { getSubscribedPress } from "../PressGrid/pressLogos.js";

const shuffledAllPressNews = pressStore.getShuffledAllPressNews

/**
뉴스 띄우기
 */

function drawPressNews() {
  if (getView() === 'list' && getPress() === 'all') {
    drawAllPressNews();
  }
  else if (getView() === 'list' && getPress() === 'my') {
    drawMyPressNews();
  }
}

function drawAllPressNews() {
  drawAllPressNewsHeader();
  drawAllPressNewsMain();
  drawAllPressNewsSub();
  drawAllPressNewsEdit();
}

function drawMyPressNews() {
  const myPressNews = getSubscribedPress();
  drawMyPressNewsHeader(myPressNews);
  drawMyPressNewsMain(myPressNews);
  drawMyPressNewsSub(myPressNews);
  drawMyPressNewsEdit();
}

/** 내가 구독한 언론사의 언론사 로고, 편집 날짜 띄우기 */
function drawMyPressNewsHeader(myPressNews) {
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${myPressNews[getClickedCategoryIndex()]["id"]}.svg" alt="${myPressNews[getClickedCategoryIndex()]["name"]}">
    <span class="display-medium12 text-default">${myPressNews[getClickedCategoryIndex()]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `
}

/** 내가 구독한 언론사의 썸네일, main-title 띄우기*/
function drawMyPressNewsMain(myPressNews) {
  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
  <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
  <p class="press-news-title available-medium16 text-strong">${myPressNews[getClickedCategoryIndex()]["mainTitle"]}</p>
  `
}

/** 내가 구독한 언론사의 sub-title 띄우기*/
function drawMyPressNewsSub(myPressNews) {
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${myPressNews[getClickedCategoryIndex()]["subTitle"].map(sub => `<p class = "press-news-sub-list">${sub}</p>`).join('')}
  `
}

/** 내가 구독한 언론사의 편집권 안내문구 띄우기 */
function drawMyPressNewsEdit() {
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML += `<p class = "text-weak display-medium14"> 편집 권한에 대한 문구</p>`

}

/** 언론사 로고, 편집 날짜 띄우기 */
function drawAllPressNewsHeader() {
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${shuffledAllPressNews[getClickedCategoryIndex()][getPage()]["id"]}.svg" alt="${shuffledAllPressNews[getClickedCategoryIndex()][getPage()]["name"]}">
    <span class="display-medium12 text-default">${shuffledAllPressNews[getClickedCategoryIndex()][getPage()]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `
}

/**썸네일, main-title 띄우기*/
function drawAllPressNewsMain() {
  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
  <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
  <p class="press-news-title available-medium16 text-strong">${shuffledAllPressNews[getClickedCategoryIndex()][getPage()]["mainTitle"]}</p>
  `
}

/** sub-title 띄우기*/
function drawAllPressNewsSub() {
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${shuffledAllPressNews[getClickedCategoryIndex()][getPage()]["subTitle"].map(sub => `<p class = "press-news-sub-list">${sub}</p>`).join('')}
  `
}

/** 편집권 안내문구 띄우기 */
function drawAllPressNewsEdit() {
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML += `<p class = "text-weak display-medium14"> 편집 권한에 대한 문구</p>`

}

/**
 썸네일에 마우스 올리면 메인 제목에 밑줄
 */
function underlineNewsTitle() {
  const $newsThumbnail = document.querySelector('.press-news-thumbnail');
  $newsThumbnail.addEventListener('mouseenter', () => handlerHoverNewsTitle('underline'));
  $newsThumbnail.addEventListener('mouseleave', () => handlerHoverNewsTitle('none'));
}

function handlerHoverNewsTitle(whatStyle) {
  const $newsMainTitle = document.querySelector('.press-news-title');
  $newsMainTitle.style.textDecoration = `${whatStyle}`;
}

/**
초기값으로 첫번 째 종합/경제 뉴스 보여주기
 */
async function initNews() {
  setClickedCategoryIndex(START_CATEGORY_IDX);
  setPage(FIRST_PAGE_IDX);
  setCategory();
  drawPressNews();
  initProgress();
  showNewsOfCategory()
  underlineNewsTitle();
}

export { initNews, drawPressNews, underlineNewsTitle }