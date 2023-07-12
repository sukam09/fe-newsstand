import { date } from './utils/utils.js';
import { initNewsStand } from './main/newsstnad.js';
import { initSubView } from './main/rollingSubView.js';
// 기능
headerRender();
mainRender();

function headerRender() {
  date();
}

function mainRender() {
  initNewsStand();
  initSubView();
}
