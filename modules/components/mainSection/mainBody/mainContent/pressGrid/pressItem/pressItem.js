import { subButton } from "./subButton/subButton.js";

export function pressItem(press) {
  return `
  <li class="grid_item">
    <img id=${press.id} src=${press.src}  / >
    ${subButton()}
  </li>
  `;
}
