import { setDate } from "./setDate.js";
import { initRolling } from "./newsRolling.js";
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
  initRolling();
});
