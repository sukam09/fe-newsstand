import { startRollingBanner } from "./scripts/rolling-banner.js";
import { fillNewsContents } from "./scripts/grid-view.js";
import {
  customFetch,
  shuffleData,
  getKRLocaleDateString,
} from "./utils/index.js";
import { NEWS_COUNT } from "./constants/index.js";

// TODO: global state로 관리해야할듯
let theme = "light";
let pages = 0;

const $prevPageButton = document.querySelector(".container-main_left-btn");
const $nextPageButton = document.querySelector(".container-main_right-btn");
const $headerDate = document.querySelector(".container-header_date");

const getSlicedDataFromPage = (data, page, count) => {
  return data.slice(page * count, (page + 1) * count);
};

// main
(async function () {
  $headerDate.innerText = getKRLocaleDateString(new Date());

  const newsData = await customFetch("./mocks/news.json", shuffleData);
  fillNewsContents(getSlicedDataFromPage(newsData, pages, NEWS_COUNT));

  const headlineData = await customFetch("./mocks/headline.json");
  startRollingBanner(headlineData);

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

  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
})();
