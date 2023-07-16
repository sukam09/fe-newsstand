import { INITIAL_PAGE } from "../../constants/constant.js";
import { setButton } from "../Button/setButton.js";
import { GridComponent } from "../GridComponent.js";

export const setGridButton = (pages) => {
  let currentPage = INITIAL_PAGE;
  const [prevBtn, nextBtn] = setButton();

  prevBtn.addEventListener("click", () => {
    GridComponent(--currentPage, pages);
  });
  nextBtn.addEventListener("click", () => {
    GridComponent(++currentPage, pages);
  });
};
