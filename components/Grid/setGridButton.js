import { INITIAL_PAGE } from "../../constants/constant.js";
import { appendButton } from "../../utils/appendButton.js";
import { GridComponent } from "../GridComponent.js";

export const setGridButton = (pages) => {
  let currentPage = INITIAL_PAGE;

  const buttonContainer = document.querySelector(".agency-container");

  const [prevBtn, nextBtn] = appendButton();

  buttonContainer.appendChild(prevBtn);
  buttonContainer.appendChild(nextBtn);

  prevBtn.addEventListener("click", () => {
    GridComponent(--currentPage, pages);
  });
  nextBtn.addEventListener("click", () => {
    GridComponent(++currentPage, pages);
  });
};
