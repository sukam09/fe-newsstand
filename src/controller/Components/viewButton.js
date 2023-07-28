import { GRID, LIST } from "../../constant.js";
import { VIEW } from "../../model/global.js";
import { startTimer, timerId } from "../timer.js";

export function viewButton() {
  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");
  list_Btn.addEventListener("click", () => {
    VIEW.setLayout(LIST);
    timerId && clearInterval(timerId);
    startTimer();
  });
  grid_Btn.addEventListener("click", () => {
    VIEW.setLayout(GRID);
    timerId && clearInterval(timerId);
  });
}
