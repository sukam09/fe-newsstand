import { NewsDB } from "../core/index.js";
import { store } from "../store/index.js";
import {
  VIEW_TYPE,
  CATEGORIES,
  CATEGORIES_TO_INDEX,
} from "../constants/index.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";
import { nextPage } from "../store/reducer.js";
import { startProgressing } from "./progress-bar.js";

const $listView = document.querySelector(".list-view-main");
const $listViewHeader = $listView.querySelector("header");
const $news_logo = $listViewHeader.querySelector("img");
const $edit_date = $listViewHeader.querySelector(".list-view-main_edit-date");
const $listViewMain = $listView.querySelector("main");
const $listViewMainNews = $listViewMain.querySelector(
  ".list-view-main_main-news"
);
const $mainThumbnail = $listViewMainNews.querySelector("img");
const $mainTitle = $listViewMainNews.querySelector("p");
const $listViewSubNews = $listViewMain.querySelector(
  ".list-view-main_sub-news > ul"
);
const $listViewNotice = $listViewMain.querySelector(".list-view-main_notice");

const fillArticles = (currentCategory, currentPage) => {
  const newsDataMap = NewsDB.getNewsDataMapByCategory();
  const { name, src, edit_date, main_news, sub_news } =
    newsDataMap.get(currentCategory)[currentPage];

  $news_logo.src = src;
  $news_logo.alt = name;
  $edit_date.innerText = edit_date;

  $mainThumbnail.src = main_news.thumbnail;
  $mainTitle.innerText = main_news.title;

  $listViewSubNews.innerHTML = sub_news.reduce((acc, curr) => {
    return acc + `<li>${curr}</li>`;
  }, "");

  $listViewNotice.innerText = `${name} 언론사에서 직접 편집한 뉴스입니다.`;
};

const initArticle = () => {
  const { currentPage, currentCategory } = store.getState();
  fillArticles(currentCategory, currentPage);
};

const updateButtonUI = () => {
  $prevPageButton.classList.remove("hidden");
  $nextPageButton.classList.remove("hidden");
};

export const renderListView = () => {
  initArticle();
};

store.subscribe(() => {
  const { currentPage, currentCategory, viewType } = store.getState();
  if (viewType !== VIEW_TYPE.LIST) return;

  const currentCategoryLength =
    NewsDB.getNewsDataMapByCategory().get(currentCategory).length;

  const $categorySelected = document.querySelector(".category-selected");
  const $tabCount = $categorySelected.querySelector(".tab-count");
  const $tabCountCurrent = $tabCount.querySelector(".tab-count_current");
  const $tabCountTotal = $tabCount.querySelector(".tab-count_total");

  $tabCountCurrent.innerText = currentPage + 1;
  $tabCountTotal.innerText = currentCategoryLength;

  fillArticles(currentCategory, currentPage);
  updateButtonUI();
  startProgressing(currentPage, currentCategoryLength);
});
