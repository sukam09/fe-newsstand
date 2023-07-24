import { drawGridView } from "./gridFunction.js";
import { drawNews } from "./newsList.js";
import { getState, setState, subscribe } from "./observer/observer.js";
import { isDark } from "./store/store.js";

export function initDarkMode() {
  const $body = document.querySelector("body");
  subscribe(isDark, drawNews);
  subscribe(isDark, drawGridView);
  document.querySelector(".dark-btn").addEventListener("click", setDarkMode.bind("null", $body));
}

function setDarkMode($body) {
  setState(isDark, !getState(isDark));
  $body.classList.toggle("dark");
}
