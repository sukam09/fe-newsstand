import { FIRST_NEWS_PAGE_INDEX } from "../../constant.js";
import { drawPressNews } from "./pressNews.js";
import { turnNewsPage } from "./pageMoveButton.js";
import { initProgress } from "./progressBar.js";
import pressStore from "../../pressDataStore.js";
import { setClickedCategoryIndex, setPage } from "../../store.js";
import { _changeDispay } from "../../utils.js";

const shuffledAllPressNews = pressStore.getShuffledAllPressNews
const shuffledAllPressNewsCategory = pressStore.getShuffledAllPressNewsCategory

let categoryClickEventFlag = Array.from({ length: shuffledAllPressNewsCategory.length }, () => false);

/**
 카테고리를 클릭하면 handleClickCategory함수 호출
 */
function showNewsOfCategory() {
  const $progressCategory = document.querySelectorAll('.progress-category');
  const allCategory = Array.from($progressCategory);
  allCategory.forEach((category, idx) => {
    if (categoryClickEventFlag[idx] === false) {
      category.addEventListener('click', (event) => {
        handleClickCategory(event)
      });
      categoryClickEventFlag[idx] = true;
    }
  })
}

/**
 어떤 카테고리를 클릭했는지 확인함
 */
function handleClickCategory(event) {
  const categoryIndex = shuffledAllPressNewsCategory.findIndex(category => category === event.target.innerText)
  setClickedCategoryIndex(categoryIndex);
  changeCategory()
}

/**
 클릭한 카테고리에 대해서 화면에 나타냄
 */
function changeCategory() {
  setPage(0)
  resetNewsTurner();
  drawPressNews();
  turnNewsPage();
  initProgress();
}

/**
 카테고리가 넘어가면 NewsTurner 리셋하기
 */
function resetNewsTurner() {
  const $newsPrevButton = document.querySelector('.press-news-left-button');
  const $newsNextButton = document.querySelector('.press-news-right-button');
  _changeDispay($newsPrevButton, 'none', $newsNextButton, 'block');
}

export { showNewsOfCategory, changeCategory }