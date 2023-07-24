import { VIEW } from "../../model/global.js";
import { startTimer, timerId } from "../timer.js";
import { fieldClick } from "./field.js";

export function viewButton() {
  const list_Btn = document.querySelector("#list-btn");
  const grid_Btn = document.querySelector("#grid-btn");
  list_Btn.addEventListener("click", () => {
    VIEW.setLayout("list");
    fieldClick();
    if (timerId) {
      clearInterval(timerId);
    }
    startTimer();
  });
  grid_Btn.addEventListener("click", () => {
    VIEW.setLayout("grid");
    if (timerId) {
      clearInterval(timerId);
    }
  });
}
