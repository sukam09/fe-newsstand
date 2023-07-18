import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import { showGridPage } from "./controller/pageController.js";
import { initCategoryData, initPressData } from "./store/dataState.js";
import { initPageState } from "./store/pageState.js";
import { initComponents } from "./components/initComponents.js";
import { initSubButtonStateList } from "./store/gridState.js";
import { initEvents, initObservers } from "./controller/controllers.js";

(async function init() {
  //fetch data
  await initCategoryData();
  await initPressData();
  initPageState();
  initSubButtonStateList();

  await initComponents();

  initEvents();
  initObservers();

  startRollingAnimation();
  showGridPage(0);
})();
