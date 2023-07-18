import { drawCategory } from "./drawCategory.js";
import { drawPressInfo } from "./drawPressInfo.js";
import { drawPressNews } from "./drawPressNews.js";
import { resetPage } from "../sections/mainView.js";

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

async function drawList(order, category, subscribedPress, current, mode) {
  try {
    let list = [];

    if (!current) {
      const selected_el = document.querySelector(".category.selected .ctg");
      current = selected_el.textContent;
    }
    if (!mode) {
      const _mode = document.querySelector(".main-tab-btn .clicked");
      mode = _mode.getAttribute("id");
    }
    mode === "all" ? (list = category) : (list = subscribedPress);

    const main_list = document.querySelector(".main-list");
    main_list.innerHTML = "";
    let list_content = await getNewsData(current, mode);
    if (list_content.length === 0 || list.length === 0) {
      main_list.innerHTML = "subsubusubsubu"; //TODO: 없는 경우 예외처리
    } else if (order <= 0 || list_content.length < order) {
      const currentIndex = list.indexOf(current);
      const prevIndex = (currentIndex - 1 + list.length) % list.length;
      const nextIndex = (currentIndex + 1) % list.length;
      order <= 0 ? (current = list[prevIndex]) : (current = list[nextIndex]);
      showListView(1, category, subscribedPress, current, mode);
      resetPage();
      list_content = await getNewsData(current, mode);
    } else {
      drawCategory(current, order, list, list_content);
      const newDiv = document.createElement("div");
      newDiv.classList.add("press-news");
      main_list.appendChild(newDiv);

      drawPressInfo(order, list_content, list, subscribedPress);
      drawPressNews(order, list_content, mode);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleClick(e, category, subscribedPress) {
  const li_target = e.target.closest("li");
  if (li_target && li_target.classList.contains("category")) {
    const current = li_target.querySelector(".ctg").textContent.trim();
    drawList(1, category, subscribedPress, current, "");
  }
}

export function showListView(
  order,
  category,
  subscribedPress,
  current = "",
  mode = ""
) {
  drawList(order, category, subscribedPress, current, mode);
  document.addEventListener("click", (e) =>
    handleClick(e, category, subscribedPress)
  );
}
