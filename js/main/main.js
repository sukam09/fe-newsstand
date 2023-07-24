import { renderGridView } from "./gridView/renderGridView.js";
import { renderRolling } from "../main/newsRolling/newsRolling.js";
import { initSubscribe } from "./initSubscribe.js";

function initMain() {
  initSubscribe();
  renderRolling();
  renderGridView();
}
export { initMain };
