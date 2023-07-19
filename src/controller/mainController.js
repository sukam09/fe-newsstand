import { STATE, GLOBAL } from "../model/variable.js";
import { initRollingEvent } from "./rollingController.js";
import { initGridEvent } from "./gridController.js";
import { initListEvent } from "./listController.js";
import { initArrowBtnEvnet } from "./arrowBtnController.js";
import { initTabAndViewerEvent } from "./tabAndViewerController.js";

import { drawHeader } from "../view/header.js";
import { drawRollingBar } from "../view/rollingBar.js";
import { drawTab, drawViewer } from "../view/tabAndViewer.js";
import { drawLeftArrowBtn, drawRightArrowBtn } from "../view/arrowBtn.js";
import { drawSnackBar } from "../view/snackBar.js";
import { drawAlert } from "../view/alert.js";
import { drawGrid } from "../view/grid.js";
import { drawList } from "../view/list.js";

function initEvent() {
  initRollingEvent();
  initGridEvent();
  initListEvent();
  initArrowBtnEvnet();
  initTabAndViewerEvent();
}

function changeState(state) {
  switch (state) {
    case STATE.MOVE_GRID_LEFT:
      drawGridAndArrow();
      break;
    case STATE.MOVE_GRID_RIGHT:
      drawGridAndArrow();
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

export { initEvent, changeState };
