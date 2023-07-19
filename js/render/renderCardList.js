import { drawInitCategory } from "../category.js";
import { drawNews } from "../drawNews.js";

const renderCardList = (news) => {
  drawInitCategory();
  drawNews();
};

export { renderCardList };
