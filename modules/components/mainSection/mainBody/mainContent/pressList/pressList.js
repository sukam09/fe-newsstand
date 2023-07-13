import { qs, qsa } from "../../../../../utils.js";
import { newsBody } from "./newsBody/newsBody.js";
import { newsHeader } from "./newsHeader/newsHeader.js";

export let listPage = 0;
const MAX_LIST_PAGE = 7;

// 하나의 카테고리의 하나의 페이지
export async function pressList(categoryNews, page) {
  console.log(categoryNews.data);
  const { categoryId } = categoryNews;
  return `
  <div class="news news_${categoryId}_${page}  flex_column">
    ${newsHeader(categoryNews.data[page])}
    ${newsBody(categoryNews.data[page])}
  </div>
  `;
}

export function showListage(categoryId, page) {
  // 모든 페이지 display none
  const $newsPageList = qsa(".news");
  [...$newsPageList].forEach(($newsPage) => {
    $newsPage.style.display = "none";
  });
  // target display block
  const $targetNewsPage = qs(`.news_${categoryId}_${page}`);
  $targetNewsPage.style.display = "block";
}
export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}
export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}
