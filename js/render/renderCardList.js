import { drawInitCategory } from "../category.js";
import { drawNews } from "../drawNews.js";
import {
  leftAsideButton,
  rightAsideButton,
  gridMain,
  listMain,
} from "./renderMain.js";

function renderCardList() {
  gridMain.style.display = "none";
  listMain.style.display = "flex";
  leftAsideButton.style.visibility = "visible";
  rightAsideButton.style.visibility = "visible";
  drawInitCategory();
  drawNews();
}

export { renderCardList };
