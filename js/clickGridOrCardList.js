import { changeImageSrc, removeArrow } from "../utils/utils.js";
import { renderMain } from "./render/renderMain.js";
import Stores from "./core/Store.js";

const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

const clickGridCardList = () => {
  const clickGridImage = () => {
    const gridImage = document.getElementById("grid-image");
    gridImage.addEventListener("click", (e) => {
      changeImageSrc(
        document.getElementById("card-list-image"),
        "./img/card_list.svg"
      );
      changeImageSrc(e.target, "./img/clicked_grid.png");
      gridMain.style.display = "grid";
      listMain.style.display = "none";
      removeArrow();
      Stores.setPageMode("grid");
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    });
  };

  const clickCardListImage = () => {
    const cardListImage = document.getElementById("card-list-image");
    cardListImage.addEventListener("click", (e) => {
      changeImageSrc(document.getElementById("grid-image"), "./img/grid.svg");
      changeImageSrc(e.target, "./img/clicked_card_list.png");
      gridMain.style.display = "none";
      listMain.style.display = "flex";
      removeArrow();
      Stores.setPageMode("cardList");
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    });
  };

  clickGridImage();
  clickCardListImage();
};
export { clickGridCardList };
