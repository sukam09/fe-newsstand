import { setDate, setReload } from "./modules/utils.js";
import { setHotTopic, rollingTopic } from "./modules/hot-topic.js";

import { initGridView } from "./modules/grid.js";
import { initListView } from "./modules/list.js";

(async function init() {
  setReload();
  setDate();

  setHotTopic();
  rollingTopic();

  await initGridView();
  await initListView();
})();
