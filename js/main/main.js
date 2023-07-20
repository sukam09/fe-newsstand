import { renderListView } from "../main/listView/core/renderListView.js";
import { renderGridView } from "../main/gridView/core/renderGridView.js";
import { renderRolling } from "../main/newsRolling/newsRolling.js";
import { initViewChange } from "../main/changeView/changeView.js";
import { addEventToBtn } from "./listView/feature/handleBtnEvent.js";
import { addEventPressInfo } from "./listView/feature/handleNewsData.js";
function initMain() {
  renderRolling();
  renderGridView();
  renderListView();
  initViewChange();
  addEventToBtn();
  addEventPressInfo();
}
export { initMain };
