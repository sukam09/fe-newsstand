import { MODE, STATE, GLOBAL } from "../model/variable.js";
import { initRollingEvent } from "./rollingController.js";
import { initGridEvent } from "./gridController.js";
import { initListEvent } from "./listController.js";
import { initArrowBtnEvnet } from "./arrowBtnController.js";
import { initTabAndViewerEvent } from "./tabAndViewerController.js";
import { initSnackBarTimer, initAlertEvent } from "./componentController.js";

import { drawTab, drawViewer } from "../view/tabAndViewer.js";
import { drawLeftArrowBtn, drawRightArrowBtn } from "../view/arrowBtn.js";
import { drawSnackBar } from "../view/snackBar.js";
import { drawAlert } from "../view/alert.js";
import { drawGrid } from "../view/grid.js";
import { drawList } from "../view/list.js";
import { drawSubscribeBtn } from "../view/subscribe.js";

function initEvent() {
  initRollingEvent();
  initGridEvent();
  initListEvent();
  initArrowBtnEvnet();
  initTabAndViewerEvent();
  initAlertEvent();
}

function changeState(state) {
  switch (state) {
    case STATE.MOVE_GRID_LEFT:
      drawGridAndArrow();
      break;
    case STATE.MOVE_GRID_RIGHT:
      drawGridAndArrow();
      break;
    case STATE.MOVE_LIST_LEFT:
      drawList();
      break;
    case STATE.MOVE_LIST_RIGHT:
      drawList();
      break;
    case STATE.MOVE_GRID_ALL:
      drawGridAndOthers();
      break;
    case STATE.MOVE_GRID_SUB:
      drawGridAndOthers();
      break;
    case STATE.MOVE_LIST_ALL:
      drawListAndOthers();
      break;
    case STATE.MOVE_LIST_SUB:
      drawListAndOthers();
      break;
    case STATE.SUBSCRIBE_NEWS:
    case STATE.UNSUBSCRIBE_NEWS:
      drawRefresh();
      break;
    case STATE.SHOW_SNACKBAR:
      drawSnackBar();
      initSnackBarTimer();
      break;
    case STATE.SHOW_ALERT:
      drawAlert(GLOBAL.TEMP_TARGET);
      break;
    default:
      break;
  }
}

function drawGridAndArrow() {
  drawGrid();
  drawLeftArrowBtn();
  drawRightArrowBtn();
}

function drawGridAndOthers() {
  drawGrid();
  drawOthers();
}

function drawListAndOthers() {
  drawList();
  drawOthers();
}

function drawOthers() {
  drawTab();
  drawViewer();
  drawLeftArrowBtn();
  drawRightArrowBtn();
}

function drawRefresh() {
  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    drawGridAndOthers();
  } else {
    drawListAndOthers();
  }
}

export { initEvent, changeState };
