import {
  leftAsideButton,
  rightAsideButton,
  gridMain,
  listMain,
} from "./renderMain.js";
import { shuffle } from "../../utils/utils.js";
import { progressInterval } from "../category.js";
import logo from "../../json/news_image.json" assert { type: "json" };

const MAX_PAGE_NUMBER = 3;
const MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
let logos = logo;

function renderGrid(currentPageNumber) {
  const COUNT_PER_PAGE = 24;
  if (clearInterval != undefined) clearInterval(progressInterval);
  shuffle(logos);
  gridMain.style.display = "grid";
  listMain.style.display = "none";
  gridMain.innerHTML = "";
  for (
    let LOGO_INDEX = currentPageNumber * COUNT_PER_PAGE;
    LOGO_INDEX < COUNT_PER_PAGE * currentPageNumber + 24;
    LOGO_INDEX++
  ) {
    const outerDiv = document.createElement("div");
    outerDiv.append(drawLogo(LOGO_INDEX));
    gridMain.append(outerDiv);
  }
}

function drawLogo(LOGO_INDEX) {
  if (logos[LOGO_INDEX] != undefined) {
    const newsLogo = document.createElement("img");
    newsLogo.src = `${logos[LOGO_INDEX].logo}`;
    return newsLogo;
  }
  return "";
}

function increaseGridPage() {
  if (currentPageNumber === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    currentPageNumber++;
    renderGrid(currentPageNumber);
    return;
  }
  leftAsideButton.style.visibility = "visible";
  currentPageNumber++;
  renderGrid(currentPageNumber);
}

function decreaseGridPage() {
  if (currentPageNumber === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    currentPageNumber--;
    renderGrid(currentPageNumber);
    return;
  }
  rightAsideButton.style.visibility = "visible";
  currentPageNumber--;
  renderGrid(currentPageNumber);
}

export { renderGrid, increaseGridPage, decreaseGridPage };
