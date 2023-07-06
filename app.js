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

/* grid view control */
const fillNewsContents = (newsData) => {
  const $gridView = document.querySelector(".grid-view");

  for (let i = 0; i < 24; i++) {
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

/* event handler */
const handlePrevPageButtonClick = () => {
  pages && pages--;
};

const handleNextPageButtonClick = () => {
  pages++;
};

(async function init() {
  const newsData = await fetchNewsData();

  newsData.forEach((news) => {
    news.src = news.src.replace("images", "images/light");
  });

  fillNewsContents(newsData);

  $prevPageButton.addEventListener("click", handlePrevPageButtonClick);
  $nextPageButton.addEventListener("click", handleNextPageButtonClick);
})();
