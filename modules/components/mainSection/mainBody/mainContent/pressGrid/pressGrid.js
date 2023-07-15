import { NUM_IN_A_GRID } from "../../../../../state/pageState.js";
import { qs, shuffleArray } from "../../../../../utils.js";
import { pressItem } from "./pressItem/pressItem.js";

export function createPressGrid(pressDataArr, page) {
  let pressGridItems = "";
  const shuffledPressDataArr = shuffleArray(pressDataArr);
  for (let i = 0; i < NUM_IN_A_GRID; i++) {
    const idx = page * NUM_IN_A_GRID + i;
    pressGridItems += pressItem(shuffledPressDataArr[idx]);
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
