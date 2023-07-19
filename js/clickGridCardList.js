import { changeImageSrc } from "../utils/utils.js";
import { renderCardList } from "./render/renderCardList.js";
import { renderGrid } from "./render/renderGrid.js";
import { removeArrow } from "../utils/removeArrow.js";
import Stores from "../utils/Store.js";

const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

const clickGridCardList = (logo, news) => {
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
      Stores.setPage(0);
      renderGrid(logo);
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
      Stores.setPage(0);
      renderCardList(news);
    });
  };

  clickGridImage();
  clickCardListImage();
};
export { clickGridCardList };
