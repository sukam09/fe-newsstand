import { fetchData } from "./utils.js";
import { news } from "./components/news/news.js";
import { category } from "./components/category/category.js";

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
  const $listContainer = document.getElementById("list_container");
  $listContainer.insertAdjacentHTML("afterbegin", category(newsData));

  for (let i = 0; i < newsData.length; i++) {
    const category = newsData[i];
    category.data.length;

    for (let j = 0; j < category.data.length; j++) {
      // 카테고리 하나에 대한 페이지 생성
      $listContainer.insertAdjacentHTML(
        "beforeend",
        news(newsData[i].data[j], j)
      );
    }
  }

  const $categoryItemList = document.getElementsByClassName("category_item");

  for (let i = 0; i < newsData.length; i++) {
    const $categoryItem = $categoryItemList[i];
    $categoryItem.addEventListener("click", (e) => {
      e.currentTarget.classList.add("clicked");
    });
  }

  showListage(0);
}
