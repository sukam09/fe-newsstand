import { NUM_IN_A_GRID } from "../../../../../store/pageState.js";
import { shuffleArray } from "../../../../../utils.js";

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

function pressItem(press) {
  return `
  <li class="grid_item" id=${press.id}>
    <img class="light_press_logo" src=${press.lightSrc}  / >
    <img class="dark_press_logo" src=${press.darkSrc}  / >
    ${createSubButton()}
  </li>
  `;
}

// 구독버튼 생성
function createSubButton() {
  return `
  <div class="sub_button_container">
    <button class="sub_button"> + 구독하기</button>
    <button class="unsub_button"> x 해지하기</button>
  </div>
  `;
}
