import { setDate } from "./js/setData.js/setDate.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { renderAll } from "./js/render/renderMain.js";
import { addAsideClickEvent } from "./js/asideButton.js";

(function init() {
  clickNewsStand(document.getElementById("header-div-01"));
  setDate(document.getElementById("header-div-02"));
  rollingBanner();
  addAsideClickEvent(true);
  renderAll(true);
})();
