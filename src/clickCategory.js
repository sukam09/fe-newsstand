import showNews from "./showNews.js";
import turnNewsPage from "./turnListPage.js";

const FIRST_NEWS_PAGE = 0;

function showNewsOfCategory(shuffledPressNews, categories) {
  const $progressCategory = document.querySelectorAll('.progress-category');
  const allCategory = Array.from($progressCategory);
  allCategory.forEach(category => {
    category.addEventListener('click', (event) => handleClickCategory(event,shuffledPressNews,categories));
  })
}

function handleClickCategory(event,shuffledPressNews,categories) {
  const categoryIdx = categories.findIndex(category => category === event.target.innerText)
  changeCategory(shuffledPressNews,categoryIdx)
}

function changeCategory(shuffledPressNews, categoryIdx) {
  showNews(shuffledPressNews, categoryIdx, FIRST_NEWS_PAGE);
  turnNewsPage(shuffledPressNews, categoryIdx);
}

export default showNewsOfCategory