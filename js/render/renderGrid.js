import { gridMain, listMain } from "./renderMain.js";
import { shuffle } from "../../utils/utils.js";
import Stores from "../../utils/Store.js";
import { addEventArrowGrid } from "../addEventArrowGrid.js";

const renderGrid = (logos) => {
  shuffle(logos);
  makeGrid(logos);
  addEventArrowGrid(logos);
};

function makeGrid(logos) {
  const COUNT_PER_PAGE = 24;
  gridMain.style.display = "grid";
  listMain.style.display = "none";
  gridMain.innerHTML = "";
  let outerDiv = "";
  for (
    let LOGO_INDEX = Stores.getPage() * COUNT_PER_PAGE;
    LOGO_INDEX < COUNT_PER_PAGE * Stores.getPage() + 24;
    LOGO_INDEX++
  ) {
    outerDiv += `<div class="grid-list"><div class="hover-subscribe-button"><img src="./img/subscribe_button.svg"></div>${drawLogo(
      logos,
      LOGO_INDEX
    )}</div>`;
  }
  gridMain.innerHTML = outerDiv;
}

function drawLogo(logos, LOGO_INDEX) {
  if (logos[LOGO_INDEX]) {
    const newsLogo = `<img class="grid-image" src="${logos[LOGO_INDEX].logo}">`;
    return newsLogo;
  }
  return "";
}

export { renderGrid, makeGrid };
