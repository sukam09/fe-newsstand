import { NEWS_COUNT, VIEW_TYPE } from "../constants/index.js";
import { store, useSelector } from "../store/index.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";

const fillGridView = (newsData, currentPage) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const $gridView = document.querySelector(".grid-view");
  $gridView.innerHTML = "";

  const startIdx = currentPage * NEWS_COUNT;
  for (let i = startIdx; i < startIdx + NEWS_COUNT; i++) {
    const $li = document.createElement("li");
    $li.className = "grid-cell";

    const $button = document.createElement("button");

    const $img = document.createElement("img");
    $img.className = "grid-cell_news-img";

    $img.src = newsData[i].src[theme];
    $img.alt = newsData[i].name;

    $button.appendChild($img);
    $li.appendChild($button);

    $gridView.appendChild($li);
  }
};

const initGridView = (newsData) => {
  const currentPage = useSelector((state) => state.page.currentPage);
  fillGridView(newsData, currentPage);
};

const getMaxPage = (data) => {
  return Math.floor(data.length / NEWS_COUNT) - 1;
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

export const renderGridView = (newsData) => {
  const maxPage = getMaxPage(newsData);
  initGridView(newsData);

  store.subscribe(() => {
    const { currentPage, viewType } = useSelector((state) => state.page);
    if (viewType !== VIEW_TYPE.GRID) return;

    fillGridView(newsData, currentPage);

    updateButtonUI(currentPage, maxPage);
  });
};
