import { NewsDB } from "../core/index.js";
import { store } from "../store/index.js";
import { VIEW_TYPE } from "../constants/index.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";

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

const CATEGORIES = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const CATEGORIES_TO_INDEX = CATEGORIES.reduce((acc, curr, idx) => {
  acc[curr] = idx;
  return acc;
}, {});

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

  store.subscribe(() => {
    const { currentPage, currentCategory, viewType } = store.getState();
    if (viewType !== VIEW_TYPE.LIST) return;

    fillArticles(currentCategory, currentPage);

    updateButtonUI();
  });
};
