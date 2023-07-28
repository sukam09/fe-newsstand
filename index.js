import { initCommonView } from "./modules/utils.js";
import { initGridView } from "./modules/grid/grid.js";
import { initListView } from "./modules/list/list.js";
import { initHotTopicView } from "./modules/hot-topic.js";

(async function init() {
  initCommonView();
  initHotTopicView();
  await initGridView();
  await initListView();
})();
