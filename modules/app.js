import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import {
  initPageObservers,
  showGridPage,
} from "./controller/pageController.js";
import { initEvents } from "./controller/initEvents.js";
import { initCategoryData, initPressData } from "./store/dataState.js";
import { initPageState } from "./store/pageState.js";
import { initComponents } from "./components/initComponents.js";
import { addObserverOnPressData } from "./controller/gridController.js";

(async function init() {
  //fetch data
  await initCategoryData();
  await initPressData();

  initPageState();

  await initComponents();

  initEvents();
  initPageObservers();
  addObserverOnPressData();

  startRollingAnimation();
  showGridPage(0);
})();
