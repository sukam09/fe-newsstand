import { addEventToGridBtn } from "./main/gridView/makeGridView.js";
import { addEventToListBtn } from "./main/listView/handleBtnEvent.js";
import { addEventPressInfo } from "./main/listView/handleNewsData.js";
function addEvent() {
  addEventToGridBtn();
  addEventToListBtn();
  addEventPressInfo();
}

export { addEvent };
