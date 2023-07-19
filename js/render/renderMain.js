import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import { clickCardListImage, clickGridImage } from "../clickGridCardList.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import news from "../../json/news.json" assert { type: "json" };
import Stores from "../../utils/Store.js";

const gridMain = document.getElementById("main-grid");
const listMain = document.getElementById("main-list");

const renderMain = (isAllNews, isGrid) => {
  clickCardListImage();
  clickGridImage();
  if (isAllNews === "all") renderAll(isGrid);
  else renderSubscribe(isGrid);
};

const renderAll = (isGrid) => {
  Stores.setPage(0);
  if (isGrid) renderGrid(logo);
  else renderCardList(news);
};

const renderSubscribe = (isGrid) => {
  Stores.setPage(0);
  if (isGrid) renderGrid();
  else renderCardList();
};

export { renderMain, renderAll, renderSubscribe, gridMain, listMain };
