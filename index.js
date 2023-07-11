import { setHotTopic, rollingTopic } from "./module/hot-topic.js";
import { setArrowVisible, makeGrid } from "./module/grid.js";
import {
  shuffleList,
  setDate,
  setReload,
  setViewEvent,
} from "./module/utils.js";
import { MEDIA, IMAGE } from "./constant.js";

let isLightMode = true;
let viewMode = "grid";
let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);

function init() {
  setReload();
  setDate();

  setHotTopic();
  rollingTopic();

  shuffleList(idList);
  setArrowVisible();

  setViewEvent();
  makeGrid();
}

init();

export { isLightMode, viewMode, idList };
