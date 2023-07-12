import { pressItem } from "./pressItem/pressItem.js";

const NUM_IN_A_GRID = 24;
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
