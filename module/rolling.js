import { fetchRollingNewsData } from "./api.js";

const RollingNewsNum = 5;
const first_news = document.querySelector("#first-news");
// const first_news_press = document.querySelector("#first-news-press");
// const first_news_title = document.querySelector("#first-news-title");
const second_news = document.querySelector("#second-news");
// const second_news_press = document.querySelector("#second-news-press");
// const second_news_title = document.querySelector("#second-news-title");
let rolling_news;
let first_news_index = 0;
let second_news_index = RollingNewsNum;

async function initRollingNews() {
  rolling_news = await fetchRollingNewsData();
  makeDomData();
}

function makeDomData() {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < RollingNewsNum; j++) {
      const news_li = document.createElement("li");

      const news_press = document.createElement("a");
      news_press.innerHTML = rolling_news[RollingNewsNum * i + j].press;
      news_press.href = rolling_news[RollingNewsNum * i + j].url;
      news_press.className = "press display-bold14";

      const news_title = document.createElement("a");
      news_title.innerHTML = rolling_news[RollingNewsNum * i + j].title;
      news_title.href = rolling_news[RollingNewsNum * i + j].url;
      if (j === 0) {
        news_title.className = "news-title available-medium14 current-news";
      } else if (j === 1) {
        news_title.className = "news-title available-medium14 next-news";
      } else if (j === RollingNewsNum - 1) {
        news_title.className = "news-title available-medium14 prev-news";
      } else {
        news_title.className = "news-title available-medium14";
      }

      if (j !== 0) {
        news_li.style.display = "none";
      }

      news_li.appendChild(news_press);
      news_li.appendChild(news_title);
      if (i === 0) {
        first_news.appendChild(news_li);
      } else {
        second_news.appendChild(news_li);
      }
    }
  }
}

export { initRollingNews };
