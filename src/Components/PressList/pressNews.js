import { ALL_ECONOMY, FIRST_NEWS_PAGE_INDEX } from "../../constant.js";
import { fetchpressNews } from "../../dataFetch.js"
import turnNewsPage from "./pageMoveButton.js";
import showNewsOfCategory from "./categoryTab.js";
import {initProgress} from "./progressBar.js";

const pressNewsList = [[], [], [], [], [], [], []];
const shuffledPressNews = [[], [], [], [], [], [], []];

/**
카테고리 별 언론사 순서 랜덤으로 섞기
 */
async function randomizeNews() {
  const pressNewsData = await fetchpressNews();
  const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문직", "지역"];

  pressNewsList.forEach((arr, idx) => {
    pressNewsList[idx] = pressNewsData.filter(press => press["category"] === category[idx]);
    shuffledPressNews[idx] = [...pressNewsList[idx]].sort(() => Math.random() - 0.5);
  })
  return category;
}

/**
뉴스 띄우기
 */
function drawPressNews(shuffledPressNews, categoryIdx, newsPage) {
  /** 언론사 로고, 편집 날짜 띄우기 */
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${shuffledPressNews[categoryIdx][newsPage]["id"]}.svg" alt="${shuffledPressNews[categoryIdx][newsPage]["name"]}">
    <span class="display-medium12 text-default">${shuffledPressNews[categoryIdx][newsPage]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `
  /**썸네일, main-title 띄우기*/
  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
    <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
    <p class="press-news-title available-medium16 text-strong">${shuffledPressNews[categoryIdx][newsPage]["mainTitle"]}</p>
  `
  /** sub-title 띄우기*/
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${shuffledPressNews[categoryIdx][newsPage]["subTitle"].map(sub => `<li class = "press-news-sub-list">${sub}</li>`).join('')}
  `
}

/**
초기값으로 첫번 째 종합/경제 뉴스 보여주기
 */
async function initNews() {
  const category = await randomizeNews();
  drawPressNews(shuffledPressNews, ALL_ECONOMY, FIRST_NEWS_PAGE_INDEX);
  initProgress(shuffledPressNews, ALL_ECONOMY, FIRST_NEWS_PAGE_INDEX);
  turnNewsPage(shuffledPressNews, ALL_ECONOMY);
  showNewsOfCategory(shuffledPressNews, category)
}

export  {initNews, drawPressNews}