import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import { createHeadlineSection } from "./components/headlineSection/headlineSection.js";
import { showGridPage } from "./components/mainSection/mainBody/mainContent/pressGrid/pressGrid.js";
import { subscribe } from "./components/mainSection/mainBody/mainContent/pressGrid/pressItem/subButton/subButton.js";
import { initObserver } from "./components/mainSection/mainHeader/mainHeader.js";
import { createMainSection } from "./components/mainSection/mainSection.js";
import {
  createTitleSection,
  handleTest,
} from "./components/titleSection/titleSection.js";
import { addObserver, getState, setState } from "./core/observer.js";
import {
  addEventsOnThemeButton,
  addEventsOnCategoryItem,
  addEventsOnGridItem,
  addEventsOnPageButton,
  addEventsOnRollingList,
  addEventsOnSubButton,
  addEventsOnTitle,
  addEventsOnViewButton,
} from "./events.js";
import { setCategoryData, setPressData } from "./state/dataState.js";
import { initPageState } from "./state/pageState.js";
import { qs } from "./utils.js";

(async function init() {
  await setCategoryData();
  await setPressData();
  initPageState();

  const $root = qs("#root");

  $root.innerHTML += createTitleSection();
  $root.innerHTML += await createHeadlineSection();
  $root.innerHTML += await createMainSection();

  addEventsOnThemeButton();
  addEventsOnPageButton();
  addEventsOnGridItem();
  addEventsOnSubButton(); // 미완
  addEventsOnViewButton();
  addEventsOnCategoryItem();
  addEventsOnTitle();
  addEventsOnRollingList();
  startRollingAnimation();
  showGridPage(0);

  initObserver();
})();
