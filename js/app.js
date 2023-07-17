import { date } from './header/date.js';
import { initNewsStandGrid } from './main/newsstnadGrid.js';
import { initSubView } from './main/rollingSubView.js';
import { initEvent } from './events.js';
import { initNewsStandList } from './main/newsstandList.js';

// 기능
headerRender();
mainRender();
initEvent();

function headerRender() {
  date();
}

function mainRender() {
  initNewsStandGrid();
  initNewsStandList();
  initSubView();
}
