import { qs } from "../../../../utils.js";
import {
  MAX_GRID_PAGE,
  decGridPage,
  gridPage,
  hideGridPage,
  incGridPage,
  showGridPage,
} from "../mainContent/pressGrid/pressGrid.js";

const GRID = "grid";

export function rightButton() {
  return `
    <img
      src="./assets/icons/rightbutton.png"
      class="right_button"
      alt=""
    />
    `;
}

export function leftButton() {
  return `
        <img
          src="./assets/icons/leftbutton.png"
          class="left_button"
          alt=""
        />
        `;
}

export function showNextPage(type) {
  if (type === GRID) {
    hideGridPage(gridPage);
    incGridPage();
    showGridPage(gridPage);
    controllButtonStyle(GRID);
  }
}

export function showPrevPage(type) {
  if (type === GRID) {
    hideGridPage(gridPage);
    decGridPage();
    showGridPage(gridPage);
    controllButtonStyle(GRID);
  }
}

function controllButtonStyle(type) {
  const $leftButton = qs(".left_button");
  const $rightButton = qs(".right_button");

  if (type === GRID) {
    if (gridPage >= MAX_GRID_PAGE - 1) {
      $leftButton.style.display = "block";
      $rightButton.style.display = "none";
    } else if (gridPage <= 0) {
      $leftButton.style.display = "none";
      $rightButton.style.display = "block";
    } else {
      $leftButton.style.display = "block";
      $rightButton.style.display = "block";
    }
  }
}
