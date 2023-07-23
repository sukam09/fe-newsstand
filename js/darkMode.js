import { STATE } from "./const.js";
import { drawGridView } from "./gridFunction.js";
import { drawNews } from "./newsList.js";

export function initDarkMode() {
  const $body = document.querySelector("body");
  document.querySelector(".dark-btn").addEventListener("click",() => setDarkMode($body));
}

function setDarkMode($body) {
  STATE.IS_DARK = !STATE.IS_DARK;
    $body.classList.toggle("dark");
    drawGridView();
    drawNews();
}
