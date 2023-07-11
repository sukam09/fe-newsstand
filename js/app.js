import { date } from './utils/utils.js';
import { initNewsStand } from './main/newsstnad.js';
import { initRollingNews } from './main/rollingnews.js';
// 기능
headerRender();
mainRender();

function headerRender() {
  date();
}

function mainRender() {
  initNewsStand();
  initRollingNews();
}
