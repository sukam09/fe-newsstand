import { fetchData } from "../../utils/fetchData.js";

const SET_INTERVAL_TIME = 5000;
const SET_TIMEOUT_TIME = 1000;
const LEFT = 0;
const RIGHT = 1;
let leftInterval, rightInterval;

function makeLatestNews(latestNews) {
  /* left */
  for (let i = 0; i < Math.floor(latestNews.length / 2); i++) {
    const _li = document.createElement("li");
    _li.innerHTML = `<span class="press">${latestNews[i].press}</span>
     <span class="news-title">${latestNews[i].title}</span>`;
    if (i === 0) {
      _li.classList.add("current");
    } else if (i === 1) {
      _li.classList.add("next");
    } else if (i === Math.floor(latestNews.length / 2) - 1) {
      _li.classList.add("prev");
    }
    document.getElementById("left-rolling").appendChild(_li);
  }

  /* right */
  for (let i = 0; i < Math.floor(latestNews.length / 2); i++) {
    const _li = document.createElement("li");
    _li.innerHTML = `<span class="press">${latestNews[i].press}</span>
     <span class="news-title">${latestNews[i].title}</span>`;
    if (i === 0) {
      _li.classList.add("current");
    } else if (i === 1) {
      _li.classList.add("next");
    } else if (i === Math.floor(latestNews.length / 2) - 1) {
      _li.classList.add("prev");
    }
    document.getElementById("right-rolling").appendChild(_li);
  }
}

function addEventToRolling() {
  const newsList = document.querySelectorAll(".auto-rolling-news ul li");
  newsList.forEach((news) => {
    // 왼쪽, 오른쪽 뉴스 롤링 바 구분
    if (news.parentElement.id === "left-rolling") {
      addEventToNews(news, LEFT);
    } else {
      addEventToNews(news, RIGHT);
    }
  });
}

function addEventToNews(news, type) {
  if (!type) {
    news.addEventListener("mouseover", () => {
      clearInterval(leftInterval);
    });
    news.addEventListener("mouseout", () => {
      leftInterval = setInterval(() => rollingNewsBar(type), SET_INTERVAL_TIME);
    });
  } else {
    news.addEventListener("mouseover", () => {
      clearInterval(rightInterval);
    });
    news.addEventListener("mouseout", () => {
      rightInterval = setInterval(
        () => rollingNewsBar(RIGHT),
        SET_INTERVAL_TIME
      );
    });
  }
}

function rollingNewsBar(side) {
  document.querySelectorAll(".prev")[side].classList.remove("prev");

  const current = document.querySelectorAll(".current")[side];
  current.classList.remove("current");
  current.classList.add("prev");

  const next = document.querySelectorAll(".next")[side];
  //마지막 요소 check
  if (next.nextElementSibling === null) {
    document
      .querySelectorAll(".auto-rolling-news ul li:first-child")
      [side].classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

async function renderRolling() {
  const { latestNews } = await fetchData(".././assets/latest-news.json");
  makeLatestNews(latestNews);
  addEventToRolling();
  leftInterval = setInterval(() => rollingNewsBar(LEFT), SET_INTERVAL_TIME);
  setTimeout(() => {
    rightInterval = setInterval(() => rollingNewsBar(RIGHT), SET_INTERVAL_TIME);
  }, SET_TIMEOUT_TIME);
}

export { renderRolling };
