//entry point
import { initHeader } from "./header/header.js";
import { initMain } from "./main/main.js";

window.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("color-theme", "light");
  //header
  initHeader();
  //main
  initMain();
});
