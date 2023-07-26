import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";
import { removeArrow,changeImageSrc } from "../../utils/utils.js";

const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

const renderCardList = (news) => {
  changeImageSrc(document.getElementById("grid-image"), "./img/grid.svg");
  changeImageSrc(
    document.getElementById("card-list-image"),
    "./img/clicked_card_list.png"
  );
  gridMain.style.display = "none";
  listMain.style.display = "flex";
  removeArrow();
  drawCategory(news);
  drawNews(news);
};

export { renderCardList };
