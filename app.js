import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { renderGridView } from "./scripts/grid-view.js";
import { renderListView } from "./scripts/list-view.js";
import {
  $gridView,
  $listView,
  $prevPageButton,
  $nextPageButton,
} from "./scripts/doms.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
} from "./utils/index.js";
import { VIEW_TYPE } from "./constants/index.js";
import { store } from "./store/index.js";
import {
  changeView,
  nextPage,
  prevPage,
  setCategory,
} from "./store/reducer.js";

const $headerDate = document.querySelector(".container-header_date");
const $mainNav = document.querySelector(".main-nav");
const $mainNavViewerButtons = $mainNav.querySelectorAll(
  ".main-nav_viewer > button"
);
const $listViewTab = document.querySelector(".list-view_tab > ul");
const $listViewTabItems = $listViewTab.querySelectorAll("li");

const initDB = async () => {
  const mockData = await customFetch("./mocks/news.json", shuffleData);
  NewsDB.instance = mockData;
};

const setHeaderDate = () => {
  $headerDate.innerText = getKRLocaleDateString(new Date());
};

// main
(async function () {
  await initDB();
  const newsData = NewsDB.getNewsData();

  setHeaderDate();
  startRollingBanner();
  renderGridView(newsData);
  renderListView();

  store.subscribe(() => {
    const viewType = store.getState().viewType;

    $mainNavViewerButtons.forEach(($button) => {
      if (viewType !== $button.dataset.view) {
        $button.classList.remove("main-nav_viewer--selected");
      } else {
        $button.classList.add("main-nav_viewer--selected");
      }
    });

    if (viewType === VIEW_TYPE.GRID) {
      $gridView.classList.remove("hidden");
      $listView.classList.add("hidden");
    } else {
      $gridView.classList.add("hidden");
      $listView.classList.remove("hidden");
    }
  });
})();

const handleListViewTabClick = (e) => {
  if (e.target === e.currentTarget) return;

  $listViewTabItems.forEach(($item) => {
    if ($item === e.target) {
      $item.className = "category-selected selected-bold14";
    } else {
      $item.className = "";
    }
  });

  const category = e.target.innerText;
  store.dispatch(setCategory(category));
};

const handlePrevButtonClick = () => {
  store.dispatch(prevPage());
};

const handleNextButtonClick = () => {
  store.dispatch(nextPage());
};

const handleViewerButtonClick = (e) => {
  const viewType = e.currentTarget.dataset.view;
  store.dispatch(changeView(viewType));
};

$listViewTab.addEventListener("click", handleListViewTabClick);
$prevPageButton.addEventListener("click", handlePrevButtonClick);
$nextPageButton.addEventListener("click", handleNextButtonClick);
$mainNavViewerButtons.forEach(($button) => {
  $button.addEventListener("click", handleViewerButtonClick);
});
