import { GRID, GLOBAL } from "./variable.js";

function initGrid() {
  try {
    let iconIndex = GLOBAL.GRID_CURRENT_PAGE * GRID.NEWS_NUM;
    for (let i = 0; i < GRID.ROW_NUM; i++) {
      const gridRow = document.createElement("ul");
      gridRow.className = "grid-row";
      for (let j = 0; j < GRID.COL_NUM; j++) {
        const gridLi = document.createElement("li");
        const PressLogo = document.createElement("img");
        PressLogo.className = "press-logo";

        PressLogo.src = GLOBAL.NEWS_DATA[iconIndex++].path;

        gridLi.appendChild(PressLogo);
        gridRow.appendChild(gridLi);
      }
      GLOBAL.DOM.GRID_VIEW.appendChild(gridRow);
      updateGrid();
    }
  } catch (e) {
    console.error(e);
  }
}

function updateGrid() {
  try {
    if (GLOBAL.NEWS_DATA) {
      let iconIndex = GLOBAL.GRID_CURRENT_PAGE * GRID.NEWS_NUM;
      const gridRow = document.querySelectorAll(".grid ul");

      gridRow.forEach((ul) => {
        const gridLi = ul.querySelectorAll("li");
        gridLi.forEach((li) => {
          const PressLogo = li.querySelector(".press-logo");
          PressLogo.src = GLOBAL.NEWS_DATA[iconIndex++].path;
        });
      });
    } else {
      throw "empty data!";
    }
  } catch (e) {
    console.log(e);
  }
}

function moveGrid(direction) {
  GLOBAL.GRID_CURRENT_PAGE += direction;
  if (GLOBAL.GRID_CURRENT_PAGE === GRID.MIN_PAGE) {
    GLOBAL.DOM.LEFT_BTN.style.display = "none";
  } else if (GLOBAL.GRID_CURRENT_PAGE === GRID.MAX_PAGE) {
    GLOBAL.DOM.RIGHT_BTN.style.display = "none";
  } else {
    GLOBAL.DOM.RIGHT_BTN.style.display = "block";
    GLOBAL.DOM.LEFT_BTN.style.display = "block";
  }
  updateGrid();
}

export { initGrid, moveGrid };
