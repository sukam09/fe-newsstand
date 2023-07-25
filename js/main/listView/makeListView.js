import {
  makeCategory,
  makeRandomNews,
  transformMainNews,
} from "./handleNewsData.js";

function makeListView(manipulatedNews) {
  makeRandomNews();
  makeCategory(manipulatedNews);
  transformMainNews();
}
export { makeListView };
