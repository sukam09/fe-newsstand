import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";

const renderCardList = (news) => {
  console.log(news);
  drawCategory(news);
  drawNews();
};

export { renderCardList };
