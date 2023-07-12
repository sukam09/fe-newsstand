import { initReload } from "./header/reload.js";
import { initDate } from "./header/getDate.js";
import { initRolling } from "./main/newsRolling.js";
import { initGridView } from "./main/gridView.js";
import { initViewChange } from "./main/changeView.js";
import { initListView } from "./main/listView.js";

window.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("color-theme", "light");
  //header
  initReload();
  initDate();

  //main
  initRolling();
  initViewChange();
  initGridView();
  initListView();
});

//***영역끼리 모아서 분리***
