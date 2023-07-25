import { changeCategory } from "./categoryTab.js";
import { setDrawPressNews, underlineNewsTitle, getSubscribedPressOfList, clickSubUnsubBtnAtList } from "./pressNews.js";
import { setProgressPage, startProgressAnimation } from "./progressBar.js";
import pressStore from "../../pressDataStore.js";
import { getClickedCategoryIndex, getPage, getPress, getSubscribedPressId, getView, setClickedCategoryIndex, setPage } from "../../store.js";
import { PROGRESS_FLAG } from "../../constant.js";
import { getSubscribedPressOfGrid } from "../PressGrid/pressLogos.js";

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

/**
페이지 넘기는 버튼의 클릭 및 animation 반복 이벤트 핸들링,
페이지 이동 버튼 누르면 애니메이션 재시작
*/
function turnNewsPage(progressFlag) {
  const categoryIndex = getClickedCategoryIndex();
  const newsPage = getPage();
  showNewsTurner();
  setClickNewsTurner();
  setProgressNewsTurner(progressFlag);
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

/** 페이지 이동 버튼 누르며 애니메이션 재시작 */
function handleClickNewsTurner(whatButton) {
  clickNewsTurner(whatButton);
  startProgressAnimation();
}

/** (progressbar) 20초마다 다음 페이지로 뉴스 넘김 */
function setProgressNewsTurner(progressFlag) {
  if (progressFlag === PROGRESS_FLAG && progressEventFlagPerCategory[getClickedCategoryIndex()] === false) {
    const $progrsesAnimation = document.querySelector('.progress');
    $progrsesAnimation.addEventListener('animationiteration', (event) => {
      clickNewsTurner('right');
    })
    progressEventFlagPerCategory[getClickedCategoryIndex()] = true;
  }
}

/**
전체 언론사 리스트인지 내가 구독한 언론사 리스트인지에 따라 페이지 넘기는 버튼 유무 설정
 */
function showNewsTurner() {
  const MyPressNews = getSubscribedPressOfList();
  getView() === 'list' && getPress() === 'all'
    ? showNewsTurnerOfList(shuffledAllPressNews)
    : ''
  getView() === 'list' && getPress() === 'my'
    ? showNewsTurnerOfList(MyPressNews)
    : ''
}

/** 페이지 넘기는 버튼 유무 설정 */
function showNewsTurnerOfList(whatPressNews) {
  $newsPrevButton.style.display = 'block';
  $newsNextButton.style.display = 'block';
}

/**
 끝 페이지면 다음 페이지로 이동
 */
function moveNextCategory() {
  const MyPressNews = getSubscribedPressOfList();
  getView() === 'list' && getPress() === 'all'
    ? moveNextCategoryOfList(shuffledAllPressNews, allPressNewsCategory)
    : ''
  getView() === 'list' && getPress() === 'my'
    ? moveNextCategoryOfList(MyPressNews, getSubscribedPressId())
    : ''
}

function moveNextCategoryOfList(whatPressNews, category) {
  if (getPage() === whatPressNews[getClickedCategoryIndex()].length) {
    setClickedCategoryIndex((getClickedCategoryIndex() + 1) % category.length)
    changeCategory();
  }
}

/**
 해당 페이지에 맞는 뉴스 띄우기
 */
function clickNewsTurner(whatButton) {
  whatButton === 'left' ? setPage(getPage() - 1) : setPage(getPage() + 1);
  showNewsTurner();
  moveNextCategory()
  setDrawPressNews();
  setProgressPage();
  underlineNewsTitle();
  clickSubUnsubBtnAtList();
}

export { turnNewsPage, clickNewsTurner, setProgressEventFlag }
