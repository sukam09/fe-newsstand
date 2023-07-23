import { START_CATEGORY_IDX, FIRST_PAGE_IDX } from "../../constant.js"
import pressStore from "../../pressDataStore.js";
import { turnNewsPage } from "./pageMoveButton.js";
import { showNewsOfCategory } from "./categoryTab.js";
import { initProgress } from "./progressBar.js";
import { getClickedCategoryIndex, getPage, setClickedCategoryIndex, setPage } from "../../store.js";

const shuffledAllPressNews = pressStore.getShuffledAllPressNews
const allPressNewsCategory = pressStore.getAllPressNewsCategory

/**
뉴스 띄우기
 */
function drawPressNews() {
  const newsPage = getPage();
  const categoryIndex = getClickedCategoryIndex();
  /** 언론사 로고, 편집 날짜 띄우기 */
  const $pressNewsInfo = document.querySelector('.press-news-info');
  $pressNewsInfo.innerHTML = `
    <img src="./assets/logo/light/img${shuffledAllPressNews[categoryIndex][newsPage]["id"]}.svg" alt="${shuffledAllPressNews[categoryIndex][newsPage]["name"]}">
    <span class="display-medium12 text-default">${shuffledAllPressNews[categoryIndex][newsPage]["editDate"]}</span>
    <img src="./assets/Icon/subscribeButton.svg" alt="">
  `
  /**썸네일, main-title 띄우기*/
  const $pressNewsMain = document.querySelector('.press-news-main');
  $pressNewsMain.innerHTML = `
  <img class="press-news-thumbnail" src="./assets/thumbnail/Thumbnail.png">
  <p class="press-news-title available-medium16 text-strong">${shuffledAllPressNews[categoryIndex][newsPage]["mainTitle"]}</p>
  `
  /** sub-title 띄우기*/
  const $pressNewsSub = document.querySelector('.press-news-sub');
  $pressNewsSub.innerHTML = `
    ${shuffledAllPressNews[categoryIndex][newsPage]["subTitle"].map(sub => `<p class = "press-news-sub-list">${sub}</p>`).join('')}
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
  setClickedCategoryIndex(START_CATEGORY_IDX);
  setPage(FIRST_PAGE_IDX);
  drawPressNews();
  const $mySubscribedPress = document.querySelector('.tab-subscribed-press');
  const $listIcon = document.querySelector('.list-button');
  $mySubscribedPress.addEventListener('click', (event) => {
    initProgress();
    drawPressNews();
  })
  $listIcon.addEventListener('click', (event) => {
    initProgress();
    drawPressNews();
  })
  turnNewsPage();
  showNewsOfCategory()
  underlineNewsTitle();
}

export { initNews, drawPressNews }