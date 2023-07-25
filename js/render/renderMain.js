import { renderCardList } from "./renderCardList.js";
import { renderGrid } from "./renderGrid.js";
import logo from "../../json/news_image.json" assert { type: "json" };
import Stores from "../core/Store.js";
import { snackBar } from "../snackBar.js";
import { boldSubscribed, boldAll } from "../../utils/utils.js";

const renderMain = (subscribeStatus, pageMode) =>
  subscribeStatus === "all" ? renderAll(pageMode) : renderSubscribe(pageMode);

const renderAll = async (pageMode) => {
  Stores.setPage(0);
  boldAll();
  return pageMode === "grid"
    ? renderGrid(logo)
    : renderCardList(await Stores.getOriginalNews());
};

const renderSubscribe = (pageMode) => {
  const subscribeNews = Stores.getSubscribeNewsContent();
  if (Object.keys(subscribeNews).length === 0) {
    Stores.setSubscribedMode("all");
    snackBar("구독한 언론사가 없습니다.");
    return;
  }
  Stores.setPage(0);
  boldSubscribed();
  return pageMode === "grid"
    ? renderGrid(Stores.getSubscribeLogo())
    : renderCardList(subscribeNews);
};

export { renderMain };
