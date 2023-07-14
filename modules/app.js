import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import { createHeadlineSection } from "./components/headlineSection/headlineSection.js";
import { showGridPage } from "./components/mainSection/mainBody/mainContent/pressGrid/pressGrid.js";
import { createMainSection } from "./components/mainSection/mainSection.js";
import { createTitleSection } from "./components/titleSection/titleSection.js";
import {
  addEventsOnCategoryItem,
  addEventsOnGridItem,
  addEventsOnPageButton,
  addEventsOnRollingList,
  addEventsOnSubButton,
  addEventsOnTitle,
  addEventsOnViewButton,
} from "./events.js";

window.addEventListener("DOMContentLoaded", async () => {
  const $root = document.getElementById("root");
  $root.innerHTML += createTitleSection();
  $root.innerHTML += await createHeadlineSection();
  $root.innerHTML += await createMainSection();

  addEventsOnPageButton();
  addEventsOnGridItem();
  addEventsOnSubButton(); // 미완
  addEventsOnViewButton();
  addEventsOnCategoryItem();
  addEventsOnTitle();
  startRollingAnimation();
  addEventsOnRollingList();
  showGridPage(0);
});
