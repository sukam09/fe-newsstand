import { PROGRESS_FLAG } from "../../constant.js";
import { _changeClass } from "../../utils.js";
import { setProgressEventFlag, turnNewsPage } from "./pageMoveButton.js";
import { setDrawPressNews } from "./pressNews.js";
import pressStore from "../../pressDataStore.js";
import { getClickedCategoryIndex, getPage, getPress, getSubscribedPressId, getView } from "../../store.js";

const shuffledAllPressNews = pressStore.getShuffledAllPressNews

const $pageInfo = document.createElement('div');

/**
 해당 카테고리를 클릭했다가 다른 카테고리를 클릭하면
 해당 카테고리는 progress 해제됨
 */
function removeProgress() {
  const $allCategoryContainer = document.querySelectorAll('.progress');
  const allCategoryContainer = Array.from($allCategoryContainer);
  allCategoryContainer.forEach(categoryContainer => {
    if (categoryContainer.classList.contains('progress')) {
      _changeClass(categoryContainer, 'progress', 'non-progress');
      _changeClass(categoryContainer, 'effect', 'pointer');
    }
    categoryContainer.removeChild($pageInfo);
  })
}

/**
  클릭한 카테고리 progress 설정
 */
function setProgress() {
  const $CategoryContainer = document.querySelector(`.press-news-bar li:nth-child(${getClickedCategoryIndex() + 1})`);
  _changeClass($CategoryContainer, 'non-progress', 'progress');
  _changeClass($CategoryContainer, 'pointer', 'effect');
  $pageInfo.classList.add('progress-page');
  $CategoryContainer.appendChild($pageInfo);
}

/** 
전체 언론사 리스트인지 내가 구독한 언론사 리스트인지에 따라 
progressbar 페이지 정보 업데이트
 */
function setProgressPage() {
  getView() === 'list' && getPress() === 'all'
    ? setProgressPageOfAllList()
    : ''
  getView() === 'list' && getPress() === 'my'
    ? setProgressPageOfMyList()
    : ''
}

/** 전체 언론사 리스트의 프로그래스바 페이지 정보 나타냄*/
function setProgressPageOfAllList() {
  $pageInfo.innerHTML = `
  <div class="display-bold12 text-white-default">${getPage() + 1}</div>
  <img src="./assets/Icon/division.svg">
  <div class="display-bold12 text-white-weak">${shuffledAllPressNews[getClickedCategoryIndex()].length}</div>
`
}

/** 내가 구독한 언론사의 프로그래스바 정보 나타냄 */
function setProgressPageOfMyList() {
  $pageInfo.innerHTML = `
  <div class="display-bold12 text-white-default"></div>
  <img src="./assets/Icon/Symbol.svg">
  <div class="display-bold12 text-white-weak"></div>
`
}

/**
 progressBar animation이 시작되면 알맞은 타이밍에 뉴스 페이지 넘기기,
 버튼으로 뉴스 페이지 넘기면 애니메이션 재시작, 뉴스 페이지 정보 유지
 */
function startProgressAnimation() {
  restartProgressAnimation();
  const $progrsesAnimation = document.querySelector('.progress');
  $progrsesAnimation.addEventListener('animationstart', (event) => {
    turnNewsPage(PROGRESS_FLAG);
  })
}

/** 애니메이션 재시작 */
function restartProgressAnimation() {
  const $effect = document.querySelector('.effect');
  $effect.classList.remove('effect');
  void $effect.offsetWidth;
  $effect.classList.add('effect');
}

/**
 클릭한 카테고리에 대한 progress를 보여줌
 */
function initProgress() {
  removeProgress();
  setProgress();
  setProgressPage();
  startProgressAnimation();
}

export { initProgress, setProgressPage, startProgressAnimation, removeProgress };