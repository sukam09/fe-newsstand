import { qs, qsa } from "../../../../../utils.js";
import { createNewsBody } from "./newsBody/newsBody.js";
import { createNewsHeader } from "./newsHeader/newsHeader.js";

const MAX_LIST_PAGE = 7;

// 하나의 카테고리의 하나의 페이지
export function createPressList(categoryNews, page) {
  const { categoryId } = categoryNews;
  return `
  <div class="news news_${categoryId}_${page}  flex_column">
    ${createNewsHeader(categoryNews.data[page])}
    ${createNewsBody(categoryNews.data[page])}
  </div>
  `;
}

export function showListPage(categoryId, page) {
  hideAllListPage();
  const $targetNewsPage = qs(`.news_${parseInt(categoryId)}_${page}`);
  $targetNewsPage.style.display = "block";
}

export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}

export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}

export function hideAllListPage() {
  const $newsPageList = qsa(".news");
  [...$newsPageList].forEach(($newsPage) => {
    $newsPage.style.display = "none";
  });
}

export function hideListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "none";
}
export function showListContainer() {
  const $listContainer = qs("#list_container");
  $listContainer.style.display = "block";
}
