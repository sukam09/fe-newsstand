import gridInit from './main/gridView.js';
import headerInit from './main/header.js';
import rollingInit from './main/rolling.js';
import getTopicInit from './main/topic.js';
import selectorInit from './main/selector.js';
import modeInit from './main/mode.js';
( () => {
  headerInit();
  rollingInit();
  getTopicInit();
  selectorInit();
  gridInit();
  modeInit();
})();