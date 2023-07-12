import { fetchRollingNewsData } from "./api.js";
import { ROLLING } from "./variable.js";

let rolling_news;
let first_interval = null;
let second_interval = null;

async function initRollingNews() {
  const first_news = document.querySelector("#first-news");
  const second_news = document.querySelector("#second-news");

  startFirstInterval();
  window.setTimeout(startSecondInterval, ROLLING.DELAY_GAP);

  rolling_news = await fetchRollingNewsData();
  makeDomData();

  first_news.addEventListener("mouseover", () => {
    window.clearTimeout(first_interval);
  });

  first_news.addEventListener("mouseout", () => {
    startFirstInterval();
  });

  second_news.addEventListener("mouseover", () => {
    window.clearTimeout(second_interval);
  });

  second_news.addEventListener("mouseout", () => {
    startSecondInterval();
  });
}

function makeDomData() {
  const first_news = document.querySelector("#first-news>div");
  const second_news = document.querySelector("#second-news>div");

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < ROLLING.NEWS_NUM; j++) {
      const news_li = document.createElement("li");
      if (j === 0) {
        news_li.className = "current-news";
      } else if (j === 1) {
        news_li.className = "next-news";
      } else if (j === ROLLING.NEWS_NUM - 1) {
        news_li.className = "prev-news";
      }

      // 언론사도 같이 애니메이션 주고싶으면 사용하면 됨
      // const news_press = document.createElement("a");
      // news_press.className = "press display-bold14";
      // news_press.innerHTML = rolling_news[RollingNewsNum * i + j].press;
      // news_press.href = rolling_news[RollingNewsNum * i + j].url;

      const news_title = document.createElement("a");
      news_title.className = "news-title available-medium14";
      news_title.innerHTML = rolling_news[ROLLING.NEWS_NUM * i + j].title;
      news_title.href = rolling_news[ROLLING.NEWS_NUM * i + j].url;

      // news_li.appendChild(news_press);
      news_li.appendChild(news_title);
      if (i === 0) {
        first_news.appendChild(news_li);
      } else {
        second_news.appendChild(news_li);
      }
    }
  }
}

function rollingCallback(dir) {
  let prev, current, next;
  if (dir === ROLLING.LEFT) {
    prev = document.querySelector("#first-news .prev-news");
    current = document.querySelector("#first-news .current-news");
    next = document.querySelector("#first-news .next-news");
    if (next.nextElementSibling == null) {
      document.querySelector(".news-bar #first-news li:first-child").classList.add("next-news");
    } else {
      next.nextElementSibling.classList.add("next-news");
    }
  } else {
    prev = document.querySelector("#second-news .prev-news");
    current = document.querySelector("#second-news .current-news");
    next = document.querySelector("#second-news .next-news");
    if (next.nextElementSibling == null) {
      document.querySelector(".news-bar #second-news li:first-child").classList.add("next-news");
    } else {
      next.nextElementSibling.classList.add("next-news");
    }
  }
  prev.classList.remove("prev-news");

  current.classList.remove("current-news");
  current.classList.add("prev-news");

  next.classList.remove("next-news");
  next.classList.add("current-news");
}

const startFirstInterval = () => {
  first_interval = window.setTimeout(() => {
    rollingCallback(ROLLING.LEFT);
    startFirstInterval();
  }, ROLLING.DELAY_TIME);
};

const startSecondInterval = () => {
  second_interval = window.setTimeout(() => {
    rollingCallback(ROLLING.RIGHT);
    startSecondInterval();
  }, ROLLING.DELAY_TIME);
};

export { initRollingNews };
