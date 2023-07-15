import { initListView } from "../main/listView/listView.js";
import { initGridView } from "./gridView.js";
import { initRolling } from "./newsRolling.js";
import { initViewChange } from "./changeView.js";

function initMain() {
  initRolling();
  initViewChange();
  initGridView();
  initListView();
}
export { initMain };
