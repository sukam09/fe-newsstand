import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
  addEventPressInfo,
} from "../feature/handleNewsData.js";
// import { addEventToBtn } from "../feature/handleBtnEvent.js";

function makeListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
  // addEventToBtn();
  // addEventPressInfo();
}
export { makeListView };
