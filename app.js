import { setDate } from "./js/setData.js/setDate.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { renderMain } from "./js/render/renderMain.js";
import { clickAllOrSubscribeButton } from "./js/clickAllOrSubscribeButton.js";
import { clickGridCardList } from "./js/clickGridOrCardList.js";

(function init() {
  clickNewsStand(document.getElementById("header-div-01"));
  setDate(document.getElementById("header-div-02"));
  rollingBanner();
  clickAllOrSubscribeButton();
  clickGridCardList();
  renderMain("all", "grid");
})();
