import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";

const renderCardList = (news) => {
  drawCategory(news);
  drawNews();
};

export { renderCardList };
