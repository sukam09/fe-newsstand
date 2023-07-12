import { setDate } from "./src/bringDate.js";
import { initDisplay } from "./src/initialDisplay.js";
import { initGrid } from "./src/randomGrid.js";
import { changeToGrid } from "./src/changeView.js";
import { initFirstRolling, initSecondRolling } from "./src/rollingBanner.js";
import { movingProgress } from "./src/progressBar.js";

document.addEventListener("DOMContentLoaded", function () {
  setDate();
  initDisplay();
  initGrid();
  changeToGrid();
  initFirstRolling();
  initSecondRolling();
  movingProgress();
});
