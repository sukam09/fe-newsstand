import news_article from "../json/news_article.json" assert { type: "json" };
let interval1;
let interval2;
const rollingTime = 5000;

function rollingBanner() {
  addInitRollingData(1);
  addInitRollingData(2);
  document.addEventListener("DOMContentLoaded", () => {
    interval1 = setInterval(changeBanner, rollingTime, 1);
    setTimeout(() => {
      interval2 = setInterval(changeBanner, rollingTime, 2);
    }, 1000);
  });
  addRollingHoverEvent(1);
  addRollingHoverEvent(2);
}

function addInitRollingData(bannerNumber) {
  let rollingBanner = document.getElementById(
    `rolling-banner-0${bannerNumber}`
  );
  let startIndex, endIndex, secondIndex;
  if (bannerNumber === 1) {
    startIndex = 0;
    endIndex = parseInt(news_article.article.length / 2);
  } else {
    startIndex = Math.ceil(news_article.article.length / 2);
    endIndex = news_article.article.length;
  }
  secondIndex = startIndex + 1;
  let newsHTML = `<div class="rollingWrap"><ul>`;
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
    newsHTML += '<a href="#">' + news_article.article[startIndex] + "</a>";
  }
  newsHTML += "</ul></div>";
  rollingBanner.innerHTML = newsHTML;
}

function changeBanner(bannerNumber) {
  removePrevBanner(bannerNumber);
  changeCurrentBanner(bannerNumber);
  changeNextBanner(bannerNumber);
}

function removePrevBanner(bannerNumber) {
  document
    .querySelector(`#rolling-banner-0${bannerNumber} .rollingWrap .prev`)
    .classList.remove("prev");
}

function changeCurrentBanner(bannerNumber) {
  let currentBanner = document.querySelector(
    `#rolling-banner-0${bannerNumber} .rollingWrap .current`
  );
  currentBanner.classList.remove("current");
  currentBanner.classList.add("prev");
}

function changeNextBanner(bannerNumber) {
  let nextBanner = document.querySelector(
    `#rolling-banner-0${bannerNumber} .rollingWrap .next`
  );
  if (nextBanner.nextElementSibling == null)
    document
      .querySelector(
        `#rolling-banner-0${bannerNumber} .rollingWrap ul li:first-child`
      )
      .classList.add("next");
  else nextBanner.nextElementSibling.classList.add("next");
  nextBanner.classList.remove("next");
  nextBanner.classList.add("current");
}

function addRollingHoverEvent(bannerNumber) {
  const bannerHover = {};
  bannerHover[`bannerHover0${bannerNumber}`] = document.getElementById(
    `rolling-banner-0${bannerNumber}`
  );
  bannerHover[`bannerHover0${bannerNumber}`].addEventListener(
    "mouseover",
    () => {
      clearInterval(`interval${bannerNumber}`);
    }
  );
  bannerHover[`bannerHover0${bannerNumber}`].addEventListener(
    "mouseleave",
    () => {
      window[`interval${bannerNumber}`] = setInterval(
        changeBanner,
        rollingTime,
        bannerNumber
      );
    }
  );
}

export { rollingBanner };
