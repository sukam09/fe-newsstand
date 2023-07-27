import { getCurrentCategoryIndex, getPage, getPress, getSubscribedPressId, getView, setCurrentCategoryIndex, setPage } from "../../Store/store.js";
import { PROGRESS_FLAG } from "../../constant.js";
import pressStore from "../../pressDataStore.js";
import { getSubscribedPressOfList } from "../PressList/pressNews.js";
import { changeCategory } from "./categoryTab.js";
import { startProgressAnimation } from "./progressBar.js";

const shuffledAllPressNews = pressStore.getShuffledAllPressNews
const allPressNewsCategory = pressStore.getAllPressNewsCategory

const $newsPrevButton = document.querySelector('.press-news-left-button');
const $newsNextButton = document.querySelector('.press-news-right-button');

let newsPrevBtnClickEventFlag = false;
let newsNextBtnClickEventFlag = false;
let progressEventFlagPerCategory = null;

/** 
 전체 언론사 리스트, 내가 구독한 언론사 리스트인지에 따라 
 카테고리 이벤트 플래그 설정 */
function setProgressEventFlag() {
  getView() === 'list' && getPress() === 'all'
    ? setProgressEventFlagOfCategory(allPressNewsCategory.length)
    : ''
  getView() === 'list' && getPress() === 'my'
    ? setProgressEventFlagOfCategory(getSubscribedPressId().length)
    : ''

}

/** 카테고리의 이벤트 플래그 설정 */
function setProgressEventFlagOfCategory(categoryLength) {
  progressEventFlagPerCategory = Array.from({ length: categoryLength }, () => false);
}

/** 페이지 넘기는 버튼의 이벤트 핸들링 */
function setClickNewsTurner() {
  if ((!newsPrevBtnClickEventFlag) && (!newsNextBtnClickEventFlag)) {
    $newsPrevButton.addEventListener('click', (event) => handleClickNewsTurner('left'));
    $newsNextButton.addEventListener('click', (event) => handleClickNewsTurner('right'));
    newsPrevBtnClickEventFlag = true;
    newsNextBtnClickEventFlag = true;
  }
}

/** 페이지 이동 버튼 누르면 애니메이션 재시작 */
function handleClickNewsTurner(whatButton) {
  clickNewsTurner(whatButton);
  startProgressAnimation();
}

/** (progressbar) 20초마다 다음 페이지로 뉴스 넘김 */
function setProgressNewsTurner(progressFlag) {
  if (progressFlag === PROGRESS_FLAG && progressEventFlagPerCategory[getCurrentCategoryIndex()] === false) {
    const $progrsesAnimation = document.querySelector('.progress');
    $progrsesAnimation.addEventListener('animationiteration', (event) => {
      clickNewsTurner('right');
    })
    progressEventFlagPerCategory[getCurrentCategoryIndex()] = true;
  }
}

/** 페이지 넘기는 버튼 유무 설정 */
function showNewsTurner(whatPressNews) {
  $newsPrevButton.style.display = 'block';
  $newsNextButton.style.display = 'block';
}

/** 페이지 이동에 따른 카테고리 설정 */
function setNextCategory() {
  const MyPressNews = getSubscribedPressOfList();
  if (getView() === 'list' && getPress() === 'all') {
    moveNextCategoryOfList(shuffledAllPressNews, allPressNewsCategory)
    movePrevCategoryOfList(shuffledAllPressNews, allPressNewsCategory)
  }
  else if (getView() === 'list' && getPress() === 'my') {
    moveNextCategoryOfList(MyPressNews, getSubscribedPressId());
    movePrevCategoryOfList(MyPressNews, getSubscribedPressId())
  }
}

/** 다음 카테고리 이동 */
function moveNextCategoryOfList(whatPressNews, category) {
  if (getPage() === whatPressNews[getCurrentCategoryIndex()].length) {
    setCurrentCategoryIndex((getCurrentCategoryIndex() + 1) % category.length)
    setPage(0);
  }
}

/** 이전 카테고리 이동 */
function movePrevCategoryOfList(whatPressNews, category) {
  if (getPage() === -1) {
    if (getCurrentCategoryIndex() === 0) setCurrentCategoryIndex(category.length - 1)
    else setCurrentCategoryIndex((getCurrentCategoryIndex() - 1))
    setPage(whatPressNews[getCurrentCategoryIndex()].length - 1)
  }
}

/** 페이지 이동 */
function setNextPage(whatButton) {
  whatButton === 'left' ? setPage(getPage() - 1) : setPage(getPage() + 1);
}

/**
 해당 페이지와 카테고리 맞는 뉴스 띄우기
 */
function clickNewsTurner(whatButton) {
  setNextPage(whatButton);
}

/** 리스트뷰의 페이지 이동에 따른 카테고리 설정/띄우기 */
function drawNextPrevListPage() {
  setNextCategory();
  changeCategory();
}

export { drawNextPrevListPage, setClickNewsTurner, setProgressEventFlag, setProgressNewsTurner, showNewsTurner };

