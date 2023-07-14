import { createMainContent } from "./mainContent/mianContent.js";
import { createPressGrid } from "./mainContent/pressGrid/pressGrid.js";
import {
  createLeftPageButton,
  createRightPageButton,
} from "./pageButtons/pageButtons.js";

export async function createMainBody() {
  return `
    <div class="main_body">
      ${createRightPageButton()}
      ${await createMainContent()}
      ${createLeftPageButton()}
    </div>
  `;
}

export function initGridView(pressDataArr) {
  // create grid
  const $gridContainer = document.getElementById("grid_container");
  for (let i = 0; i < MAX_PAGE; i++) {
    $gridContainer.innerHTML += createPressGrid(pressDataArr, i);
  }

  // addEvent
  const pressItems = $gridContainer.getElementsByClassName("grid_item");
  for (let i = 0; i < pressItems.length; i++) {
    pressItems[i].addEventListener("mouseover", (e) => {
      e.currentTarget.getElementsByClassName(
        "sub_button_container"
      )[0].style.display = "flex";
    });
    pressItems[i].addEventListener("mouseout", (e) => {
      e.currentTarget.getElementsByClassName(
        "sub_button_container"
      )[0].style.display = "none";
    });
  }

  const gridButton = document.getElementById("grid_button");
  gridButton.className = "view_clicked";
}
