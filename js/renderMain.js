import logo from "../json/news_image.json" assert { type: "json" };
import { shuffle, changeImageSrc } from "./utils.js";
import { addInitCategory, progressInterval } from "./category.js";
import news from "../json/news.json" assert { type: "json" };
console.log(news.News[0]);

let MAX_PAGE_NUMBER;
const MIN_PAGE_NUMBER = 0;
let currentPageNumber;
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const gridMain = document.getElementById("main-grid-01");
const listMain = document.getElementById("main-grid-02");

function renderMain(isGrid) {
  if (isGrid) renderGrid(logo);
  else renderCard();
}

function renderCard() {
  currentPageNumber = 0;
  MAX_PAGE_NUMBER = news.News.length - 1;
  gridMain.style.display = "none";
  listMain.style.display = "flex";
  addInitCategory();
  addNewsHeader();
}

function addNewsHeader() {
  const news_header = document.querySelector(".news_header");
  news_header.innerHTML = "";
  let new_div = `<div class="news-header-div"><img class="newsThumbnail" src="${news.News[currentPageNumber].thumbnail}"><span class="newsEditTime">${news.News[currentPageNumber].editTime}</span><img class="subscribeButton" src="./img/subscribeButton.svg"></div>`;
  news_header.innerHTML = new_div;
}

function renderGrid(logos) {
  currentPageNumber = 0;
  MAX_PAGE_NUMBER = 3;
  const COUNT_PER_PAGE = 24;
  const mainGrid = document.getElementById("main-grid-01");
  clearInterval(progressInterval);
  shuffle(logos);
  gridMain.style.display = "grid";
  listMain.style.display = "none";
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
  addAsideClickEvent(1);
}

function clickGridImage() {
  const gridImage = document.getElementById("grid-image");
  gridImage.addEventListener("click", (e) => {
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/card_list.svg"
    );
    changeImageSrc(e.target, "./img/clicked_grid.png");
    setMainContent(1);
  });
}

function clickCardListImage() {
  const cardListImage = document.getElementById("card-list-image");
  cardListImage.addEventListener("click", (e) => {
    changeImageSrc(document.getElementById("grid-image"), "./img/grid.svg");
    changeImageSrc(e.target, "./img/clicked_card_list.png");
    setMainContent(0);
  });
}

function setMainContent(isGrid) {
  addAsideClickEvent(isGrid);
  currentPageNumber = 0;
  leftAsideButton.style.visibility = "hidden";
  rightAsideButton.style.visibility = "visible";
  renderMain(isGrid);
}

function addAsideClickEvent(isGrid) {
  clickRightAsideButton(isGrid);
  clickLeftAsideButton(isGrid);
}

function increaseGridPage() {
  if (currentPageNumber === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentPageNumber++;
    renderGrid(logo);
    return;
  }
  leftAsideButton.style.visibility = "visible";
  currentPageNumber++;
  renderGrid(logo);
}

function increaseListPage() {
  if (currentPageNumber === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentPageNumber++;
    addNewsHeader();
    return;
  }
  leftAsideButton.style.visibility = "visible";
  currentPageNumber++;
  addNewsHeader();
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
  if (currentPageNumber === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    currentPageNumber--;
    renderGrid(logo);
    return;
  }
  rightAsideButton.style.visibility = "visible";
  currentPageNumber--;
  renderGrid(logo);
}

function decreaseListPage() {
  console.log(currentPageNumber);
  if (currentPageNumber === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    currentPageNumber--;
    addNewsHeader();
    return;
  }
  rightAsideButton.style.visibility = "visible";
  currentPageNumber--;
  addNewsHeader();
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

clickCardListImage();
clickGridImage();
clickRightAsideButton();

export { renderMain };
