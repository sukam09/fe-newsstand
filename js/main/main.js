import { renderRolling } from "../main/newsRolling/newsRolling.js";
import { initSubscribe } from "../store/initSubscribe.js";
import { addEvent } from "../feature/addEvent.js";
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
