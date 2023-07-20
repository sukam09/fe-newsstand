import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickGridCardList } from "../clickGridOrCardList.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import news from "../../json/news.json" assert { type: "json" };
import Stores from "../core/Store.js";
import { categoryCnt } from "../setData.js/setCategoryData.js";

const a = [
  { key: "중앙일보", value: 1, arrow: true },
  { key: "SBS뉴스", value: 1, arrow: true },
];

const renderMain = (subscribeStatus, pageMode) => {
  if (subscribeStatus === "all") renderAll(pageMode);
  else renderSubscribe(pageMode);
};

const renderAll = (pageMode) => {
  Stores.setPage(0);
  if (pageMode === "grid") renderGrid(logo);
  else renderCardList(categoryCnt);
};

const renderSubscribe = (pageMode) => {
  Stores.setPage(0);
  if (pageMode === "grid") renderGrid(logo);
  else renderCardList(a);
};

export { renderMain };
