import logo from "../json/news_image.json" assert { type: "json" };
import { shuffle, changeImageSrc } from "./utils.js";
import {
  drawInitCategory,
  progressInterval,
  drawNewsHeader,
  drawNewsDiv,
  increaseListPage,
  decreaseListPage,
} from "./category.js";

const MAX_PAGE_NUMBER = 3;
const MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const gridMain = document.getElementById("main-grid-01");
const listMain = document.getElementById("main-grid-02");

function renderMain(isGrid) {
  if (isGrid) renderGrid(logo);
  else renderCard();
}

function renderCard() {
  gridMain.style.display = "none";
  listMain.style.display = "flex";
  leftAsideButton.style.visibility = "visible";
  rightAsideButton.style.visibility = "visible";
  drawInitCategory();
  drawNewsHeader();
  drawNewsDiv();
}

function renderGrid(logos) {
  const COUNT_PER_PAGE = 24;
  const mainGrid = document.getElementById("main-grid-01");
  clearInterval(progressInterval);
  shuffle(logos);
  gridMain.style.display = "grid";
  listMain.style.display = "none";
  mainGrid.innerHTML = "";
  for (
    let LOGO_INDEX = currentPageNumber * COUNT_PER_PAGE;
    LOGO_INDEX < COUNT_PER_PAGE * currentPageNumber + 24;
    LOGO_INDEX++
  ) {
    const outerDiv = document.createElement("div");
    outerDiv.append(drawLogo(logos, LOGO_INDEX));
    mainGrid.append(outerDiv);
  }
  addAsideClickEvent(1);
}

function drawLogo(logos, LOGO_INDEX) {
  if (logos[LOGO_INDEX] != undefined) {
    const newsLogo = document.createElement("img");
    newsLogo.src = `${logos[LOGO_INDEX].logo}`;
    return newsLogo;
  }
  return "";
}

function clickGridImage() {
  const gridImage = document.getElementById("grid-image");
  gridImage.addEventListener("click", (e) => {
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/card_list.svg"
    );
    changeImageSrc(e.target, "./img/clicked_grid.png");
    currentPageNumber = 0;
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
  renderMain(isGrid);
}

function addAsideClickEvent(isGrid) {
  clickRightAsideButton(isGrid);
  clickLeftAsideButton(isGrid);
}

function increaseGridPage() {
  if (currentPageNumber == MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentPageNumber++;
    renderGrid(logo);
    return;
  }
  leftAsideButton.style.visibility = "visible";
  currentPageNumber++;
  renderGrid(logo);
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
clickLeftAsideButton();
export { renderMain, leftAsideButton, rightAsideButton };
