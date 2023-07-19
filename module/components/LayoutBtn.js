import { printGrid } from "../view/GridView.js";
import { printList } from "../view/ListView/ListView.js";
import { timerId } from "../view/ListView/Timer.js";
import { LIST_PAGE, GRID_PAGE } from "../../global.js";
import { arrowStateInit } from "./Arrow.js";
import { VIEW_MODE } from "../../global.js";

export const GRID = "grid";
export const LIST = "list";

const GRID_BTN_ID = "grid-btn";
const LIST_BTN_ID = "list-btn";

export function btnColorChange(targetBtn, InActiveBtn) {
  const rootStyles = getComputedStyle(document.documentElement);
  const btnActiveColor = rootStyles.getPropertyValue("--text-point");
  const btnInActiveColor = rootStyles.getPropertyValue("--text-weak");

  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");

  if (!targetBtn & !InActiveBtn) {
    if (VIEW_MODE.CURRENT_LAYOUT === GRID) {
      targetBtn = grid_Btn;
      InActiveBtn = list_Btn;
    } else {
      targetBtn = list_Btn;
      InActiveBtn = grid_Btn;
    }
  }

  const active_btn = targetBtn.querySelector("path");
  active_btn.setAttribute("fill", btnActiveColor);

  const inactive_btn = InActiveBtn.querySelector("path");
  inactive_btn.setAttribute("fill", btnInActiveColor);
}

export function autoLayoutChange() {
  btnColorChange(targetBtn, InActiveBtn);
}

function layoutChangeByBtn(targetBtn) {
  const layout = document.querySelector("main");
  const ID = targetBtn.id;
  let InActiveBtn;

  layout.innerHTML = ``;

  if (ID === GRID_BTN_ID) {
    layout.className = GRID;
    InActiveBtn = document.getElementById(LIST_BTN_ID);
    VIEW_MODE.CURRENT_LAYOUT = GRID;
    if (timerId) {
      clearInterval(timerId);
    }
  } else if (ID === LIST_BTN_ID) {
    layout.className = LIST;
    InActiveBtn = document.getElementById(GRID_BTN_ID);
    VIEW_MODE.CURRENT_LAYOUT = LIST;
  }
  arrowStateInit();
  btnColorChange(targetBtn, InActiveBtn);
}

export default function SelectViewStyle() {
  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");
  list_Btn.addEventListener("click", () => {
    layoutChangeByBtn(list_Btn);
    GRID_PAGE.CURRENT_PAGE = 0;
    printList();
  });
  grid_Btn.addEventListener("click", () => {
    layoutChangeByBtn(grid_Btn);
    LIST_PAGE.CURRENT_PAGE = 1;
    LIST_PAGE.CURRENT_CATEGORY = 0;
    printGrid();
  });
}
