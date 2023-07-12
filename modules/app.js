import { rolling } from "./components/headlineSection/headline/headline.js";
import { headlineSection } from "./components/headlineSection/headlineSection.js";
import { showGridPage } from "./components/mainSection/mainBody/mainContent/pressGrid/pressGrid.js";
import {
  showNextPage,
  showPrevPage,
} from "./components/mainSection/mainBody/pageButtons/pageButtons.js";
import { mainSection } from "./components/mainSection/mainSection.js";
import { titleSection } from "./components/titleSection/titleSection.js";
import { qs } from "./utils.js";

window.addEventListener("DOMContentLoaded", async () => {
  const $root = document.getElementById("root");

  console.log($root);
  $root.innerHTML += titleSection();
  $root.innerHTML += await headlineSection();
  $root.innerHTML += await mainSection();

  showGridPage(0);

  const $leftListBtn = qs(".left_button");
  const $rightListBtn = qs(".right_button");

  $leftListBtn.addEventListener("click", () => showPrevPage("grid"));
  $rightListBtn.addEventListener("click", () => showNextPage("grid"));

  rolling();
});
