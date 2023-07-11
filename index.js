import logoAll from "./news_image.json" assert { type: "json" };
import news_article from "./news_article.json" assert { type: "json" };

let MAX_PAGE_NUMBER = 3;
let MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
let firstBannerIndex = 1;
let secondBannerIndex = 6;
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
function refresh(logos) {
  shuffle(logos);
  const COUNT_PER_PAGE = 24;
  const mainGrid = document.getElementById("main-grid-01");
  mainGrid.innerHTML = "";
  for (
    let PAGE_INDEX = currentPageNumber * COUNT_PER_PAGE;
    PAGE_INDEX < COUNT_PER_PAGE * currentPageNumber + 24 &&
    PAGE_INDEX < logos.length;
    PAGE_INDEX++
  ) {
    const outerDiv = document.createElement("div");
    const newsLogo = document.createElement("img");
    newsLogo.src = `${logos[PAGE_INDEX].logo}`;
    outerDiv.append(newsLogo);
    mainGrid.append(outerDiv);
  }
}

function clickNewsStand() {
  const newsStand = document.getElementById("header-div-01");
  newsStand.addEventListener("click", () => {
    window.location.replace("index.html");
  });
}

function getDate() {
  let time;
  const weekend = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  let month = `0${today.getMonth() + 1}`;
  month = month.slice(-2);
  let date = `0${today.getDate()}`;
  date = date.slice(-2);
  const day = weekend[today.getDay()];
  time = `${year}. ${month}. ${date}. ${day}요일`;
  return time;
}

function setDate() {
  let time = getDate();
  const dateDiv = document.getElementById("header-div-02");
  const timeDiv = document.createElement("div");
  timeDiv.innerText = time;
  dateDiv.appendChild(timeDiv);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function clickAllNews() {
  const allNews = document.getElementById("main-left-01");
  allNews.addEventListener("click", () => {
    refresh(logoAll);
  });
}

function clickMySubscribeNews() {
  const subscribeNews = document.getElementById("main-left-02");
  subscribeNews.addEventListener("click", () => {
    refresh(logoSubscribe);
  });
}

function clickGridImage() {
  const gridImage = document.getElementById("grid-image");
  gridImage.addEventListener("click", () => {
    refresh(subscribe_images);
  });
}

function clickCardListImage() {
  const cardListImage = document.getElementById("card-list-image");
  cardListImage.addEventListener("click", () => {
    refresh(subscribe_images);
  });
}

function clickRightAsideButton() {
  rightAsideButton.addEventListener("click", () => {
    if (currentPageNumber == MAX_PAGE_NUMBER - 1) {
      rightAsideButton.style.visibility = "hidden";
      currentPageNumber++;
      refresh(logoAll);
      return;
    }
    currentPageNumber++;
    leftAsideButton.style.visibility = "visible";
    refresh(logoAll);
  });
}

function clickLeftAsideButton() {
  leftAsideButton.addEventListener("click", () => {
    if (currentPageNumber == MIN_PAGE_NUMBER + 1) {
      leftAsideButton.style.visibility = "hidden";
      currentPageNumber--;
      refresh(logoAll);
      return;
    }
    currentPageNumber--;
    rightAsideButton.style.visibility = "visible";
    refresh(logoAll);
  });
}

function rollingBanner() {
  addInitRollingData(1);
  addInitRollingData(2);
  addEventListener("DOMContentLoaded", () => {
    let interval1 = setInterval(rollingInterval, 5000, 1);
    let interval2 = setInterval(rollingInterval, 6000, 2);
    //addRollingHoverEvent(interval1, interval2);
  });
}

function addRollingHoverEvent(interval1, interval2) {
  // const bannerHover01 = document.getElementById("rolling-banner-01");
  // const bannerHover02 = document.getElementById("rolling-banner-02");
  // bannerHover01.addEventListener("mouseover", () => {
  //   clearInterval(interval1);
  // });
  // bannerHover01.addEventListener("mouseleave", () => {
  //   interval1 = setInterval(rollingInterval, 5000, 1);
  // });
  // bannerHover02.addEventListener("mouseover", () => {
  //   clearInterval(interval2);
  // });
  // bann.addEventListener("mouseleave", () => {
  //   interval2 = setInterval(rollingInterval, 6000, 2);
  // });
}

function rollingInterval(bannerNumber) {
  if (bannerNumber == 1) {
    changeBanner(firstBannerIndex, bannerNumber);
    firstBannerIndex++;
    if (firstBannerIndex == 5) firstBannerIndex = 0;
  } else {
    changeBanner(secondBannerIndex, bannerNumber);
    secondBannerIndex++;
    if (secondBannerIndex == 10) secondBannerIndex = 5;
  }
}

function changeBanner(articleIndex, bannerNumber) {
  document
    .querySelector(`#rolling-banner-0${bannerNumber} .wrap .prev`)
    .classList.remove("prev");
  let currentBanner = document.querySelector(
    `#rolling-banner-0${bannerNumber} .wrap .current`
  );
  let nextBanner = document.querySelector(
    `#rolling-banner-0${bannerNumber} .wrap .next`
  );
  currentBanner.classList.remove("current");
  currentBanner.classList.add("prev");
  if (nextBanner.nextElementSibling == null)
    document
      .querySelector(`#rolling-banner-0${bannerNumber} .wrap ul li:first-child`)
      .classList.add("next");
  else nextBanner.nextElementSibling.classList.add("next");
  nextBanner.classList.remove("next");
  nextBanner.classList.add("current");
}

function addInitRollingData(bannerNumber) {
  let rollingBanner = document.getElementById(
    `rolling-banner-0${bannerNumber}`
  );
  let startIndex, endIndex, secondIndex;
  if (bannerNumber == 1) {
    startIndex = 0;
    endIndex = parseInt(news_article[0].article.length / 2);
  } else {
    startIndex = Math.ceil(news_article[0].article.length / 2);
    endIndex = news_article[0].article.length;
  }
  secondIndex = startIndex + 1;
  let newsHTML = `<div class="wrap"><ul>`;
  for (; startIndex < endIndex; startIndex++) {
    newsHTML +=
      '<li class="' +
      (startIndex === endIndex - 1
        ? "prev"
        : startIndex === secondIndex
        ? "next"
        : startIndex === secondIndex - 1
        ? "current"
        : "") +
      '">';
    newsHTML += '<a href="#">' + news_article[0].article[startIndex] + "</a>";
  }
  newsHTML += "</ul></div>";
  rollingBanner.innerHTML = newsHTML;
}

function init() {
  clickNewsStand();
  clickRightAsideButton();
  clickLeftAsideButton();
  setDate();
  rollingBanner();
}
refresh(logoAll);
init();
