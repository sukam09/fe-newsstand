import { NewsDB } from "../core/index.js";
import { store, useSelector } from "../store/index.js";
import { CATEGORIES, VIEW_TYPE } from "../constants/index.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";
import {
  nextCategory,
  prevCategory,
  setCategory,
} from "../store/reducer/page.js";
import { resetProgress } from "./progress-bar.js";

const $listViewTab = document.querySelector(".list-view_tab > ul");
const $listViewTabItems = $listViewTab.querySelectorAll("li");
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
  const theme = useSelector((state) => state.theme.currentTheme);
  const { name, src, edit_date, main_news, sub_news } =
    NewsDB.queryByCategory(currentCategory)[currentPage];

  $news_logo.src = src[theme];
  $news_logo.alt = name;
  $edit_date.innerText = edit_date;

  $mainThumbnail.src = main_news.thumbnail;
  $mainTitle.innerText = main_news.title;

  $listViewSubNews.innerHTML = sub_news.reduce((acc, curr) => {
    return acc + `<li>${curr}</li>`;
  }, "");

  $listViewNotice.innerText = `${name} 언론사에서 직접 편집한 뉴스입니다.`;
};

const updateButtonUI = () => {
  $prevPageButton.classList.remove("hidden");
  $nextPageButton.classList.remove("hidden");
};

const activateCategory = (category) => {
  $listViewTabItems.forEach(($item) => {
    const tabCategory = $item.querySelector(".tab_category").innerText;
    if (tabCategory === category) {
      $item.className = "category-selected selected-bold14";
    } else {
      $item.className = "";
    }
  });
};

const showTabCount = (currentPage, totalCnt) => {
  const $categorySelected = document.querySelector(".category-selected");
  const $tabCount = $categorySelected.querySelector(".tab-count");
  const $tabCountCurrent = $tabCount.querySelector(".tab-count_current");
  const $tabCountTotal = $tabCount.querySelector(".tab-count_total");

  $tabCountCurrent.innerText = currentPage + 1;
  $tabCountTotal.innerText = totalCnt;
};

const handleListViewTabClick = (e) => {
  const $tabCategory = e.currentTarget.querySelector(".tab_category");
  const category = $tabCategory.innerText;

  activateCategory(category);

  store.dispatch(setCategory(category));
};

export const renderListView = () => {
  $listViewTabItems.forEach(($tabItem) => {
    $tabItem.addEventListener("click", handleListViewTabClick);
  });

  store.subscribe(() => {
    const { currentPage, currentCategoryIdx, viewType } = useSelector(
      (state) => state.page
    );
    if (viewType !== VIEW_TYPE.LIST) return;

    const currentCategory = CATEGORIES[currentCategoryIdx];
    const totalCnt = NewsDB.getCountByCategory(currentCategory);

    if (currentPage < 0) {
      store.dispatch(prevCategory());
      return;
    }

    if (currentPage >= totalCnt) {
      store.dispatch(nextCategory());
      return;
    }

    updateButtonUI();
    activateCategory(currentCategory);
    showTabCount(currentPage, totalCnt);
    fillArticles(currentCategory, currentPage);
    resetProgress();
  });
};
