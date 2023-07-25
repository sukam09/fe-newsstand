import { addEventToGridBtn } from "./main/gridView/makeGridView.js";
import { addEventToListBtn } from "./main/listView/handleBtnEvent.js";
import { addEventPressInfo } from "./main/listView/handleNewsData.js";
import { changeView } from "./main/changeView.js";
function addEvent() {
  addEventToGridBtn();
  addEventToListBtn();
  addEventPressInfo();
  changeView();
}

export { addEvent };
