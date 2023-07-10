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
  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < RollingNewsNum; j++) {
      const news_li = document.createElement("li");
      if (j === 0) {
        news_li.className = "current-news";
      } else if (j === 1) {
        news_li.className = "next-news";
      } else if (j === RollingNewsNum - 1) {
        news_li.className = "prev-news";
      }

      const news_press = document.createElement("a");
      news_press.className = "press display-bold14";
      news_press.innerHTML = rolling_news[RollingNewsNum * i + j].press;
      news_press.href = rolling_news[RollingNewsNum * i + j].url;

      const news_title = document.createElement("a");
      news_title.className = "news-title available-medium14";
      news_title.innerHTML = rolling_news[RollingNewsNum * i + j].title;
      news_title.href = rolling_news[RollingNewsNum * i + j].url;

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

function rollingCallback() {
  //.prev 클래스 삭제
  document.querySelector(".prev-news").classList.remove("prev-news");

  //.current -> .prev
  let current = document.querySelector(".current-news");
  current.classList.remove("current-news");
  current.classList.add("prev-news");

  //.next -> .current
  let next = document.querySelector(".next-news");
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document.querySelector(".news-bar ul:first-child li:first-child").classList.add("next-news");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next.nextElementSibling.classList.add("next-news");
  }
  next.classList.remove("next-news");
  next.classList.add("current-news");
}

export { initRollingNews, rollingCallback };
