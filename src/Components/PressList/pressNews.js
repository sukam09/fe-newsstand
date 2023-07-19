import { START_CATEGORY_IDX, FIRST_NEWS_PAGE_INDEX } from "../../constant.js";
import { fetchpressNews } from "../../dataFetch.js"
import { turnNewsPage } from "./pageMoveButton.js";
import { showNewsOfCategory } from "./categoryTab.js";
import { initProgress } from "./progressBar.js";

/**
카테고리 별 언론사 순서 랜덤으로 섞기
 */
async function randomizeNews() {
  const pressNewsData = await fetchpressNews();
  const categories = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문직", "지역"];

  const pressNewsList = categories.map(category => (
    pressNewsData.filter(press => press["category"] === category)));

  const shuffledPressNews = pressNewsList.map(newsList => (
    [...newsList].sort(() => Math.random() - 0.5)));

  return { categories, shuffledPressNews };
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
    ${shuffledPressNews[categoryIdx][newsPage]["subTitle"].map(sub => `<p class = "press-news-sub-list">${sub}</p>`).join('')}
  `

  /** 편집권 안내문구 띄우기 */
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
  const $listIcon = document.querySelector('.list-button');
  const newsInfo = await randomizeNews();
  const shuffledPressNews = newsInfo.shuffledPressNews;
  const categories = newsInfo.categories;

  drawPressNews(shuffledPressNews, START_CATEGORY_IDX, FIRST_NEWS_PAGE_INDEX);
  $listIcon.addEventListener('click', (event) => {
    initProgress(shuffledPressNews, START_CATEGORY_IDX, FIRST_NEWS_PAGE_INDEX);
    drawPressNews(shuffledPressNews, START_CATEGORY_IDX, FIRST_NEWS_PAGE_INDEX);
  })
  turnNewsPage(shuffledPressNews, START_CATEGORY_IDX, FIRST_NEWS_PAGE_INDEX);
  showNewsOfCategory(shuffledPressNews, categories)
  underlineNewsTitle();
}

export { initNews, drawPressNews }