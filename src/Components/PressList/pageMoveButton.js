import { changeCategory } from "./categoryTab.js";
import { drawPressNews } from "./pressNews.js";
import { setProgressPage, startProgressAnimation } from "./progressBar.js";
import pressStore from "../../pressDataStore.js";
import { getClickedCategoryIndex, getPage, setClickedCategoryIndex, setPage } from "../../store.js";
import { PROGRESS_FLAG } from "../../constant.js";

const shuffledAllPressNews = pressStore.getShuffledAllPressNews
const allPressNewsCategory = pressStore.getAllPressNewsCategory

const $newsPrevButton = document.querySelector('.press-news-left-button');
const $newsNextButton = document.querySelector('.press-news-right-button');

let newsPrevBtnClickEventFlag = false;
let newsNextBtnClickEventFlag = false;
let progressEventFlagPerCategory = Array.from({ length: allPressNewsCategory.length }, () => false);

/**
페이지 넘기는 버튼의 클릭 및 animation이 반복되는지의 이벤트 핸들링,
페이지 이동 버튼 누르면 애니메이션 재시작
*/
function turnNewsPage(progressFlag) {
  const categoryIndex = getClickedCategoryIndex();
  const newsPage = getPage();
  showNewsTurner();

  if ((!newsPrevBtnClickEventFlag) && (!newsNextBtnClickEventFlag)) {
    $newsPrevButton.addEventListener('click', (event) => {
      clickNewsTurner('left')
      startProgressAnimation()
    });
    $newsNextButton.addEventListener('click', (event) => {
      clickNewsTurner('right')
      startProgressAnimation()
    });
    newsPrevBtnClickEventFlag = true;
    newsNextBtnClickEventFlag = true;
  }

  //20초마다 다음 페이지로 뉴스 넘김
  if (progressFlag === PROGRESS_FLAG && progressEventFlagPerCategory[getClickedCategoryIndex()] === false) {
    const $progrsesAnimation = document.querySelector('.progress');
    $progrsesAnimation.addEventListener('animationiteration', (event) => {
      clickNewsTurner('right')
    })
    progressEventFlagPerCategory[getClickedCategoryIndex()] = true;
  }
}

/**
페이지 넘기는 버튼 유무 설정
 */
function showNewsTurner() {
  $newsPrevButton.style.display = getPage() === 0 ? 'none' : 'block';
  $newsNextButton.style.display = getPage() === shuffledAllPressNews[getClickedCategoryIndex()].length - 1 ? 'none' : 'block';
}

/**
 (progressBar) 끝 페이지면 다음 페이지로 이동
 */
function moveNextCategoryOfProgress() {
  if (getPage() === shuffledAllPressNews[getClickedCategoryIndex()].length) {
    setClickedCategoryIndex((getClickedCategoryIndex() + 1) % allPressNewsCategory.length)
    changeCategory();
  }
}


/**
 해당 페이지에 맞는 뉴스 띄우기
 */
function clickNewsTurner(whatButton) {
  whatButton === 'left' ? setPage(getPage() - 1) : setPage(getPage() + 1);
  moveNextCategoryOfProgress()
  showNewsTurner();
  drawPressNews();
  setProgressPage();
}

export { turnNewsPage }
