import { drawCategory } from "./drawCategory.js";
import { drawPressInfo } from "./drawPressInfo.js";
import { drawPressNews } from "./drawPressNews.js";
import { CATEGORY } from "../constants/constants.js";
import { resetPage } from "../sections/mainView.js";

async function getNewsData(category, mode) {
  try {
    const response = await fetch("../data/newsListData.json");
    const newsData = await response.json();
    const category_news = newsData.News.filter(
      (news) => news.category === category
    );
    return category_news;
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
}

async function drawList(order, category, subscribedPress, mode) {
  try {
    const main_list = document.querySelector(".main-list");
    let category_news = await getNewsData(category, mode);
    if (category_news.length !== 0 && category_news.length < order) {
      const currentIndex = CATEGORY.indexOf(category);
      const nextIndex = (currentIndex + 1) % CATEGORY.length;
      category = CATEGORY[nextIndex];
      showListView(1, subscribedPress, mode, category);
      resetPage();
      // category_news = await getNewsData(category, "all");
    } else {
      drawCategory(category_news, order, category);
      const newDiv = document.createElement("div");
      newDiv.classList.add("press-news");
      main_list.appendChild(newDiv);
      drawPressInfo(
        category_news[order - 1],
        subscribedPress,
        category_news[order - 1].name
      );
      drawPressNews(category_news, category_news[order - 1].name);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleClick(e, subscribedPress) {
  const li_target = e.target.closest("li");
  if (li_target && li_target.classList.contains("category")) {
    const category = li_target.querySelector(".ctg").textContent.trim();
    drawList(1, category, subscribedPress);
  }
}

export function showListView(order, subscribedPress, mode, category = "") {
  if (!category) {
    const selected_category = document.querySelector(".category.selected .ctg");
    category = selected_category.textContent;
  }
  const main_list = document.querySelector(".main-list");
  main_list.innerHTML = "";
  drawList(order, category, subscribedPress, mode);

  document.addEventListener("click", (e) => handleClick(e, subscribedPress));
}
