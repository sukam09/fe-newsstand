import { fetchData, qs } from "../../../../../utils.js";
import { category } from "./category/category.js";
import { newsBody } from "./newsBody/newsBody.js";
import { newsHeader } from "./newsHeader/newsHeader.js";

// ${newsHeader(news)}
// ${newsBody(news.data)}

export async function pressList(newsList, page) {
  return `
  <div class="news news_${page} flex_column">
    ${category(newsList)}
  </div>
  `;
}

export let listPage = 0;
const MAX_LIST_PAGE = 7;

export function showListage(page) {
  const $newsInfo = qs(`.news_${page}`);
  $newsInfo.style.display = "block";
}
export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}
export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}
