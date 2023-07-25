import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "./handleNewsData.js";

function makeListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
}
export { makeListView };
