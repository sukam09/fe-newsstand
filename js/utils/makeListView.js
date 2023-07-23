import { drawCategory } from "./drawCategory.js";
import { drawPressInfo } from "./drawPressInfo.js";
import { drawPressNews } from "./drawPressNews.js";
import { store } from "../core/store.js";
import { FIRST_PAGE_NUM, CATEGORY } from "../constants/constants.js";
import { getPage, getTabMode, getSubscribedPress } from "../core/getter.js";
import { getData } from "../core/api.js";
import { checkPage } from "./checkPage.js";

async function drawList(current) {
  try {
    let list = [];
    if (!current) {
      const selected_el = document.querySelector(".category.selected .ctg");
      current = selected_el.textContent;
      console.log(current);
    }
    getTabMode() === "all"
      ? (list = CATEGORY)
      : (list = getSubscribedPress().map((item) => item.name));

    const main_list = document.querySelector(".main-list");
    main_list.innerHTML = "";
    const data = await getData("newsListData");
    let list_content = data.News.filter((news) =>
      getTabMode() === "all" ? news.category === current : news.name === current
    );
    if (getPage() <= 0 || list_content.length < getPage()) {
      const currentIndex = list.indexOf(current);
      const prevIndex = (currentIndex - 1 + list.length) % list.length;
      const nextIndex = (currentIndex + 1) % list.length;
      getPage() <= 0
        ? (current = list[prevIndex])
        : (current = list[nextIndex]);
      store.setState({ page: FIRST_PAGE_NUM });
      list_content = data.News.filter((news) =>
        getTabMode() === "all"
          ? news.category === current
          : news.name === current
      ); //함수로 빼기
      showListView(current);
    } else {
      drawCategory(current, list, list_content);
      const newDiv = document.createElement("div");
      newDiv.classList.add("press-news");
      main_list.appendChild(newDiv);
      drawPressInfo(list_content, list);
      drawPressNews(list_content);
    }
    checkPage();
  } catch (error) {
    console.log(error);
  }
}

function handleClick(e) {
  const li_target = e.target.closest("li");
  if (li_target && li_target.classList.contains("category")) {
    const current = li_target.querySelector(".ctg").textContent.trim();
    store.setState({ page: FIRST_PAGE_NUM });
    drawList(current);
  }
}

export function showListView(current = "") {
  drawList(current);
  document.addEventListener("click", (e) => handleClick(e));
}
