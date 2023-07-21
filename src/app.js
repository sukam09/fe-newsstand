import { initData } from "./model/model.js";
import { initDom } from "./view/init.js";
import { initEvent } from "./controller/mainController.js";

(async function init() {
  await initData();
  initDom();
  initEvent();
})();
