import { initListView } from "../main/listView/listView.js";
import { initGridView } from "../main/gridView/gridView.js";
import { initRolling } from "../main/newsRolling/newsRolling.js";
import { initViewChange } from "./changeView.js";

function initMain() {
  initRolling();
  initViewChange();
  initGridView();
  initListView();
}
export { initMain };
