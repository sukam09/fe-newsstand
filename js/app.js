import { date } from './header/date.js';
import { initNewsStandGrid } from './main/newsstnadGrid.js';
import { initSubView } from './main/rollingSubView.js';
import { initNewsStandList } from './main/newsstandList.js';
import { initNavEvent } from './events/navigateEvent.js';
import { initNewsTabEvent } from './events/newsTabEvent.js';
import { initNewsSubEvent } from './events/newsSubEvent.js';
import { initOptionEvent } from './events/newsOptionEvent.js';
// 기능
headerRender();
mainRender();
initNewsTabEvent();
initNewsSubEvent();
initOptionEvent();

function headerRender() {
  date();
}

function mainRender() {
  initNewsStandGrid();
  initNewsStandList();
  initSubView();
  initNavEvent();
}
