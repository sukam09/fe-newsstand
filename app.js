import { setDate } from "./js/Date.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { addInitCategory } from "./js/category.js";
import { renderMain } from "./js/renderMain.js";

// function clickAllNews() {
//   const allNews = document.getElementById("main-left-01");
//   allNews.addEventListener("click", () => {
//     renderGrid(logo);
//   });
// }

// function clickMySubscribeNews() {
//   const subscribeNews = document.getElementById("main-left-02");
//   subscribeNews.addEventListener("click", () => {
//     renderGrid(logoSubscribe);
//   });
// }

function init() {
  clickNewsStand();
  setDate();
  rollingBanner();
  renderMain(1);
  addInitCategory();
}
init();
