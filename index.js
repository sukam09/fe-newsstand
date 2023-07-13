import { setHotTopic, rollingTopic } from "./modules/hot-topic.js";
import { setArrowVisible, makeGrid } from "./modules/grid.js";
import {
  shuffleList,
  setDate,
  setReload,
  setViewEvent,
} from "./modules/utils.js";
import { MEDIA } from "./constant.js";
import { initListView } from "./modules/list.js";

let isLightMode = true;
let viewMode = "grid";
let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);

(async function init() {
  setReload();
  setDate();

  setHotTopic();
  rollingTopic();

  shuffleList(idList);
  setArrowVisible();

  setViewEvent();
  makeGrid();

  await initListView();
})();

export { isLightMode, viewMode, idList };
