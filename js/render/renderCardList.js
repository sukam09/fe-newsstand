import { drawCategory } from "../category.js";
import { drawNews } from "../drawNews.js";
import { doBeforeRender } from "../../utils/utils.js";

const renderCardList = (news) => {
  doBeforeRender("list");
  drawCategory(news);
  drawNews(news);
};

export { renderCardList };
