import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickGridCardList } from "../clickGridCardList.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import news from "../../json/news.json" assert { type: "json" };
import Stores from "../../utils/Store.js";

const renderMain = (isAllNews, isGrid) => {
  clickGridCardList(logo, news);
  if (isAllNews === "all") renderAll(isGrid);
  else renderSubscribe(isGrid);
};

const renderAll = (isGrid) => {
  Stores.setPage(0);
  if (isGrid === "grid") renderGrid(logo);
  else renderCardList(news);
};

const renderSubscribe = (isGrid) => {
  Stores.setPage(0);
  if (isGrid === "grid") renderGrid();
  else renderCardList();
};

export { renderMain };
