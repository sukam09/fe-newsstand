import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import {
  initPageObservers,
  showGridPage,
} from "./controller/pageController.js";
import { initEvents } from "./controller/events.js";
import { setCategoryData, setPressData } from "./store/dataState.js";
import { initPageState } from "./store/pageState.js";
import { initComponents } from "./components/initComponents.js";

(async function init() {
  //fetch data
  await setCategoryData();
  await setPressData();

  initPageState();

  await initComponents();

  initEvents();
  initPageObservers();

  startRollingAnimation();
  showGridPage(0);
})();
