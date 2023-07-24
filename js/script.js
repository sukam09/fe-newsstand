import { setHeader } from "./setHeader.js";
import { initRolling } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";
import { initCategoryClass, initNewsInfo } from "./newsList.js";
import { initSpanEvent } from "./subscribe.js";
import { initModalBtn } from "./modal.js";
import { initUtilData } from "./utils.js";
import { addEventInSymbol } from "./viewHandler.js";
import { initDarkMode } from "./darkMode.js";
const init = async () => {
  setHeader();
  await initNewsInfo();
  await initUtilData();
  initPressGrid();
  await addEventInSymbol();
  initRolling();
  initCategoryClass();
  await initSpanEvent();
  await initModalBtn();
  initDarkMode();
};

init();
