import logoAll from "./json/news_image.json" assert { type: "json" };
import { setDate } from "./js/Date.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { addInitCategory } from "./js/category.js";

let MAX_PAGE_NUMBER = 3;
let MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
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
    document.getElementById("main-grid-01").style.display = "grid";
    document.getElementById("main-grid-02").style.display = "none";
  });
}

function clickCardListImage() {
  const cardListImage = document.getElementById("card-list-image");
  cardListImage.addEventListener("click", () => {
    document.getElementById("main-grid-01").style.display = "none";
    document.getElementById("main-grid-02").style.display = "flex";
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

function init() {
  clickNewsStand();
  setDate();
  rollingBanner();
  refresh(logoAll);
  clickRightAsideButton();
  clickLeftAsideButton();
  addInitCategory();
  clickCardListImage();
  clickGridImage();
}
init();
