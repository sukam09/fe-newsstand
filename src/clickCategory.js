import { FIRST_NEWS_PAGE } from "./constant.js";
import showNews from "./showNews.js";
import turnNewsPage from "./turnNewsPage.js";
import showProgress from "./showProgress.js";

let categoryClickEventFlag = false;
/**
 카테고리를 클릭하면 handleClickCategory함수 호출
 */
function showNewsOfCategory(shuffledPressNews, categories) {
  const $progressCategory = document.querySelectorAll('.progress-category');
  const allCategory = Array.from($progressCategory);
  if(categoryClickEventFlag === false){
    allCategory.forEach(category => {
    category.addEventListener('click', (event) => handleClickCategory(event,shuffledPressNews,categories));
    })
  }
  categoryClickEventFlag = true;
}

/**
 어떤 카테고리를 클릭했는지 확인함
 */
function handleClickCategory(event,shuffledPressNews,categories) {
  const categoryIdx = categories.findIndex(category => category === event.target.innerText)
  changeCategory(shuffledPressNews,categoryIdx)
}

/**
 클릭한 카테고리에 대해서 화면에 나타냄
 */
 function changeCategory(shuffledPressNews, categoryIdx) {
   resetNewsTurner();
   showNews(shuffledPressNews, categoryIdx, FIRST_NEWS_PAGE);
   turnNewsPage(shuffledPressNews, categoryIdx);
   showProgress(shuffledPressNews,categoryIdx);
 }

/**
 카테고리가 넘어가면 NewsTurner 리셋하기
 */
function resetNewsTurner() {
  const $newsPrevButton = document.querySelector('.press-news-left-button');
  const $newsNextButton = document.querySelector('.press-news-right-button');
  $newsPrevButton.style.display = 'none';
  $newsNextButton.style.display = 'block';
}

export default showNewsOfCategory