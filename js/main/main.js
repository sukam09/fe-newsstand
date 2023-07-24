import { renderGridView } from "./gridView/renderGridView.js";
import { renderRolling } from "../main/newsRolling/newsRolling.js";
import { initSubscribe } from "./initSubscribe.js";
import { changeView } from "./changeView.js";
import { addEvent } from "../addEvent.js";

function initMain() {
  initSubscribe();
  renderRolling();
  renderGridView();
  changeView();
  addEvent();
}
export { initMain };
