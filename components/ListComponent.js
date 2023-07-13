import { removeAllChildNodes } from "../utils/removeChild.js";
import { makePressNews } from "./List/pressNews.js";

export const ListComponent = (currentPage, categories) => {
  const press = document.querySelector(".press-news");
  if (press.childNodes.length !== 0) {
    removeAllChildNodes(press);
  }
  makePressNews(categories[currentPage]);
};
