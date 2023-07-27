import { addpress, getCurrentCategoryIndex, getPage, getPress, getSubscribedPressId, getView, removepress, setCurrentCategoryIndex, setPage, store } from "../../Store/store.js";
import { FIRST_PAGE_IDX, START_CATEGORY_IDX } from "../../constant.js";
import { PATH_SUBSCRIBE_BTN, PATH_UNSUBSCRIBE_X_BTN, PATH_TEST_THUMBNAIL } from "../../path.js";
import pressStore from "../../pressDataStore.js";
import { clickCategoryOfPressList, setCategories } from "./categoryTab.js";
import { setClickNewsTurner, setProgressEventFlag, showNewsTurner } from "./pageMoveButton.js";
import { initProgress, removeProgress } from "./progressBar.js";

const shuffledAllPress = pressStore.getShuffledAllPress
const shuffledAllPressNews = pressStore.getShuffledAllPressNews
const $pressNews = document.querySelector('.press-news');

/** 언론사 로고, 편집 날짜, 구독/해지 띄우기 */
function drawPressNewsHeader(whatPressNews) {
  const subUnsubBtnImg = store.isSubscribed(whatPressNews[getCurrentCategoryIndex()][getPage()]["id"]) === true
    ? PATH_UNSUBSCRIBE_X_BTN
    : PATH_SUBSCRIBE_BTN
  $pressNews.innerHTML = `
  <div class="press-news-info">
    <img class = "press-list-logo" data-id = "${whatPressNews[getCurrentCategoryIndex()][getPage()]["id"]}" src=${whatPressNews[getCurrentCategoryIndex()][getPage()]["lightSrc"]} alt="${whatPressNews[getCurrentCategoryIndex()][getPage()]["name"]}">
    <span class="display-medium12 text-default">${whatPressNews[getCurrentCategoryIndex()][getPage()]["editDate"]}</span>
    <img class = "sub-unsub-btn pointer" data-src=${subUnsubBtnImg} src=${subUnsubBtnImg} alt="">
  </div>
  `
}

/** 썸네일, 메인 뉴스, 서브 뉴스, 편집 권한 띄우기*/
function drawPressNewsMain(whatPressNews) {
  $pressNews.innerHTML = $pressNews.innerHTML + `
  <div class="press-news-content">
    <div class="press-news-main">
      <img class="press-news-thumbnail" src=${PATH_TEST_THUMBNAIL}>
      <p class="press-news-title available-medium16 text-strong">${whatPressNews[getCurrentCategoryIndex()][getPage()]["mainTitle"]}</p>
    </div>
    <div class="press-news-sub available-medium16 text-bold">
      ${whatPressNews[getCurrentCategoryIndex()][getPage()]["subTitle"].map(sub => `<p class = "press-news-sub-list">${sub}</p>`).join('')}
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

/** 내가 구독한 언론사가 없을 때 메시지 띄우기 */
function drawEmptyMessage() {
  $pressNews.innerHTML = `
    <div class = "no-subscribed-press-container">
      <div class = "no-subscribed-press-message">아직 구독한 언론사가 없습니다.</div>
    </div>
  `
}

/** 구독하기/해지하기 클릭 이벤트 리스너 등록 */
function clickSubUnsubBtnAtList() {
  const $subUnsubBtnAtList = document.querySelector('.sub-unsub-btn');
  $subUnsubBtnAtList.addEventListener('click', handleClickSubUnsubBtnAtList);
}

/** 구독하기/해지하기 클릭 이벤트 리스너 핸들링 */
function handleClickSubUnsubBtnAtList() {
  const $subUnsubBtnAtList = document.querySelector('.sub-unsub-btn');
  const $pressListLogo = document.querySelector('.press-list-logo');
  const currentPressId = parseInt($pressListLogo.getAttribute('data-id'));
  const subUnsubButtonSrc = $subUnsubBtnAtList.getAttribute('data-src');
  subUnsubButtonSrc === PATH_SUBSCRIBE_BTN
    ? addpress(currentPressId)
    : removepress(currentPressId)
}

/** 내가 구독한 언론사가 없을 때의 리스트 보기 초기화 */
function initNewsWhenMyPressEmpty() {
  removeProgress();
  setCategories();
  drawEmptyMessage();
  showNewsTurner();
}

/** 전체 언론사 보기 이거나 내가 구독한 언론사가 있을 때의 리스트 보기 초기화 */
function initNewsWhenAllPressOrMyPressNotEmpty() {
  getCurrentCategoryIndex() !== START_CATEGORY_IDX
    ? setCurrentCategoryIndex(START_CATEGORY_IDX) : null;
  getPage() !== FIRST_PAGE_IDX
    ? setPage(FIRST_PAGE_IDX) : null
  setCategories();
  setDrawPressNews();
  showNewsTurner();
  setProgressEventFlag();
  initProgress();
  setClickNewsTurner();
  clickCategoryOfPressList();
}

/** 전체 언론사 리스트 또는 내가 구독한 언론사가 있는 리스트인지 판단 */
function isAllPressOrMyPressNotEmpty() {
  return getPress() === 'all' || getSubscribedPressId().length !== 0
}

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
  clickSubUnsubBtnAtList();
  underlineNewsTitle();
}

/** 상황 별 언론사 리스트 화면 초기화 */
function initNews() {
  isAllPressOrMyPressNotEmpty() === true
    ? initNewsWhenAllPressOrMyPressNotEmpty()
    : initNewsWhenMyPressEmpty()
}

export { getSubscribedPressOfList, initNews, setDrawPressNews, isAllPressOrMyPressNotEmpty };
