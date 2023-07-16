import { constants } from "../../Data/constants.js";
import { renderNewspaper } from "./newspaper.js";

let page = 0;

const $leftButton = document.querySelector(
  ".news-section-grid .left-button_content"
);
const $rightButton = document.querySelector(
  ".news-section-grid .right-button_content"
);

const setDisplayButton = () => {
  $leftButton.style.display = page === constants.MIN_PAGE ? "none" : "block";
  $rightButton.style.display = page === constants.MAX_PAGE ? "none" : "block";
};

const renderContent = () => {
  renderNewspaper(page, constants.LIGHT_MODE);
  setDisplayButton();
};

const movePage = (amout) => {
  page += amout;
  renderContent();
};

const setGridPageButton = () => {
  $leftButton.addEventListener("click", () => movePage(-1));
  $rightButton.addEventListener("click", () => movePage(1));
};

export { setGridPageButton };
