import { fetchData, qs } from "../../../../../utils.js";
import { category } from "./category/category.js";
import { newsBody } from "./newsBody/newsBody.js";
import { newsHeader } from "./newsHeader/newsHeader.js";

// ${newsHeader(news)}
// ${newsBody(news.data)}

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

export let listPage = 0;
const MAX_LIST_PAGE = 7;

export function showListage(categoryId, page) {
  const $newsInfo = qs(`.news_${categoryId}_${page}`);
  $newsInfo.style.display = "block";
}
export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}
export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}
