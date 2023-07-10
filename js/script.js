import { setDate } from "./setDate.js";
import { firstRollingCallback, secondRollingCallback } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";

const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 2000;

function initDisplayNone() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  initDisplayNone();
  setDate();
  initPressGrid();

  let interval = window.setInterval(firstRollingCallback, ROLLING_TIME);
  setTimeout(function () {
    let interval2 = window.setInterval(secondRollingCallback, ROLLING_TIME);
  }, ROLLING_LATENCY);
});
