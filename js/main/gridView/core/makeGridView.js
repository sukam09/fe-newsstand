import { showMainList, checkPage } from "../feature/handleData.js";

function makeGridView(press) {
  showMainList(press);
  checkPage();
}

export { makeGridView };
