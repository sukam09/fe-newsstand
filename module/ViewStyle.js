import { printGrid } from "./GridView.js";
import { printList } from "./ListView.js";

const GRID_BTN_ID = "grid-btn";
const LIST_BTN_ID = "list-btn";
const GRID = "grid";
const LIST = "list";

function layoutChange(e) {
  const ID = e.target.parentNode.id;
  const layout = document.querySelector("main");

  layout.innerHTML = ``;

  if (ID === GRID_BTN_ID) {
    layout.className = GRID;
  } else if (ID === LIST_BTN_ID) {
    layout.className = LIST;
  }
}

export default function SelectViewStyle() {
  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");
  list_Btn.addEventListener("click", (e) => {
    layoutChange(e);
    printList();
  });
  grid_Btn.addEventListener("click", (e) => {
    layoutChange(e);
    printGrid();
  });
}
