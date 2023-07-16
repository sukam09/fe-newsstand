import { ROLLING, GLOBAL } from "./variable.js";

let firstInterval, secondInterval;

async function initRollingNews() {
  makeRollingDomData();

  startFirstInterval();
  window.setTimeout(startSecondInterval, ROLLING.DELAY_GAP);

  GLOBAL.DOM.FIRST_NEWS.addEventListener("mouseover", () => {
    window.clearTimeout(firstInterval);
  });

  GLOBAL.DOM.FIRST_NEWS.addEventListener("mouseout", () => {
    startFirstInterval();
  });

  GLOBAL.DOM.SECOND_NEWS.addEventListener("mouseover", () => {
    window.clearTimeout(secondInterval);
  });

  GLOBAL.DOM.SECOND_NEWS.addEventListener("mouseout", () => {
    startSecondInterval();
  });
}

const startFirstInterval = () => {
  firstInterval = window.setTimeout(() => {
    rollingCallback(ROLLING.LEFT);
    startFirstInterval();
  }, ROLLING.DELAY_TIME);
};

const startSecondInterval = () => {
  secondInterval = window.setTimeout(() => {
    rollingCallback(ROLLING.RIGHT);
    startSecondInterval();
  }, ROLLING.DELAY_TIME);
};

function makeRollingDomData() {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < ROLLING.NEWS_NUM; j++) {
      const newsLi = document.createElement("li");
      if (j === 0) {
        newsLi.className = "current-news";
      } else if (j === 1) {
        newsLi.className = "next-news";
      } else if (j === ROLLING.NEWS_NUM - 1) {
        newsLi.className = "prev-news";
      }

      const newsTitle = document.createElement("a");
      newsTitle.className = "news-title available-medium14";
      newsTitle.innerHTML = GLOBAL.ROLLING_NEWS[ROLLING.NEWS_NUM * i + j].title;
      newsTitle.href = GLOBAL.ROLLING_NEWS[ROLLING.NEWS_NUM * i + j].url;

      newsLi.appendChild(newsTitle);
      if (i === 0) {
        GLOBAL.DOM.FIRST_NEWS.appendChild(newsLi);
      } else {
        GLOBAL.DOM.SECOND_NEWS.appendChild(newsLi);
      }
    }
  }
}

function rollingCallback(rollingBar) {
  let prev, current, next, rollingTarget;

  if (rollingBar === ROLLING.LEFT) {
    rollingTarget = GLOBAL.DOM.FIRST_NEWS;
  } else {
    rollingTarget = GLOBAL.DOM.SECOND_NEWS;
  }

  prev = rollingTarget.querySelector(".prev-news");
  prev.classList.remove("prev-news");

  current = rollingTarget.querySelector(".current-news");
  current.classList.remove("current-news");
  current.classList.add("prev-news");

  next = rollingTarget.querySelector(".next-news");
  if (next.nextElementSibling == null) {
    rollingTarget.querySelector("li").classList.add("next-news");
  } else {
    next.nextElementSibling.classList.add("next-news");
  }
  next.classList.remove("next-news");
  next.classList.add("current-news");
}

export { initRollingNews };
