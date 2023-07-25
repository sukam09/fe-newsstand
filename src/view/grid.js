import { CONSTANT, MODE, GLOBAL } from "../model/variable.js";
import { getState, subscribe } from "../controller/observer.js";
import { toggleSubscription, toggleDarkMode, gridCurrentPage, currentMode } from "../model/store.js";

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
  const curMode = getState(currentMode);
  if (curMode === MODE.LIST_ALL || curMode === MODE.LIST_SUB) return;

  document.querySelector(".list-view").style.display = "none";
  document.querySelector(".grid-view").style.display = "flex";

  let iconIndex = getState(gridCurrentPage) * CONSTANT.GRID_NEWS_NUM;
  const pressLogo = document.querySelectorAll(".press-logo");
  const targetData = curMode === MODE.GRID_ALL ? GLOBAL.NEWS_DATA : GLOBAL.SUBSCRIBE_NEWS_DATA;

  if (getState(toggleDarkMode)) {
    pressLogo.forEach((img) => {
      img.src = targetData[iconIndex] ? targetData[iconIndex++].path_dark : "";
    });
  } else {
    pressLogo.forEach((img) => {
      img.src = targetData[iconIndex] ? targetData[iconIndex++].path : "";
    });
  }
}

subscribe(toggleSubscription, drawGrid);

subscribe(gridCurrentPage, drawGrid);
subscribe(currentMode, drawGrid);
subscribe(toggleDarkMode, drawGrid);

export { initGrid, drawGrid };
