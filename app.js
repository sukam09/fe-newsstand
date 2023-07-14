import { setDate } from "./js/Date.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { renderMain } from "./js/renderMain.js";

function init() {
  clickNewsStand();
  setDate(document.getElementById("header-div-02"));
  rollingBanner();
  renderMain(1);
}
init();
