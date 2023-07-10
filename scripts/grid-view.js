import { NEWS_COUNT } from "../constants/index.js";

const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);

let pages = 0;

export const fillNewsContents = (newsData) => {
  const $gridView = document.querySelector(".grid-view");
  $gridView.innerHTML = "";
  const startIndex = pages * NEWS_COUNT;

  for (let i = startIndex; i < startIndex + NEWS_COUNT; i++) {
    const $li = document.createElement("li");
    $li.className = "grid-cell";

    const $button = document.createElement("button");

    const $img = document.createElement("img");
    $img.className = "grid-cell_news-img";

    $img.src = newsData[i].src;
    $img.alt = newsData[i].name;

    $button.appendChild($img);
    $li.appendChild($button);

    $gridView.appendChild($li);
  }
};

const handlePrevButtonClick = () => {
  const maxPage = Math.floor(newsData.length / NEWS_COUNT) - 1;

  if (pages === maxPage) {
    $nextPageButton.classList.remove("hidden");
  }

  if (--pages === 0) {
    $prevPageButton.classList.add("hidden");
  }
  fillNewsContents(newsData);
};

const handleNextButtonClick = () => {
  const maxPage = Math.floor(newsData.length / NEWS_COUNT) - 1;

  if (pages === 0) {
    $prevPageButton.classList.remove("hidden");
  }

  if (++pages === maxPage) {
    $nextPageButton.classList.add("hidden");
  }
  fillNewsContents(newsData);
};

$prevPageButton.addEventListener("click", handlePrevButtonClick);
$nextPageButton.addEventListener("click", handleNextButtonClick);
