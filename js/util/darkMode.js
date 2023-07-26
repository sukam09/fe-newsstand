import { getState, setState } from "../observer/observer.js";
import { isDark } from "../store/store.js";

export function initDarkMode() {
  const $body = document.querySelector("body");
  const $dark_mode_icon = document.querySelectorAll(".dark-mode-icon");
  $dark_mode_icon.forEach(icon => icon.addEventListener("click", e => setDarkMode($body, e.target)));
}

function setDarkMode($body, target) {
  setState(isDark, !getState(isDark));
  if (getState(isDark)) {
    target.classList.replace("xi-brightness", "xi-moon");
  } else {
    target.classList.replace("xi-moon", "xi-brightness");
  }
  $body.classList.toggle("dark"), 100;
}
