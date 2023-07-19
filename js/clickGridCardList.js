import { changeImageSrc } from "../utils/utils.js";
// import { addAsideClickEvent } from "./asideButton.js";
import { renderCardList } from "./render/renderCardList.js";
import { renderGrid } from "./render/renderGrid.js";
import Stores from "../utils/Store.js";

function clickGridImage() {
  const gridImage = document.getElementById("grid-image");
  gridImage.addEventListener("click", (e) => {
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/card_list.svg"
    );
    changeImageSrc(e.target, "./img/clicked_grid.png");
    leftAsideButton.style.visibility = "hidden";
    addAsideClickEvent(true);
    Stores.setPage(0);
    renderGrid();
  });
}

function clickCardListImage() {
  const cardListImage = document.getElementById("card-list-image");
  cardListImage.addEventListener("click", (e) => {
    changeImageSrc(document.getElementById("grid-image"), "./img/grid.svg");
    changeImageSrc(e.target, "./img/clicked_card_list.png");
    addAsideClickEvent(false);
    Stores.setPage(0);
    renderCardList();
  });
}

export { clickCardListImage, clickGridImage };
