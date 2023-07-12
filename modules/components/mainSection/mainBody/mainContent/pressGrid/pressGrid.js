import { pressItem } from "./pressItem/pressItem.js";

export const MAX_GRID_PAGE = 4;
const NUM_IN_A_GRID = 24;
export let gridPage = 0;

export function incGridPage() {
  gridPage >= MAX_GRID_PAGE - 1 ? (gridPage = MAX_GRID_PAGE - 1) : gridPage++;
}
export function decGridPage() {
  gridPage <= 0 ? (gridPage = 0) : gridPage--;
}

export function pressGrid(pressDataArr, page) {
  console.log(pressDataArr);
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
  console.log("show", page);

  const pressGrid = document.getElementById(`grid_page_${page}`);
  pressGrid.style.display = "grid";
}

export function hiddenGridPage(page) {
  console.log("hidden", page);
  const pressGrid = document.getElementById(`grid_page_${page}`);
  pressGrid.style.display = "none";
}

export function showNextGridPage() {
  hiddenGridPage(gridPage);
  gridPage += 1;
  if (gridPage >= MAX_PAGE) {
    gridPage = MAX_PAGE - 1;
  }
  showGridPage(gridPage);
  showGridPageButton();
}

// 그리드 이전 페이지 전환
export function showPrevGridPage() {
  hiddenGridPage(gridPage);
  gridPage -= 1;
  if (gridPage < 0) {
    gridPage = 0;
  }
  showGridPage(gridPage);
  showGridPageButton();
}
