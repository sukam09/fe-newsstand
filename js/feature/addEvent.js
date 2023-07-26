import { addEventToGridBtn } from "../main/gridView/makeGridView.js";
import { addEventToListBtn } from "../main/listView/handleBtnEvent.js";
import { addEventPressInfo } from "../main/listView/handleNewsData.js";
import { addEventToViewBtn } from "./changeView.js";
import { addEventToDarkMode } from "./changeView.js";

function addEvent() {
  addEventToGridBtn();
  addEventToListBtn();
  addEventPressInfo();
  addEventToDarkMode();
  addEventToViewBtn();
}

export { addEvent };
