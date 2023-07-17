import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import { createHeadlineSection } from "./components/headlineSection/headlineSection.js";
import { showGridPage } from "./components/mainSection/mainBody/content/pressGrid/pressGrid.js";
import { createMainSection } from "./components/mainSection/mainSection.js";
import { createTitleSection } from "./components/titleSection/titleSection.js";
import {
  addObserverOnGridPage,
  addObserverOnListPage,
  addObserverOnPageType,
} from "./controller/pageController.js";
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
  addObserverOnGridPage();
  addObserverOnListPage();

  addEventsOnGridItem();
  addEventsOnSubButton(); // 미완
  addEventsOnViewButton();
  addEventsOnCategoryItem();
  addEventsOnTitle();
  addEventsOnRollingList();
  startRollingAnimation();
  showGridPage(0);

  addObserverOnPageType();
})();
