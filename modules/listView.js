import { fetchData } from "./utils.js";
import { news } from "./components/news/news.js";

let listPage = 0;
const MAX_LIST_PAGE = 7;

export function showListage(page) {
  const $newsInfo = document.getElementsByClassName(`news_${page}`)[0];
  $newsInfo.style.display = "block";
}
export function showNextListPage() {
  listPage >= MAX_LIST_PAGE ? MAX_LIST_PAGE : (listPage += 1);
}
export function showPrevListPage() {
  listPage <= 0 ? 0 : (listPage -= 1);
}

export async function initListNews() {
  const newsData = await fetchData("/data/news.json");
  const { categoryName, dataLen, data } = newsData;
  const $categoryName = document.getElementsByClassName("category_name")[0];
  const $nowPage = document.getElementsByClassName("now_page")[0];
  const $allPage = document.getElementsByClassName("all_page")[0];
  const $listContainer = document.getElementsByClassName("list_container")[0];
  // header
  $categoryName.innerHTML = categoryName;
  $nowPage.innerHTML = "1";
  $allPage.innerHTML = `/ ${newsData.dataLen}`;

  for (let i = 0; i < dataLen; i++) {
    $listContainer.insertAdjacentHTML("beforeend", news(data[i], i));
  }
  showListage(0);
}
