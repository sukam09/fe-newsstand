import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { fillGridView } from "./scripts/grid-view.js";
import { fillListView } from "./scripts/list-view.js";
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
import { NEWS_COUNT, VIEW_TYPE } from "./constants/index.js";
import { store } from "./store/index.js";
import { changeView, nextPage, prevPage } from "./store/reducer.js";

const $headerDate = document.querySelector(".container-header_date");
const $mainNav = document.querySelector(".main-nav");
const $mainNavViewerButtons = $mainNav.querySelectorAll(
  ".main-nav_viewer > button"
);

const getSlicedDataFromPage = (data, page, count) => {
  return data.slice(page * count, (page + 1) * count);
};

const getMaxPage = (data) => {
  return Math.floor(data.length / NEWS_COUNT) - 1;
};

const initDB = async () => {
  const mockData = await customFetch("./mocks/news.json", shuffleData);
  NewsDB.instance = mockData;
};

const setHeaderDate = () => {
  $headerDate.innerText = getKRLocaleDateString(new Date());
};

const updateButtonUI = (currentPage, maxPage) => {
  if (currentPage === 0) {
    $prevPageButton.classList.add("hidden");
  } else {
    $prevPageButton.classList.remove("hidden");
  }

  if (currentPage === maxPage) {
    $nextPageButton.classList.add("hidden");
  } else {
    $nextPageButton.classList.remove("hidden");
  }
};

// main
(async function () {
  await initDB();
  const newsData = NewsDB.getNewsData();
  const maxPage = getMaxPage(newsData);

  setHeaderDate();
  startRollingBanner();
  fillGridView(
    getSlicedDataFromPage(newsData, store.getState().currentPage, NEWS_COUNT)
  );

  store.subscribe(() => {
    const { currentPage, viewType } = store.getState();

    if (viewType === VIEW_TYPE.GRID) {
      fillGridView(getSlicedDataFromPage(newsData, currentPage, NEWS_COUNT));
    } else {
      fillListView();
    }

    updateButtonUI(currentPage, maxPage);
  });

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

  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
  $mainNavViewerButtons.forEach(($button) => {
    $button.addEventListener("click", handleViewerButtonClick);
  });
})();
