import { setDate } from "./src/bringDate.js";
import { initDisplay } from "./src/initialDisplay.js";
import { initGrid } from "./src/randomGrid.js";
import { changeToGridView } from "./src/changeView.js";
import { initRolling } from "./src/rollingBanner.js";

document.addEventListener("DOMContentLoaded", function () {
  setDate();
  initDisplay();
  initGrid();
  changeToGridView();
  initRolling();
});
