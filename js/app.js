import { date } from './header/date.js';
import { initNewsStand } from './main/newsstnad.js';
import { initSubView } from './main/rollingSubView.js';
import { initEvent } from './core/events.js';

// 기능
headerRender();
mainRender();
initEvent();

function headerRender() {
  date();
}

function mainRender() {
  initNewsStand();
  initSubView();
}
