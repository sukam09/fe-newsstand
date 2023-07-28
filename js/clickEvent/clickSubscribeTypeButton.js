import { renderMain } from "../render/renderMain.js";
import Stores from "../core/Store.js";
import { snackBar } from "../snackBar.js";

const clickSubscribeTypeButton = () => {
  clickAllNews();
  clickSubscribeNews();
};

function clickAllNews() {
  document.getElementById("allNews").addEventListener("click", () => {
    Stores.setSubscribedMode("all");
    renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
  });
}

function clickSubscribeNews() {
  document.getElementById("subscribedNews").addEventListener("click", () => {
    if (Object.keys(Stores.getSubscribeNewsContent()).length === 0) {
      Stores.setSubscribedMode("all");
      snackBar("구독한 언론사가 없습니다.");
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    } else {
      Stores.setSubscribedMode("subscribed");
      renderMain(Stores.getSubscribedMode(), Stores.getPageMode());
    }
  });
}

export { clickSubscribeTypeButton };
