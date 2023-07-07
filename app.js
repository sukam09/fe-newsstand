const NEWS_COUNT = 24;

let pages = 0;

let scheme = "light";

const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);
const $headerDate = document.querySelector(".container-header_date");

/* utils */

const customFetch = async (url, callback, options) => {
  try {
    const response = await fetch(url, options);
    let data = await response.json();

    if (callback) data = callback(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const shuffleData = (data) => {
  return data.sort(() => Math.random() - 0.5);
};

const setDate = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  $headerDate.innerText = today.toLocaleDateString("ko-KR", options);
};

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
  setDate();

  const newsData = await customFetch("./mocks/news.json", shuffleData);
  fillNewsContents(newsData);

  /* event handler */

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
})();
