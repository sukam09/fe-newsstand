import { INITIAL_PAGE } from "../../constants/constant.js";
import { setButton } from "../Button/setButton.js";
import { GridComponent } from "../GridComponent.js";

export const setGridButton = (pages) => {
  let currentPage = INITIAL_PAGE;
  const [prev_btn, next_btn] = setButton();

  prev_btn.addEventListener("click", () => {
    GridComponent(--currentPage, pages);
  });
  next_btn.addEventListener("click", () => {
    GridComponent(++currentPage, pages);
  });
};
