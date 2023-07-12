import { rolling } from "./components/headlineSection/headline/headline.js";
import { headlineSection } from "./components/headlineSection/headlineSection.js";
import { showGridPage } from "./components/mainSection/mainBody/mainContent/pressGrid/pressGrid.js";
import { mainSection } from "./components/mainSection/mainSection.js";
import { titleSection } from "./components/titleSection/titleSection.js";
import {
  addEventsOnGridItem,
  addEventsOnPageButton,
  addEventsOnSubButton,
  addEventsOnViewButton,
} from "./events.js";

window.addEventListener("DOMContentLoaded", async () => {
  const $root = document.getElementById("root");

  $root.innerHTML += titleSection();
  $root.innerHTML += await headlineSection();
  $root.innerHTML += await mainSection();

  showGridPage(0);

  addEventsOnPageButton();
  addEventsOnGridItem();
  addEventsOnSubButton(); // 미완
  addEventsOnViewButton();
  rolling();
});
