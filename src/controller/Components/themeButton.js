import { VIEW } from "../../model/global.js";

const darkMode = document.querySelector(".theme-toggle-js");

function darkController() {
  document.documentElement.classList.toggle("theme--night");
  VIEW.setDark();
}

export function themeButton() {
  darkMode.addEventListener("click", darkController);
}
