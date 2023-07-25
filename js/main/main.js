import { renderRolling } from "../main/newsRolling/newsRolling.js";
import { initSubscribe } from "./initSubscribe.js";
import { changeView } from "./changeView.js";
import { addEvent } from "../addEvent.js";
import { makeRandomNews } from "./listView/handleNewsData.js";
import { render } from "./render.js";

function initMain() {
  initSubscribe();
  renderRolling();
  render();
  // changeView();
  addEvent();
  makeRandomNews();
}
export { initMain };
