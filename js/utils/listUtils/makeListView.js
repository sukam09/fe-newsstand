import { drawCategory } from "./drawCategory.js";
import { drawPressInfo } from "./drawPressInfo.js";
import { drawPressNews } from "./drawPressNews.js";
import { store } from "../../core/store.js";
import { FIRST_PAGE_NUM, CATEGORY } from "../../constants/constants.js";
import {
  getPage,
  getTabMode,
  getSubscribedPress,
  getIndex,
} from "../../core/getter.js";
import { checkPage } from "../commonUtils/checkPage.js";

function filterData(current) {
  const data = getIndex("listIndex");
  return data.filter((news) =>
    getTabMode() === "all" ? news.category === current : news.name === current
  );
}
function updateStateAndListContent(current, list_content) {
  const list =
    getTabMode() === "all"
      ? CATEGORY
      : getSubscribedPress().map((item) => item.name);
  const currentIndex = list.indexOf(current);
  const prevIndex = (currentIndex - 1 + list.length) % list.length;
  const nextIndex = (currentIndex + 1) % list.length;

  if (getPage() <= 0) {
    current = list[prevIndex];
    list_content = filterData(current);
    store.setState({ page: list_content.length });
  } else {
    list_content = filterData(current);
    store.setState({ page: FIRST_PAGE_NUM });
    current = list[nextIndex];
  }

  return { current, list, list_content };
}
async function drawList(current) {
  try {
    let list = [];
    if (!current) {
      const selected_el = document.querySelector(".category.selected .ctg");
      if (selected_el) current = selected_el.textContent;
    }
    getTabMode() === "all"
      ? (list = CATEGORY)
      : (list = getSubscribedPress().map((item) => item.name));

    const main_list = document.querySelector(".main-list");
    main_list.innerHTML = "";

    let list_content = filterData(current);

    if (getPage() <= 0 || list_content.length < getPage()) {
      ({ current, list, list_content } = updateStateAndListContent(
        current,
        list_content
      ));
      showListView(current);
      return;
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

export function showListView(current = "") {
  drawList(current);
}
