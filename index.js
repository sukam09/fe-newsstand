import { setHotTopic, rollingTopic } from "./modules/hot-topic.js";
import { setArrowVisible, makeGrid } from "./modules/grid.js";
import {
  shuffleList,
  setDate,
  setReload,
  setViewEvent,
} from "./modules/utils.js";
import { MEDIA } from "./constant.js";
import { getListInfo, setListView } from "./modules/list.js";

let isLightMode = true;
let viewMode = "grid";
let idList = Array.from({ length: MEDIA.TOTAL_NUM }, (_, idx) => idx);

const init = async () => {
  setReload();
  setDate();

  setHotTopic();
  rollingTopic();

  shuffleList(idList);
  setArrowVisible();

  setViewEvent();
  makeGrid();

  await getListInfo();
  setListView(0); // id가 0인 오마이뉴스로 구조 잡기
};

init();

export { isLightMode, viewMode, idList };
