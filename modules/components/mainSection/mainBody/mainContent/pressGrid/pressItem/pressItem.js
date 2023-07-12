import { subButton } from "../subButton/subButton.js";
import { unSubButton } from "../subButton/unSubButton.js";

export function pressItem(press) {
  // $newPressItem.addEventListener("mouseover", (e) => {
  //   const $subButton = e.currentTarget.getElementsByClassName(
  //     "sub_button_container"
  //   )[0];
  //   $subButton.style.display = "flex";
  // });

  // $newPressItem.addEventListener("mouseout", (e) => {
  //   const $subButton = e.currentTarget.getElementsByClassName(
  //     "sub_button_container"
  //   )[0];
  //   $subButton.style.display = "none";

  return `
  <li class="grid_item">
    <img id=${press.id} src=${press.src}  / >
    ${subButton()}
    ${unSubButton()}
  </li>
  `;
}
