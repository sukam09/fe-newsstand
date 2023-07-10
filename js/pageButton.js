import { renderNewspaper } from "./newspaper.js";

let page = 0;

const $leftButton = document.querySelector(".left-button_content");
const $rightButton = document.querySelector(".right-button_content");

const setDisplayButton = () => {
  $leftButton.style.display = page === 0 ? "none" : "block";
  $rightButton.style.display = page === 3 ? "none" : "block";
};

const renderContent = () => {
  renderNewspaper(page, "light");
  setDisplayButton();
};

const movePageLeft = () => {
  page--;
  renderContent();
};

const movePageRight = () => {
  page++;
  renderContent();
};

const setPageButton = () => {
  $leftButton.addEventListener("click", movePageLeft);
  $rightButton.addEventListener("click", movePageRight);
};

export { setPageButton };
