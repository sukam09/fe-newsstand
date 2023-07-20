import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "../feature/handleNewsData.js";

function makeListView() {
  makeRandomNews();
  makeCategory();
  transformMainNews();
}
export { makeListView };
