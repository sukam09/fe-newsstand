import { autoRollingAnimation } from "../utils/autoRolling.js";

function RecentNews() {
  getNewsData();
  autoRollingAnimation();
  const headerElement = document.createElement("h1");
  headerElement.textContent = "여기에 헤더 컴포넌트의 내용을 작성하세요";
  return headerElement;
}

function getNewsData() {
  fetch("../data/news.json")
    .then((response) => response.json())
    .then((newsData) => {
      const news = newsData.News;
      drawRollingHtml("recent-left", news);
      drawRollingHtml("recent-right", news);
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
}

function drawRollingHtml(target, news) {
  const _target = document.getElementById(target);
  let newsHTML = `<div class="wrap"><ul>`;
  for (let i = 0; i < news.length; i++) {
    newsHTML +=
      '<li class="' +
      (i === 0
        ? "current"
        : i === 1
        ? "next"
        : i === news.length - 1
        ? "prev"
        : "") +
      '">';
    newsHTML +=
      '<span class="press">' +
      news[i].press +
      "</span>" +
      '<a href="#">' +
      news[i].title +
      "</a>";
    newsHTML += "</li>";
  }
  newsHTML += "</ul></div>";
  _target.innerHTML = newsHTML;
}

export { RecentNews };
