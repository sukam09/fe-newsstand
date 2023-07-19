import { renderMain } from "./render/renderMain.js";
import Stores from "./core/Store.js";

const clickAllOrSubscribeButton = () => {
  function clickAllNews() {
    document.getElementById("allNews").addEventListener("click", () => {
      Stores.setSubscribed("subscribe");
      renderMain(Stores.getSubscribed(), Stores.getPageMode());
    });
  }

  function clickSubscribeNews() {
    document.getElementById("subscribedNews").addEventListener("click", () => {
      Stores.setSubscribed("grid");
      renderMain(Stores.getSubscribed(), Stores.getPageMode());
    });
  }

  clickAllNews();
  clickSubscribeNews();
};

export { clickAllOrSubscribeButton };
