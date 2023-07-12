import { fetchData } from "./utils.js";
import { news } from "./components/news/news.js";
import { category } from "./components/category/category.js";
import { startProgressAnimation } from "./components/category/progressBar.js";
import { handleClickCategoryItem } from "./components/category/categoryItem.js";

let listPage = 0;
const MAX_LIST_PAGE = 7;
const $listContainer = document.getElementById("list_container");

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

export async function initListView() {
  const newsData = await fetchData("/data/news.json");
  initCategory(newsData);
  initNews(newsData);
  showListage(0);
}

function initNews(newsData) {
  for (let i = 0; i < newsData.length; i++) {
    const category = newsData[i];

    for (let j = 0; j < category.data.length; j++) {
      // 카테고리 하나에 대한 페이지 생성
      $listContainer.insertAdjacentHTML(
        "beforeend",
        news(newsData[i].data[j], j)
      );
    }
  }
}

function initCategory(newsData) {
  console.log($listContainer);
  $listContainer.insertAdjacentHTML("afterbegin", category(newsData));
  const $categoryItemList = document.getElementsByClassName("category_item");
  console.log($categoryItemList);
  for (let i = 0; i < newsData.length; i++) {
    const $categoryItem = $categoryItemList[i];
    $categoryItem.addEventListener("click", (e) => handleClickCategoryItem(e));
  }
}
