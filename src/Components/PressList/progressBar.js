import { FIRST_NEWS_PAGE_INDEX } from "../../constant.js";
import { _changeClass } from "../../utils.js";
import { turnNewsPage } from "./pageMoveButton.js";
import { drawPressNews } from "./pressNews.js";

const $pageInfo = document.createElement('div');

/**
 해당 카테고리를 클릭했다가 다른 카테고리를 클릭하면
 해당 카테고리는 progress 해제됨
 */
function removeProgress() {
  const $allCategoryContainer = document.querySelectorAll('.progress');
  const allCategoryContainer = Array.from($allCategoryContainer);
  allCategoryContainer.forEach(categoryContainer => {
    _changeClass(categoryContainer, 'progress', 'non-progress');
    categoryContainer.removeChild($pageInfo);
  })
}

/**
  클릭한 카테고리 progress 설정
 */
function setProgress(clickedCategory) {
  const $CategoryContainer = document.querySelector(`.press-news-bar li:nth-child(${clickedCategory + 1})`);

  _changeClass($CategoryContainer, 'non-progress', 'progress');
  $pageInfo.classList.add('progress-page');
  $CategoryContainer.appendChild($pageInfo);
}

/** 
 progressbar의 현재 페이지 업데이트
 */
function setProgressPage(shuffledPressNews, clickedCategory, newsPageIndex) {
  $pageInfo.innerHTML = `
  <div class="display-bold12 text-white-default">${newsPageIndex + 1}</div>
  <img src="./assets/Icon/division.svg">
  <div class="display-bold12 text-white-weak">${shuffledPressNews[clickedCategory].length}</div>
`
}

/**
 progressBar animation이 시작되면 알맞은 타이밍에 뉴스 페이지 넘기기
 */
function startProgressAnimation(shuffledPressNews, clickedCategory) {
  const $progrsesAnimation = document.querySelector('.progress');
  $progrsesAnimation.addEventListener('animationstart', (event) => {
    turnNewsPage(shuffledPressNews, clickedCategory, 1)
  })
}

/**
 클릭한 카테고리에 대한 progress를 보여줌
 */
function initProgress(shuffledPressNews, clickedCategory) {
  removeProgress();
  setProgress(clickedCategory);
  setProgressPage(shuffledPressNews, clickedCategory, FIRST_NEWS_PAGE_INDEX);
  startProgressAnimation(shuffledPressNews, clickedCategory);
}

export { initProgress, setProgressPage };