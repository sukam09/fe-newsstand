import {
  leftAsideButton,
  rightAsideButton,
  gridMain,
  listMain,
} from "./renderMain.js";
import { shuffle } from "../../utils/utils.js";
import { progressInterval } from "../category.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import Stores from "../Store.js";

const MAX_PAGE_NUMBER = 3;
const MIN_PAGE_NUMBER = 0;
let logos = logo;

function renderGrid() {
  console.log(Stores.getPage());
  const COUNT_PER_PAGE = 24;
  if (clearInterval != undefined) clearInterval(progressInterval);
  shuffle(logos);
  gridMain.style.display = "grid";
  listMain.style.display = "none";
  gridMain.innerHTML = "";
  for (
    let LOGO_INDEX = Stores.getPage() * COUNT_PER_PAGE;
    LOGO_INDEX < COUNT_PER_PAGE * Stores.getPage() + 24;
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
  if (Stores.getPage() === MAX_PAGE_NUMBER - 1) {
    rightAsideButton.style.visibility = "hidden";
    Stores.setPage(Stores.getPage() + 1);
    renderGrid();
    return;
  }
  leftAsideButton.style.visibility = "visible";
  Stores.setPage(Stores.getPage() + 1);
  renderGrid();
}

function decreaseGridPage() {
  if (Stores.getPage() === MIN_PAGE_NUMBER + 1) {
    leftAsideButton.style.visibility = "hidden";
    Stores.setPage(Stores.getPage() - 1);
    renderGrid();
    return;
  }
  rightAsideButton.style.visibility = "visible";
  Stores.setPage(Stores.getPage() - 1);
  renderGrid();
}

export { renderGrid, increaseGridPage, decreaseGridPage };
