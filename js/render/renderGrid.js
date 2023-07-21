import { shuffle } from "../../utils/utils.js";
import Stores from "../core/Store.js";
import { addEventArrowGrid } from "../addEventArrowGrid.js";

const gridMain = document.getElementById("main-grid");

const renderGrid = (logos) => {
  shuffle(logos);
  makeGrid(logos);
  addEventArrowGrid(logos);
};

function makeGrid(logos) {
  const COUNT_PER_PAGE = 24;
  gridMain.innerHTML = "";
  let outerDiv = "";
  for (
    let logoIndex = Stores.getPage() * COUNT_PER_PAGE;
    logoIndex < COUNT_PER_PAGE * Stores.getPage() + 24;
    logoIndex++
  ) {
    outerDiv += `<div class="grid-list"><div class="hover-subscribe-button"><img src="./img/subscribe_button.svg"></div>${drawLogo(
      logos,
      logoIndex
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
