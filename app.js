import logoAll from "./json/news_image.json" assert { type: "json" };
import { setDate } from "./js/Date.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { addInitCategory } from "./js/category.js";
import { shuffle } from "./js/utils.js";

// let isGrid = true;
let MAX_PAGE_NUMBER = 3;
let MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
function renderGrid(logos) {
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

function clickAllNews() {
  const allNews = document.getElementById("main-left-01");
  allNews.addEventListener("click", () => {
    renderGrid(logoAll);
  });
}

function clickMySubscribeNews() {
  const subscribeNews = document.getElementById("main-left-02");
  subscribeNews.addEventListener("click", () => {
    renderGrid(logoSubscribe);
  });
}

function clickGridImage() {
  const gridImage = document.getElementById("grid-image");
  gridImage.addEventListener("click", (e) => {
    document.getElementById("card-list-image").src = "./img/card_list.svg";
    e.target.src = "./img/clicked_grid.png";
    document.getElementById("main-grid-01").style.display = "grid";
    document.getElementById("main-grid-02").style.display = "none";
    setMainContent(1);
  });
}

function clickCardListImage() {
  const cardListImage = document.getElementById("card-list-image");
  cardListImage.addEventListener("click", (e) => {
    document.getElementById("grid-image").src = "./img/grid.svg";
    e.target.src = "./img/clicked_card_list.png";
    document.getElementById("main-grid-01").style.display = "none";
    document.getElementById("main-grid-02").style.display = "flex";
    setMainContent(0);
  });
}

function setMainContent(isGrid) {
  clickRightAsideButton(isGrid);
  clickLeftAsideButton(isGrid);
  currentPageNumber = 0;
  leftAsideButton.style.visibility = "hidden";
  rightAsideButton.style.visibility = "visible";
  if (isGrid) renderGrid(logoAll);
}

function increaseGridPage() {
  if (currentPageNumber == MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentPageNumber++;
    renderGrid(logoAll);
    return;
  }
  currentPageNumber++;
  leftAsideButton.style.visibility = "visible";
  renderGrid(logoAll);
}

function increaseListPage() {
  if (currentPageNumber == MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentPageNumber++;
    return;
  }
  currentPageNumber++;
  leftAsideButton.style.visibility = "visible";
}

function clickRightAsideButton(isGrid) {
  if (isGrid === 1) {
    rightAsideButton.removeEventListener("click", increaseListPage);
    rightAsideButton.addEventListener("click", increaseGridPage);
  } else {
    rightAsideButton.removeEventListener("click", increaseGridPage);
    rightAsideButton.addEventListener("click", increaseListPage);
  }
}

function decreaseGridPage() {
  if (currentPageNumber == MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    currentPageNumber--;
    renderGrid(logoAll);
    return;
  }
  currentPageNumber--;
  rightAsideButton.style.visibility = "visible";
  renderGrid(logoAll);
}

function decreaseListPage() {
  if (currentPageNumber == MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    currentPageNumber--;
    return;
  }
  currentPageNumber--;
  rightAsideButton.style.visibility = "visible";
}

function clickLeftAsideButton(isGrid) {
  if (isGrid === 1) {
    leftAsideButton.removeEventListener("click", decreaseListPage);
    leftAsideButton.addEventListener("click", decreaseGridPage);
  } else {
    leftAsideButton.removeEventListener("click", decreaseGridPage);
    leftAsideButton.addEventListener("click", decreaseListPage);
  }
}

function init() {
  clickNewsStand();
  setDate();
  rollingBanner();
  renderGrid(logoAll);
  clickRightAsideButton(1);
  clickLeftAsideButton(1);
  addInitCategory();
  clickCardListImage();
  clickGridImage();
}
init();
