import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import news from "../../json/news.json" assert { type: "json" };
import Stores from "../core/Store.js";
import { categoryCnt } from "../setData.js/setCategoryData.js";

const renderMain = (subscribeStatus, pageMode) =>
  subscribeStatus === "all" ? renderAll(pageMode) : renderSubscribe(pageMode);

const renderAll = (pageMode) => {
  Stores.setPage(0);
  return pageMode === "grid" ? renderGrid(logo) : renderCardList(categoryCnt);
};

const renderSubscribe = (pageMode) => {
  Stores.setPage(0);
  return pageMode === "grid"
    ? renderGrid(logo)
    : renderCardList(Stores.getSubscribeNews());
};

export { renderMain };
