import { setDate } from "./src/bringDate.js";
import { initDisplay } from "./src/initialDisplay.js";
import { setGrid } from "./src/components/randomGrid.js";
import { appendPressItemli } from "./src/components/subGrid.js";
import { changeToGridView } from "./src/changeView.js";
import { initRolling } from "./src/components/rollingBanner.js";
import { drawListView } from "./src/components/listNews.js";

document.addEventListener("DOMContentLoaded", function () {
  setDate();
  initDisplay();
  initRolling();
  setGrid();
  appendPressItemli();
  changeToGridView();
  drawListView(0, 0);
});
