import { NUM_IN_A_GRID } from "../../../../../store/pageState.js";

export function createPressGrid(pressList, page) {
  let pressGridItems = "";

  for (let i = 0; i < NUM_IN_A_GRID; i++) {
    const idx = page * NUM_IN_A_GRID + i;
    pressGridItems += createPressItem(`${page}_${i}`, pressList[idx]);
  }

  return `
    <ul id="mode_all_grid_page_${page}" class="press_grid">
      ${pressGridItems}
    </ul>
    `;
}

export function createEmptyPressGrid(page) {
  return `
    <ul id="mode_my_grid_page_${page}" class="press_grid">
    </ul>
    `;
}

function createPressItem(key, press) {
  return `
  <li key="${key}" class="grid_item" id="press_${press.id}">
    <img class="light_press_logo" src=${press.lightSrc}  / >
    <img class="dark_press_logo" src=${press.darkSrc}  / >
    ${createSubButton()}
    ${createUnsubButton()}
  </li>
  `;
}

// 구독버튼 생성
function createSubButton() {
  return `
  <div class="sub_button_container">
    <button class="sub_button"> + 구독하기</button>
  </div>
  `;
}

function createUnsubButton() {
  return `
  <div class="unsub_button_container">
    <button class="unsub_button"> x 해지하기</button>
  </div>
  `;
}
