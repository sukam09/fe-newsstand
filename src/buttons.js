import { NEWS_COUNT } from "./constants.js";

const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);

export const handlePrevButtonClick = (data, pages, callback) => () => {
  const maxPage = Math.floor(data.length / NEWS_COUNT) - 1;

  if (pages.getPages() === maxPage) {
    $nextPageButton.classList.remove("hidden");
  }

  if (pages.setPages(-1) === 0) {
    $prevPageButton.classList.add("hidden");
  }

  callback(data, pages);
};

export const handleNextButtonClick = (data, pages, callback) => () => {
  const maxPage = Math.floor(data.length / NEWS_COUNT) - 1;

  if (pages.getPages() === 0) {
    $prevPageButton.classList.remove("hidden");
  }

  if (pages.setPages(1) === maxPage) {
    $nextPageButton.classList.add("hidden");
  }

  callback(data, pages);
};

export const setButtons = (data, pages, callback) => {
  $prevPageButton.addEventListener(
    "click",
    handlePrevButtonClick(data, pages, callback)
  );
  $nextPageButton.addEventListener(
    "click",
    handleNextButtonClick(data, pages, callback)
  );
};
