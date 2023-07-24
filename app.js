import { updateDate } from "./src/global.js";
import { setGridEvents } from "./src/gridView.js";
import { appendRollingList } from "./src/components/rollingAnimation.js";
import { setListViewEvents } from "./src/listView.js";
import { setNavigationButton } from "./src/components/navigationButton.js";
import { setCategory } from "./src/components/category.js";
import { setCategory2 } from "./src/components/category2.js";
import { setSnackbar } from "./src/components/snackbar.js";
import { setAlert } from "./src/components/alert.js";

document.addEventListener("DOMContentLoaded", function () {
  updateDate();
  setGridEvents();
  // setCategory();
  appendRollingList();
  setListViewEvents();
  setNavigationButton();
  setSnackbar();
  setAlert();
  setCategory2();
});
