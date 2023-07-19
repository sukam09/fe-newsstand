import { drawCategory } from "./drawCategory.js";
import { drawPressInfo } from "./drawPressInfo.js";
import { drawPressNews } from "./drawPressNews.js";
import { store } from "../core/store.js";
import { FIRST_PAGE_NUM, CATEGORY } from "../constants/constants.js";
import { getPage, getTabMode } from "../core/getter.js";

async function getNewsData(current, mode) {
  try {
    const response = await fetch("../data/newsListData.json");
    const newsData = await response.json();
    const list_content = newsData.News.filter((news) =>
      mode === "all" ? news.category === current : news.name === current
    );
    return list_content;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
}

async function drawList(current, mode) {
  try {
    let list = [];

    if (!mode) {
      const _mode = document.querySelector(".main-tab-btn .clicked");
      mode = _mode.getAttribute("id");
    }
    if (!current) {
      const selected_el = document.querySelector(".category.selected .ctg");
      current = selected_el.textContent;
    }
    mode === "all" ? (list = CATEGORY) : (list = subscribedPress);

    const main_list = document.querySelector(".main-list");

    main_list.innerHTML = "";
    let list_content = await getNewsData(current, mode);

    if (getPage() <= 0 || list_content.length < getPage()) {
      const currentIndex = list.indexOf(current);
      const prevIndex = (currentIndex - 1 + list.length) % list.length;
      const nextIndex = (currentIndex + 1) % list.length;
      getPage() <= 0
        ? (current = list[prevIndex])
        : (current = list[nextIndex]);
      store.setState({ page: FIRST_PAGE_NUM });
      list_content = await getNewsData(current, mode);
      showListView(current, mode);
    } else {
      drawCategory(current, list, list_content);
      const newDiv = document.createElement("div");
      newDiv.classList.add("press-news");
      main_list.appendChild(newDiv);
      drawPressInfo(list_content, list);
      drawPressNews(list_content, mode);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleClick(e) {
  const li_target = e.target.closest("li");
  if (li_target && li_target.classList.contains("category")) {
    const current = li_target.querySelector(".ctg").textContent.trim();
    store.setState({ page: FIRST_PAGE_NUM });
    drawList(current, "");
  }
}

export function showListView(current = "", mode = "") {
  drawList(current, mode);
  document.addEventListener("click", (e) => handleClick(e));
}
