import { initCommonView } from "./modules/utils.js";
import { initGridView } from "./modules/grid.js";
import { initListView } from "./modules/list.js";
import { initHotTopicView } from "./modules/hot-topic.js";

(async function init() {
  initCommonView();
  initHotTopicView();
  initGridView();
  await initListView();
})();
