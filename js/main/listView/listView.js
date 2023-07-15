import { makeCategory, makeRandomNews } from "./handle/handleData.js";
import { addEventToBtn } from "./handle/handleBtn.js";

function initListView() {
  makeRandomNews();
  makeCategory();
  addEventToBtn();
}

export { initListView };
