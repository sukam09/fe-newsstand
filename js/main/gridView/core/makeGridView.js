import { showMainList, checkPage } from "../feature/handleData.js";
import { changePage } from "../feature/handleData.js";

function makeGridView(press) {
  const left_btn = document.getElementById("grid-left-btn");
  const right_btn = document.getElementById("grid-right-btn");

  right_btn.addEventListener("click", (e) => changePage(e, press));
  left_btn.addEventListener("click", (e) => changePage(e, press));
  showMainList(press);
  checkPage();
}
export { makeGridView };
