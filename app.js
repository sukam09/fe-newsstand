import { updateDate } from "./src/global.js";
import { setGridEvents } from "./src/gridView.js";
import { appendRollingList } from "./src/rollingAnimation.js";
import { appendCategoryList } from "./src/category.js";
import { setListViewEvents } from "./src/listView.js";
import { setNavigationButton } from "./src/navigationButton.js";

document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  setGridEvents();
  appendRollingList();
  appendCategoryList();
  setListViewEvents();
  setNavigationButton();
});
