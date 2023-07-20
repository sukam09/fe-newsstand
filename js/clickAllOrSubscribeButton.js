import { renderMain } from "./render/renderMain.js";
import Stores from "./core/Store.js";

const clickAllOrSubscribeButton = () => {
  function clickAllNews() {
    document.getElementById("allNews").addEventListener("click", () => {
      Stores.setSubscribedMode("all");
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    });
  }

  function clickSubscribeNews() {
    document.getElementById("subscribedNews").addEventListener("click", () => {
      Stores.setSubscribedMode("subscribed");
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    });
  }

  clickAllNews();
  clickSubscribeNews();
};

export { clickAllOrSubscribeButton };
