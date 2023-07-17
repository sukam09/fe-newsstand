import { NUM_IN_A_GRID } from "../../../../../state/pageState.js";
import { qs, shuffleArray } from "../../../../../utils.js";
import { pressItem } from "./pressItem/pressItem.js";

export function createPressGrid(pressList, page) {
  let pressGridItems = "";
  const shuffledPressDataArr = shuffleArray(pressList);
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
