document.documentElement.setAttribute("color-theme", "light");

//변수
const week = ["일", "월", "화", "수", "목", "금", "토"];

const mainLogo = document.querySelector(".title");
const day = document.querySelector(".date");
//함수
function reload() {
  document.location.reload();
}

function makeDate() {
  const date = new Date();
  day.innerHTML = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, 0)}. ${String(date.getDate()).padStart(2, 0)}. ${
    week[date.getDay()]
  }요일`;
}

//todo padstart
function getDateInterval() {
  setInterval(makeDate, 60000);
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
//이벤트 리스너

mainLogo.addEventListener("click", reload);

//default
makeDate();
getDateInterval();

getNewsData();
