import { INITIAL_PAGE } from "../constants/constant.js";
import { sortPages } from "../utils/sortPage.js";
import { GridComponent } from "./GridComponent.js";

export const initGrid = (agencies) => {
  const pages = sortPages(agencies);
  GridComponent(INITIAL_PAGE, pages);

  const prevBtn = document.querySelector(".prev-page-btn");
  const nextBtn = document.querySelector(".next-page-btn");

  let currentPage = INITIAL_PAGE;

  prevBtn.addEventListener("click", () => {
    GridComponent(--currentPage, pages);
  });
  nextBtn.addEventListener("click", () => {
    GridComponent(++currentPage, pages);
  });
};
