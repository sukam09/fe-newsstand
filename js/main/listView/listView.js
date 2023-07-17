import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "./handle/handleData.js";
import { addEventToBtn } from "./handle/handleBtn.js";

function initListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
  addEventToBtn();
}

export { initListView };
