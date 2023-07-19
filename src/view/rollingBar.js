import { CONSTANT, GLOBAL } from "../model/variable.js";

function initRollingBar(parentNode) {
  const dom = `
  <section class="news-bar">
      <ul class="news" id="first-news">
        <div class="press display-bold14"></div>
      </ul>
      <ul class="news" id="second-news">
        <div class="press display-bold14"></div>
      </ul>
    </section>`;

  parentNode.innerHTML += dom;
}

function drawRollingBar() {
  const firstNews = document.querySelector("#first-news");
  const secondNews = document.querySelector("#second-news");

  firstNews.childNodes[1].innerHTML = GLOBAL.ROLLING_NEWS[0].press;
  secondNews.childNodes[1].innerHTML = GLOBAL.ROLLING_NEWS[CONSTANT.ROLLING_NEWS_NUM].press;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < CONSTANT.ROLLING_NEWS_NUM; j++) {
      const newsLi = document.createElement("li");
      if (j === 0) {
        newsLi.className = "current-news";
      } else if (j === 1) {
        newsLi.className = "next-news";
      } else if (j === CONSTANT.ROLLING_NEWS_NUM - 1) {
        newsLi.className = "prev-news";
      }

      const newsTitle = document.createElement("a");
      newsTitle.className = "news-title available-medium14";
      newsTitle.innerHTML = GLOBAL.ROLLING_NEWS[CONSTANT.ROLLING_NEWS_NUM * i + j].title;
      newsTitle.href = GLOBAL.ROLLING_NEWS[CONSTANT.ROLLING_NEWS_NUM * i + j].url;

      newsLi.appendChild(newsTitle);
      if (i === 0) {
        firstNews.appendChild(newsLi);
      } else {
        secondNews.appendChild(newsLi);
      }
    }
  }
}

export { initRollingBar, drawRollingBar };
