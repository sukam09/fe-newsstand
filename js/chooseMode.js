import { changeImageSrc } from "../utils/utils.js";
import { addAsideClickEvent } from "./asideButton.js";
import { renderMain } from "./renderMain.js";
import { leftAsideButton } from "./renderMain.js";

function clickGridImage() {
  const gridImage = document.getElementById("grid-image");
  gridImage.addEventListener("click", (e) => {
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/card_list.svg"
    );
    changeImageSrc(e.target, "./img/clicked_grid.png");
    leftAsideButton.style.visibility = "hidden";
    setMainContent(true);
  });
}

function clickCardListImage() {
  const cardListImage = document.getElementById("card-list-image");
  cardListImage.addEventListener("click", (e) => {
    changeImageSrc(document.getElementById("grid-image"), "./img/grid.svg");
    changeImageSrc(e.target, "./img/clicked_card_list.png");
    setMainContent(false);
  });
}

function setMainContent(isGrid) {
  addAsideClickEvent(isGrid);
  renderMain(isGrid);
}

export { clickCardListImage, clickGridImage };
