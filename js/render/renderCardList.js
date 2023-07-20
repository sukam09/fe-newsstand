import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";

const renderCardList = (categoryNewsCnt, categoryNewsContent) => {
  drawCategory(categoryNewsCnt);
  drawNews(categoryNewsContent);
};

export { renderCardList };
