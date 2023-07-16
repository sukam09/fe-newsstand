import { updateDate } from "./src/global.js";
import { appendGridList } from "./src/gridView.js";
import { appendRollingList } from "./src/rollingAnimation.js";
import { appendCategoryList } from "./src/category.js";
import { appendNewsList } from "./src/listView.js";

document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  appendGridList();
  appendRollingList();
  appendCategoryList();
  appendNewsList();
});
