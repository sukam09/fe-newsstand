import { autoRollingAnimation } from "../utils/autoRolling.js";
import { RECENT_NEWS_CNT } from "../constants/constants.js";
import { getData } from "../core/api.js";
function RecentNews() {
  getRecentNewsData();
  autoRollingAnimation();
  const headerElement = document.createElement("h1");
  headerElement.textContent = "여기에 헤더 컴포넌트의 내용을 작성하세요";
  return headerElement;
}

async function getRecentNewsData() {
  const data = await getData("recentNews");
  const news = data.RecentNews;
  drawRollingHtml("recent-left", news);
  drawRollingHtml("recent-right", news);
}

function drawRollingHtml(target, news) {
  const _target = document.getElementById(target);
  let newsHTML = `<div class="wrap"><ul>`;
  for (let i = 0; i < RECENT_NEWS_CNT; i++) {
    newsHTML +=
      '<li class="' +
      (i === 0
        ? "current"
        : i === 1
        ? "next"
        : i === RECENT_NEWS_CNT - 1
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
