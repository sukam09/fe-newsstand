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
  const mainGrid = document.getElementById("main-grid");
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
  const rightAsideButton = document.getElementById("aside-right");
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
  const leftAsideButton = document.getElementById("aside-left");
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
  addInitRollingData();
  addEventListener("DOMContentLoaded", () => {
    let interval1 = setInterval(rollingInterval, 5000, 1);
    let interval2 = setInterval(rollingInterval, 6000, 2);
    addRollingHoverEvent(interval1, interval2);
  });
}

function addRollingHoverEvent(interval1, interval2) {
  let onHoverRolling1 = document.getElementById("rolling-banner-01");
  let onHoverRolling2 = document.getElementById("rolling-banner-02");
  onHoverRolling1.addEventListener("mouseover", () => {
    clearInterval(interval1);
  });
  onHoverRolling1.addEventListener("mouseleave", () => {
    interval1 = setInterval(rollingInterval, 5000, 1);
  });
  onHoverRolling2.addEventListener("mouseover", () => {
    clearInterval(interval2);
  });
  onHoverRolling2.addEventListener("mouseleave", () => {
    interval2 = setInterval(rollingInterval, 5000, 2);
  });
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

function changeBanner(index, bannerNumber) {
  const oldBanner = document.getElementById(`rolling-banner-0${bannerNumber}`)
    .childNodes[1];
  const newBanner = document.createElement("div");
  newBanner.innerText = news_article[0].article[index];
  newBanner.style.transition = "transform 0.5s";
  newBanner.style.transform = "translateY(100%)";
  newBanner.className = "rolling-banner";
  document
    .getElementById(`rolling-banner-0${bannerNumber}`)
    .replaceChild(newBanner, oldBanner);
  setTimeout(function () {
    newBanner.style.transform = "translateY(0)";
  }, 10);
}

function addInitRollingData() {
  let firstRollingData = document.createElement("div");
  firstRollingData.innerHTML = news_article[0].article[0];
  let secondRollingData = document.createElement("div");
  secondRollingData.innerHTML = news_article[0].article[5];
  document.getElementById(`rolling-banner-01`).appendChild(firstRollingData);
  document.getElementById(`rolling-banner-02`).appendChild(secondRollingData);
}

function init() {
  clickNewsStand();
  clickRightAsideButton();
  clickLeftAsideButton();
  setDate();
}
refresh(logoAll);
// clickAllNews();
//clickMySubscribeNews();
// clickGridImage();
// clickCardListImage();
init();
rollingBanner();
