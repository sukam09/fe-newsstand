import { initReload } from "./header/reload.js";
import { initDate } from "./header/getDate.js";
import { initRolling } from "./main/newsRolling.js";
import { initGridView } from "./main/girdView.js";
import { initViewChange } from "./main/changeView.js";

window.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("color-theme", "light");
  //header
  initReload();
  initDate();

  //main
  initRolling();
  initViewChange();
  initGridView();
});
