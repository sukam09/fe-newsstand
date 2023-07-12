import { mainContent } from "./mainContent/mianContent.js";
import { pressGrid } from "./mainContent/pressGrid/pressGrid.js";
import { leftButton, rightButton } from "./pageButtons/pageButtons.js";

export async function mainBody() {
  return `
    <div class="main_body">
      ${rightButton()}
      ${await mainContent()}
      ${leftButton()}
    </div>
  `;
}

export function initGridView(pressDataArr) {
  const $mainSection = document.getElementById("main_section");

  // create grid
  const $gridContainer = document.getElementById("grid_container");
  for (let i = 0; i < MAX_PAGE; i++) {
    $gridContainer.innerHTML += pressGrid(pressDataArr, i);
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
