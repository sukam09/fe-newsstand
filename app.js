import { setDate } from "./src/bringDate.js";
import { initDisplay } from "./src/initialDisplay.js";
import { initGrid } from "./src/components/gridView.js";
import {
  addEventToViewOption,
  changeToGridViewDisplay,
} from "./src/changeView.js";
import { initRolling } from "./src/components/rollingBanner.js";
import { drawListView } from "./src/components/listNews.js";
import { initSubscribe } from "./src/observer/subscriber.js";

document.addEventListener("DOMContentLoaded", async function () {
  setDate();
  initDisplay();
  initRolling();
  initSubscribe();
  await initGrid();
  changeToGridViewDisplay();
  drawListView(0, 0);
  addEventToViewOption();
});
