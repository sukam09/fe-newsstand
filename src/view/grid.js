import { CONSTANT, GLOBAL } from "../model/variable.js";

function initGrid(parentNode) {
  const dom = document.createElement("div");
  dom.className = "grid-view";

  for (let i = 0; i < CONSTANT.GRID_ROW_NUM; i++) {
    const gridRow = document.createElement("ul");
    gridRow.className = "grid-row";
    for (let j = 0; j < CONSTANT.GRID_COL_NUM; j++) {
      const gridLi = document.createElement("li");
      const pressLogo = document.createElement("img");
      pressLogo.className = "press-logo";
      gridLi.appendChild(pressLogo);
      gridRow.appendChild(gridLi);
    }
    dom.appendChild(gridRow);
  }

  parentNode.appendChild(dom);
}

function drawGrid() {
  let iconIndex = GLOBAL.GRID_CURRENT_PAGE * CONSTANT.GRID_NEWS_NUM;
  const pressLogo = document.querySelectorAll(".press-logo");
  const targetData = GLOBAL.NEWS_DATA;

  pressLogo.forEach((img) => {
    img.src = targetData[iconIndex] ? targetData[iconIndex++].path : "";
  });
}

export { initGrid, drawGrid };
