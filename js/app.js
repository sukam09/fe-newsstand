import { date } from './models/header/date.js';
import { initNewsStandGrid } from './models/main/newsstnadGrid.js';
import { initSubView } from './models/main/rollingSubView.js';
import { initNewsStandList } from './models/main/newsstandList.js';
import { initNavEvent } from './events/navigateEvent.js';
import { initNewsTabEvent } from './events/newsTabEvent.js';
import { initNewsSubEvent } from './events/newsSubEvent.js';
import { initOptionEvent } from './events/newsOptionEvent.js';

models();
controller();

function models() {
  date();
  initNewsStandGrid();
  initNewsStandList();
  initSubView();
}
function controller() {
  initNavEvent();
  initNewsTabEvent();
  initNewsSubEvent();
  initOptionEvent();
}
