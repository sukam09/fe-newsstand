import { printGrid } from "../view/GridView.js";
import { printList } from "../view/ListView/ListView.js";
import { timerId } from "../view/ListView/Timer.js";
import { LIST_PAGE, GRID_PAGE } from "../../global.js";
import { arrowStateInit } from "./Arrow.js";

const GRID = "grid";
const LIST = "list";

const GRID_BTN_ID = "grid-btn";
const LIST_BTN_ID = "list-btn";

function btnColorChange(targetBtn, InActiveBtn) {
  const rootStyles = getComputedStyle(document.documentElement);
  const btnActiveColor = rootStyles.getPropertyValue("--text-point");
  const btnInActiveColor = rootStyles.getPropertyValue("--text-weak");

  const active_btn = targetBtn.querySelector("path");
  active_btn.setAttribute("fill", btnActiveColor);

  const inactive_btn = InActiveBtn.querySelector("path");
  inactive_btn.setAttribute("fill", btnInActiveColor);
}

function layoutChange(targetBtn) {
  const layout = document.querySelector("main");
  const ID = targetBtn.id;
  let InActiveBtn;

  layout.innerHTML = ``;

  if (ID === GRID_BTN_ID) {
    layout.className = GRID;
    InActiveBtn = document.getElementById(LIST_BTN_ID);
    VIEW.CURRENT_VIEW_MODE = GRID;
    if (timerId) {
      clearInterval(timerId);
    }
  } else if (ID === LIST_BTN_ID) {
    layout.className = LIST;
    InActiveBtn = document.getElementById(GRID_BTN_ID);
    VIEW.CURRENT_VIEW_MODE = LIST;
  }
  arrowStateInit();
  btnColorChange(targetBtn, InActiveBtn);
}

export default function SelectViewStyle() {
  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");
  list_Btn.addEventListener("click", () => {
    layoutChange(list_Btn);
    GRID_PAGE.CURRENT_PAGE = 0;
    printList();
  });
  grid_Btn.addEventListener("click", () => {
    layoutChange(grid_Btn);
    LIST_PAGE.CURRENT_PAGE = 1;
    LIST_PAGE.CURRENT_CATEGORY = 0;
    printGrid();
  });
}

export const VIEW = {
  CURRENT_VIEW_MODE: GRID,
  GRID,
  LIST,
};
