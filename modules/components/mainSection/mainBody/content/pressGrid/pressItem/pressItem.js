import { createSubButton } from "./subButton/subButton.js";

export function pressItem(press) {
  return `
  <li class="grid_item" id=${press.id}>
    <img class="light_press_logo" src=${press.lightSrc}  / >
    <img class="dark_press_logo" src=${press.darkSrc}  / >
    ${createSubButton()}
  </li>
  `;
}
