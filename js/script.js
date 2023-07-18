import { setDate } from "./setDate.js";
import { initRolling } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";
import { drawNews, initCategoryClass, initNewsInfo } from "./newsList.js";
import { initSpanEvent } from "./subscribe.js";
import { initModalBtn } from "./modal.js";
import { initUtilData } from "./utils.js";
import { addEventInSymbol } from "./viewHandler.js";
import { initSubListArrow } from "./subscribeListView.js";
import { DATA } from "./const.js";

const init = async () => {
  setDate();
  await initUtilData();
  await initPressGrid();
  await addEventInSymbol();
  initRolling();
  initCategoryClass();
  await initSpanEvent();
  initModalBtn();
  initSubListArrow();
  await initNewsInfo();
  drawNews(DATA.now_category, 0);
};

init();
