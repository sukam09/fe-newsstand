import { makeCategory, transformMainNews } from "./handleNewsData.js";

function makeListView() {
  makeCategory();
  transformMainNews();
}
export { makeListView };
