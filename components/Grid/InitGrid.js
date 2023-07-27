import { INITIAL_PAGE } from "../../constants/constant.js";
import { sortPages } from "../../utils/sort/sortPage.js";
import { qs } from "../../utils/utils.js";
import { GridComponent } from "./GridComponent.js";

export const initGrid = (agencies) => {
  const pages = sortPages(agencies);
  GridComponent(INITIAL_PAGE, pages);

  const all_press = qs(".all_press");
  all_press.setAttribute("subscribeType", true);

  const prev_btn = qs(".prev-page-btn");
  const next_btn = qs(".next-page-btn");

  let current_page = INITIAL_PAGE;

  prev_btn.addEventListener("click", () => {
    GridComponent(--current_page, pages);
  });
  next_btn.addEventListener("click", () => {
    GridComponent(++current_page, pages);
  });
};
