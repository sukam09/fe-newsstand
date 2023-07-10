document.documentElement.setAttribute("color-theme", "light");

//변수
const week = ["일", "월", "화", "수", "목", "금", "토"];
const imgIndex = Array(96)
  .fill()
  .map((arr, i) => i);
let main_list_page = 1;

const mainLogo = document.querySelector(".title");
const day = document.querySelector(".date");
const main_list_ul = document.querySelector(".main-list-ul");
const left_btn = document.getElementById("left-btn");
const right_btn = document.getElementById("right-btn");
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

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}
const shuffledPress = shuffleImgIndex();

//todo padstart
function getDateInterval() {
  setInterval(makeDate, 60000);
}

function showMainList() {
  main_list_ul.innerHTML = "";
  for (let i = 24 * (main_list_page - 1); i < 24 * main_list_page; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../images/lightmode-media/asset ${shuffledPress[i]} 1.png`
    );
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
}
function changePage(e) {
  if (e.target.id === "left") {
    main_list_page--;
  } else {
    main_list_page++;
  }
  showMainList();
  checkPage();
}

function checkPage() {
  if (main_list_page === 1) left_btn.style.visibility = "hidden";
  else if (main_list_page === 4) right_btn.style.visibility = "hidden";
  else {
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
  }
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
right_btn.addEventListener("click", (e) => changePage(e));
left_btn.addEventListener("click", (e) => changePage(e));

//default
makeDate();
getDateInterval();
showMainList();
checkPage();
getNewsData();
