import { initDarkMode } from "./darkMode.js";
import { initPressGrid } from "../view/gridView.js";
import { initModalBtn } from "../component/modal.js";
import { initCategoryClass, initNewsInfo } from "../view/listView.js";
import { setHeader } from "../component/setHeader.js";
import { initSpanEvent } from "../subscribe/subscribe.js";
import { initUtilData } from "./utils.js";
import { addEventInSymbol } from "../view/viewHandler.js";
import { initRolling } from "../component/newsRolling.js";

async function initValue() {
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
}

export default initValue;
