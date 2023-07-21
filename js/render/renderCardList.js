import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";

const renderCardList = (categoryNewsCnt, categoryNewsContent) => {
  drawCategory(categoryNewsCnt, categoryNewsContent);
  drawNews(categoryNewsContent);
};

export { renderCardList };
