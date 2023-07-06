const NEWS_COUNT = 24;

let pages = 0;

const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);

/* utils */
const fetchNewsData = async () => {
  try {
    const response = await fetch("./mocks/news.json");
    const data = await response.json();

    // shuffle data
    return data.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error(error.message);
  }
};

const isFirstPage = () => {
  return pages === 0;
};

const isLastPage = () => {};

/* grid view control */
const fillNewsContents = (newsData) => {
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

(async function init() {
  const newsData = await fetchNewsData();

  newsData.forEach((news) => {
    news.src = news.src.replace("images", "images/light");
  });

  fillNewsContents(newsData);

  /* event handler */

  const handlePrevButtonClick = () => {
    $nextPageButton.classList.remove("hidden");
    pages--;

    if (pages === 0) {
      $prevPageButton.classList.add("hidden");
    }
    fillNewsContents(newsData);
  };

  const handleNextButtonClick = () => {
    const maxPage = Math.floor(newsData.length / NEWS_COUNT) - 1;

    if (pages === maxPage) {
      return;
    }

    $prevPageButton.classList.remove("hidden");
    pages++;

    if (pages === maxPage) $nextPageButton.classList.add("hidden");
    fillNewsContents(newsData);
  };

  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
})();
