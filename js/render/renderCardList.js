import { drawInitCategory } from "../category.js";
import { drawNews } from "../drawNews.js";
import { gridMain, listMain } from "./renderMain.js";

function renderCardList() {
  gridMain.style.display = "none";
  listMain.style.display = "flex";
  drawInitCategory();
  drawNews();
}

export { renderCardList };
