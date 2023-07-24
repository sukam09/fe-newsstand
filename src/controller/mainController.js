import { initRollingEvent } from "./rollingController.js";
import { initGridEvent } from "./gridController.js";
import { initListEvent } from "./listController.js";
import { initArrowBtnEvnet } from "./arrowBtnController.js";
import { initTabAndViewerEvent } from "./tabAndViewerController.js";
import { initAlertEvent } from "./componentController.js";
import { initFieldTabEvent } from "./fieldTabController.js";

function initEvent() {
  initRollingEvent();
  initGridEvent();
  initListEvent();
  initArrowBtnEvnet();
  initTabAndViewerEvent();
  initAlertEvent();
  initFieldTabEvent();
}

export { initEvent };
