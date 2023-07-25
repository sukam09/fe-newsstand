import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";
import { removeArrow } from "../../utils/utils.js";

const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

const renderCardList = (news) => {
  gridMain.style.display = "none";
  listMain.style.display = "flex";
  removeArrow();
  drawCategory(news);
  drawNews(news);
};

export { renderCardList };
