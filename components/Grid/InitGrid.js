import { INITIAL_PAGE } from "../../constants/constant.js";
import { sortPages } from "../../utils/sortPage.js";
import { GridComponent } from "./GridComponent.js";

export const initGrid = (agencies) => {
  const pages = sortPages(agencies);
  GridComponent(INITIAL_PAGE, pages);

  const all_press = document.querySelector(".all_press");
  all_press.setAttribute("subscribeType", true);

  const prev_btn = document.querySelector(".prev-page-btn");
  const next_btn = document.querySelector(".next-page-btn");

  let current_page = INITIAL_PAGE;

  prev_btn.addEventListener("click", () => {
    GridComponent(--current_page, pages);
  });
  next_btn.addEventListener("click", () => {
    GridComponent(++current_page, pages);
  });
};
