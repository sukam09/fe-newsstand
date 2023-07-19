import { STATE, GLOBAL } from "../model/variable.js";
import { initRollingEvent } from "./rollingController.js";
import { initGridEvent } from "./gridController.js";
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
  initArrowBtnEvnet();
  initTabAndViewerEvent();

  return 0;
}

function changeState(state) {
  switch (state) {
    case STATE.MOVE_GRID_LEFT:
      drawGrid();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    case STATE.MOVE_GRID_RIGHT:
      drawGrid();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    case STATE.MOVE_GRID_ALL:
      drawGrid();
      drawTab();
      drawViewer();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    case STATE.MOVE_GRID_SUB:
      drawGrid();
      drawTab();
      drawViewer();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    case STATE.MOVE_LIST_ALL:
      drawList();
      drawTab();
      drawViewer();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    case STATE.MOVE_LIST_SUB:
      drawList();
      drawTab();
      drawViewer();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    default:
      break;
  }
}

export { initEvent, changeState };
