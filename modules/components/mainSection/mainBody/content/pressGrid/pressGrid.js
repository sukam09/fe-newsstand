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
    `.trim();
}

export function createEmptyPressGrid(page) {
  let emptyItems = "";
  for (let i = 0; i < NUM_IN_A_GRID; i++) {
    emptyItems += createEmptyPressItem(i);
  }

  return `
    <ul id="mode_my_grid_page_${page}" class="press_grid">
      ${emptyItems}
    </ul>
    `.trim();
}

/**
 *
 * @param {string} key 페이지의 인덱스
 * @param {Object} press 하나의 언론사 오브젝트
 * @returns
 */
export function createPressItem(key, press) {
  console.log(press);
  return `
  <li key="${key}" class="grid_item" id="press_${press.id}">
    <img class="light_press_logo" src=${press.lightSrc}  / >
    <img class="dark_press_logo" src=${press.darkSrc}  / >
    ${createSubButton()}
    ${createUnsubButton()}
  </li>
  `.trim();
}
export function createEmptyPressItem(key) {
  return `
  <li key="${key}" class="grid_empty_item">
  </li>
  `.trim();
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
