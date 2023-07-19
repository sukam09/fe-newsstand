import { PATH } from "../model/variable.js";

function initHeader(parentNode) {
  const dom = `
  <div class="main-header">
    <header class="title" onClick="window.location.reload()">
      <img class="news-logo"/>
      <h1 class="display-bold24">뉴스스탠드</h1>
    </header>
    <time class="today display-medium16"></time>
  </div>`;

  parentNode.innerHTML += dom;
}

function drawHeader() {
  const newsLogo = document.querySelector(".news-logo");
  const today = document.querySelector(".today");
  const timeStr = initDate();

  newsLogo.src = PATH.NEWS_LOGO;
  today.innerHTML = timeStr;

  return 0;
}

function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  return todaystr;
}

export { initHeader, drawHeader };
