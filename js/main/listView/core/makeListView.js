import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "../feature/handleNewsData.js";
import { addEventToBtn } from "../feature/handleBtnEvent.js";

function makeListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
  addEventToBtn();
}
export { makeListView };
