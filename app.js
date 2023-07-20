import { setDate } from "./src/bringDate.js";
import { initDisplay } from "./src/initialDisplay.js";
import { setGrid } from "./src/randomGrid.js";
import { appendPressItemli } from "./src/subGrid.js";
import { changeToGridView } from "./src/changeView.js";
import { initRolling } from "./src/rollingBanner.js";
import { drawListView } from "./src/listNews.js";

document.addEventListener("DOMContentLoaded", function () {
  setDate();
  initDisplay();
  initRolling();
  setGrid();
  appendPressItemli();
  changeToGridView();
  drawListView(0, 0);
});
