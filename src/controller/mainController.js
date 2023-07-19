import { STATE, GLOBAL } from "../model/variable.js";
import { initRollingEvent } from "./rollingController.js";
import { initGridEvent } from "./gridController.js";
import { initArrowBtnEvnet } from "./arrowBtnController.js";

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

  return 0;
}

function changeState(state) {
  switch (state) {
    case STATE.GRID_MOVE_LEFT:
      drawGrid();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    case STATE.GRID_MOVE_RIGHT:
      drawGrid();
      drawLeftArrowBtn();
      drawRightArrowBtn();
      break;
    default:
      break;
  }
}

export { initEvent, changeState };
