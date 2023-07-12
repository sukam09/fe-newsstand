import { NewsDB } from "./core/index.js";
import { startRollingBanner } from "./scripts/rolling-banner.js";
import { fillNewsContents } from "./scripts/grid-view.js";
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

// TODO: global state로 관리해야할듯
let theme = "light";
let pages = 0;

const $headerDate = document.querySelector(".container-header_date");
const $mainNav = document.querySelector(".main-nav");
const $mainNavViewerButtons = $mainNav.querySelectorAll(
  ".main-nav_viewer > button"
);

const getSlicedDataFromPage = (data, page, count) => {
  return data.slice(page * count, (page + 1) * count);
};

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

  setHeaderDate();
  startRollingBanner();

  const newsData = NewsDB.getNewsData();
  fillNewsContents(getSlicedDataFromPage(newsData, pages, NEWS_COUNT));

  const handlePrevButtonClick = () => {
    const maxPage = Math.floor(newsData.length / NEWS_COUNT) - 1;

    if (pages === maxPage) {
      $nextPageButton.classList.remove("hidden");
    }

    pages -= 1;
    if (pages === 0) {
      $prevPageButton.classList.add("hidden");
    }

    fillNewsContents(getSlicedDataFromPage(newsData, pages, NEWS_COUNT));
  };

  const handleNextButtonClick = () => {
    const maxPage = Math.floor(newsData.length / NEWS_COUNT) - 1;

    if (pages === 0) {
      $prevPageButton.classList.remove("hidden");
    }

    pages += 1;
    if (pages === maxPage) {
      $nextPageButton.classList.add("hidden");
    }

    fillNewsContents(getSlicedDataFromPage(newsData, pages, NEWS_COUNT));
  };

  const handleViewerButtonClick = (e) => {
    const viewType = e.currentTarget.dataset.view;

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
  };

  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
  $mainNavViewerButtons.forEach(($button) => {
    $button.addEventListener("click", handleViewerButtonClick);
  });
})();
