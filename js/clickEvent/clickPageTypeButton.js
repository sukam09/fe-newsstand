import { changeImageSrc } from "../../utils/utils.js";
import { renderMain } from "../render/renderMain.js";
import Stores from "../core/Store.js";

const clickPageTypeButton = () => {
  clickGridImage();
  clickListImage();
};

const clickGridImage = () => {
  document.getElementById("grid-image").addEventListener("click", (e) => {
    changeImageSrc(
      document.getElementById("card-list-image"),
      "./img/card_list.svg"
    );
    changeImageSrc(e.target, "./img/clicked_grid.png");
    Stores.setPageMode("grid");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
};

const clickListImage = () => {
  document.getElementById("card-list-image").addEventListener("click", (e) => {
    Stores.setPageMode("cardList");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
};

export { clickPageTypeButton };
