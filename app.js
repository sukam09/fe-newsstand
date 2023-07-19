import { setDate } from "./js/setData.js/setDate.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { renderMain } from "./js/render/renderMain.js";
import { clickCardListImage, clickGridImage } from "./js/clickGridCardList.js";

(function init() {
  clickNewsStand(document.getElementById("header-div-01"));
  setDate(document.getElementById("header-div-02"));
  rollingBanner();
  clickCardListImage();
  clickGridImage();
  renderMain("all", "grid");
})();
