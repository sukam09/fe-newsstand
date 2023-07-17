import { constants } from "../../Data/constants.js";
import { renderNewspaper } from "./newspaper.js";

let page = 0;

let $leftButton;
let $rightButton;

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
  $leftButton = document.querySelector(
    ".news-section-grid .left-button_content"
  );
  $rightButton = document.querySelector(
    ".news-section-grid .right-button_content"
  );
  $leftButton.addEventListener("click", () => movePage(-1));
  $rightButton.addEventListener("click", () => movePage(1));
};

export { setGridPageButton };
