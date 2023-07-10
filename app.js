const NEWS_COUNT = 24;

let pages = 0;

let scheme = "light";

const $prevPageButton = document.querySelector(".container-grid-view_left-btn");
const $nextPageButton = document.querySelector(
  ".container-grid-view_right-btn"
);
const $headerDate = document.querySelector(".container-header_date");
const $containerNewsBar = document.querySelector(".container-news-bar");

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

const createRollingBannerList = (data) => {
  const list = [...data, data[0]];

  return list.reduce((acc, curr) => {
    return acc + `<li><a href="#">${curr}</a></li>`;
  }, "");
};

(async function init() {
  /* headline view control */
  const handleRollingBanner = (headlineData) => {
    const [left, right] = [headlineData.slice(0, 5), headlineData.slice(5)];
    const dataLength = left.length;

    const $banners = $containerNewsBar.querySelectorAll(
      ".container-news-bar_window > ul"
    );

    $banners[0].innerHTML = createRollingBannerList(left);
    $banners[1].innerHTML = createRollingBannerList(right);

    $banners.innerHTML = $banners.forEach(($banner, idx) => {
      let cnt = 0;
      let interval;

      const autoRolling = () => {
        cnt += 1;
        $banner.style.transitionDuration = "500ms";
        $banner.style.transform = `translateY(-${14 * cnt}px)`;

        if (cnt >= dataLength) {
          clearInterval(interval);
          setTimeout(() => {
            cnt = 0;
            $banner.style.transitionDuration = "0ms";
            $banner.style.transform = "translateY(0)";
            autoPlay();
          }, 500);
        }
      };

      const autoPlay = () => {
        interval = setInterval(autoRolling, 5 * 1000);
      };

      if (idx === 1) {
        setTimeout(autoPlay, 1000);
      } else {
        autoPlay();
      }

      $banner.addEventListener("mouseover", () => {
        clearInterval(interval);
      });

      $banner.addEventListener("mouseout", () => {
        autoPlay();
      });
    });
  };

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

  setDate();

  const newsData = await customFetch("./mocks/news.json", shuffleData);
  fillNewsContents(newsData);

  const headlineData = await customFetch("./mocks/headline.json");
  handleRollingBanner(headlineData);

  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
})();
