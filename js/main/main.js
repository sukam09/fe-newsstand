import { renderRolling } from "../main/newsRolling/newsRolling.js";
import { initSubscribe } from "./initSubscribe.js";
import { addEvent } from "../addEvent.js";
import { makeRandomNews } from "./listView/handleNewsData.js";
import { render } from "./render.js";

function initMain() {
  initSubscribe();
  renderRolling();
  render();
  addEvent();
  makeRandomNews();
}
export { initMain };
