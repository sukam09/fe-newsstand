import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import Stores from "../core/Store.js";
import { clickSubscribeTypeButton } from "../clickEvent/clickSubscribeTypeButton.js";
import { renderSubscribeTypeButton } from "./renderSubscribeTypeButton.js";

const renderMain = (subscribeStatus, pageMode) => {
  renderSubscribeTypeButton(subscribeStatus);
  clickSubscribeTypeButton();
  subscribeStatus === "all" ? renderAll(pageMode) : renderSubscribe(pageMode);
};

const renderAll = async (pageMode) => {
  return pageMode === "grid"
    ? renderGrid(logo)
    : renderCardList(await Stores.getOriginalNews());
};

const renderSubscribe = (pageMode) => {
  return pageMode === "grid"
    ? renderGrid(Stores.getSubscribeLogo())
    : renderCardList(Stores.getSubscribeNewsContent());
};

export { renderMain };
