import { startRollingAnimation } from "./components/headlineSection/headline/headline.js";
import { initCategoryData, initPressData } from "./store/dataState.js";
import { MODE_ALL, initPageState } from "./store/pageState.js";
import { initComponents } from "./components/initComponents.js";
import { initSubStateList } from "./store/subState.js";
import { initEvents, initObservers } from "./controller/initControllers.js";
import { showGridPage } from "./controller/pageController/pageController.js";

(async function init() {
  //fetch data
  await initCategoryData();
  await initPressData();
  // 상수
  initPageState();
  initSubStateList();

  await initComponents();

  // init controllers
  initEvents();
  initObservers();

  // 초기 화면
  startRollingAnimation();
  showGridPage(MODE_ALL, 0);
})();
