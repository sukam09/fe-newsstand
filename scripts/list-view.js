import { NewsDB } from "../core/index.js";
import { store, useSelector } from "../store/index.js";
import { CATEGORIES, TAB_TYPE, VIEW_TYPE } from "../constants/index.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";
import {
  nextCategory,
  prevCategory,
  setCategory,
  setPage,
} from "../store/reducer/page.js";
import { resetProgress } from "./progress-bar.js";
import { SubscribeButton } from "./components.js";
import { openSnackbar } from "../store/reducer/snackbar.js";
import { addSubscribe } from "../store/reducer/subscribe-list.js";
import { openModal } from "../store/reducer/modal.js";

const [$categoryTab, $subscribeTab] = document.querySelectorAll(
  ".list-view_tab > ul"
);
const $listViewTabItems = $categoryTab.querySelectorAll("li");
const $listView = document.querySelector(".list-view-main");
const $listViewHeader = $listView.querySelector("header");
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

const SubscribeItem = (press, selected) => {
  return `
  <li ${selected ? `class="category-selected selected-bold14"` : ``} >
    <div class="tab_progress-bar"></div>
    <span class="tab_category">${press}</span>
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z" fill="inherit"/>
    </svg>
  </li>`;
};

const showSubscribeTab = (subscribeList, selected) => {
  $subscribeTab.innerHTML = subscribeList.reduce((acc, curr) => {
    return acc + SubscribeItem(curr, selected === curr);
  }, "");
};

const unshowSubscribeTab = () => {
  $subscribeTab.innerHTML = "";
};

const showCategoryTab = () => {
  $categoryTab.style.display = "flex";
};

const unshowCategoryTab = () => {
  $categoryTab.style.display = "none";
};

const fillArticle = (articleData) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const { name, src, edit_date, main_news, sub_news } = articleData;

  const subscribeList = useSelector((state) => state.subscribeList);
  const isSubscribed = subscribeList.includes(name);

  $listViewHeader.innerHTML = `
    <img src="${src[theme]}" alt="${name}" height="20" width="auto" />
    <span class="list-view-main_edit-date display-medium12">${edit_date}</span>
    ${SubscribeButton(isSubscribed)}
  `;

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

const handleSubscribeTabsClick = (e) => {
  const subscribeList = useSelector((state) => state.subscribeList);
  const pressName = e.target.innerText;

  const pressIdx = subscribeList.indexOf(pressName);
  store.dispatch(setPage(pressIdx));
};

const handleSubscribeButtonClick = (e) => {
  const $button = e.target.closest(".subscribe-btn");
  if (!$button) {
    return;
  }

  const name = $button.previousElementSibling.previousElementSibling.alt;
  const isSubscribed = JSON.parse($button.dataset.subscribed);

  if (isSubscribed) {
    store.dispatch(openModal(name));
    return;
  }

  store.dispatch(openSnackbar());
  store.dispatch(addSubscribe(name));
};

export const renderListView = () => {
  $listViewTabItems.forEach(($tabItem) => {
    $tabItem.addEventListener("click", handleListViewTabClick);
  });
  $listViewHeader.addEventListener("click", handleSubscribeButtonClick);
  $subscribeTab.addEventListener("click", handleSubscribeTabsClick);

  store.subscribe(() => {
    const { currentPage, currentCategoryIdx, viewType, tabType } = useSelector(
      (state) => state.page
    );
    if (viewType !== VIEW_TYPE.LIST) return;

    if (tabType === TAB_TYPE.ALL) {
      const currentCategory = CATEGORIES[currentCategoryIdx];
      const totalCnt = NewsDB.getCountByCategory(currentCategory);
      const articleData = NewsDB.queryByCategory(currentCategory)[currentPage];

      if (currentPage < 0) {
        store.dispatch(prevCategory());
        return;
      }

      if (currentPage >= totalCnt) {
        store.dispatch(nextCategory());
        return;
      }

      showCategoryTab();
      unshowSubscribeTab();
      activateCategory(currentCategory);
      showTabCount(currentPage, totalCnt);
      fillArticle(articleData);
    } else {
      const subscribeList = useSelector((state) => state.subscribeList);
      const pressName = subscribeList[currentPage];
      const articleData = {
        name: pressName,
        ...NewsDB.getNewsOneByName(pressName),
      };

      if (currentPage < 0) {
        store.dispatch(setPage(subscribeList.length - 1));
        return;
      }

      if (currentPage >= subscribeList.length) {
        store.dispatch(setPage(0));
        return;
      }

      unshowCategoryTab();
      showSubscribeTab(subscribeList, subscribeList[currentPage]);
      fillArticle(articleData);
    }
    resetProgress();
    updateButtonUI();
  });
};
