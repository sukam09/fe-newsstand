import { setDate } from "./setDate.js";
import { firstRollingCallback, secondRollingCallback } from "./newsRolling.js";
import { initPressGrid } from "./gridFunction.js";

function initDisplayNone() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  initDisplayNone();
  setDate();
  initPressGrid();

  let interval = window.setInterval(firstRollingCallback, 5000);
  setTimeout(function () {
    let interval2 = window.setInterval(secondRollingCallback, 5000);
  }, 2000);
});
