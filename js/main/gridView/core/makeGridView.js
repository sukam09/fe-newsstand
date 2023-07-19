import { store } from "../../../store.js";
import { showMainList, checkPage } from "../feature/handleData.js";
import { changePage } from "../feature/handleData.js";

let allEventHandler;
let subEventHandler;

function makeGridView(press) {
  const left_btn = document.getElementById("grid-left-btn");
  const right_btn = document.getElementById("grid-right-btn");

  if (store.state.type === "grid-all") {
    right_btn.removeEventListener("click", subEventHandler);
    left_btn.removeEventListener("click", subEventHandler);
    allEventHandler = wrapper(press);
    right_btn.addEventListener("click", allEventHandler);
    left_btn.addEventListener("click", allEventHandler);
  } else {
    right_btn.removeEventListener("click", allEventHandler);
    left_btn.removeEventListener("click", allEventHandler);
    subEventHandler = wrapper(press);
    right_btn.addEventListener("click", subEventHandler);
    left_btn.addEventListener("click", subEventHandler);
  }

  showMainList(press);
  checkPage();
}

function wrapper(press) {
  return function (e) {
    changePage(e, press);
  };
}
export { makeGridView };
