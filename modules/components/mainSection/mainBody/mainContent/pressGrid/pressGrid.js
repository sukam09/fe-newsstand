import { NUM_IN_A_GRID } from "../../../../../pageState.js";
import { qs } from "../../../../../utils.js";
import { hideListContainer } from "../pressList/pressList.js";
import { pressItem } from "./pressItem/pressItem.js";

export function pressGrid(pressDataArr, page) {
  let pressGridItems = "";
  for (let i = 0; i < NUM_IN_A_GRID; i++) {
    const idx = page * NUM_IN_A_GRID + i;
    pressGridItems += pressItem(pressDataArr[idx]);
  }

  return `
    <ul id="grid_page_${page}" class="press_grid">
      ${pressGridItems}
    </ul>
    `;
}

export function showGridPage(page) {
  const pressGrid = document.getElementById(`grid_page_${page}`);
  pressGrid.style.display = "grid";
}

export function hideGridPage(page) {
  const pressGrid = document.getElementById(`grid_page_${page}`);
  pressGrid.style.display = "none";
}

export function hideGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "none";
}
export function showGridContainer() {
  const $gridContainer = qs("#grid_container");
  $gridContainer.style.display = "block";
}
