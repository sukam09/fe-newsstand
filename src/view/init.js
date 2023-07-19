import { initHeader, drawHeader } from "./header.js";
import { initRollingBar, drawRollingBar } from "./rollingBar.js";
import { initTabAndViewer, drawTab, drawViewer } from "./tabAndViewer.js";
import { initArrowBtn, drawLeftArrowBtn, drawRightArrowBtn } from "./arrowBtn.js";
import { initSnackBar, drawSnackBar } from "./snackBar.js";
import { initAlert, drawAlert } from "./alert.js";
import { initGrid, drawGrid } from "./grid.js";
import { initList, drawList } from "./list.js";

const container = document.querySelector(".container");

function initDom() {
  initHeader(container);
  initRollingBar(container);
  initTabAndViewer(container);
  initArrowBtn(container);
  initSnackBar(container);
  initAlert(container);
  initGrid(container);
  initList(container);

  drawAll();
}

function drawAll() {
  drawHeader();
  drawRollingBar();
  drawTab();
  drawViewer();
  drawLeftArrowBtn();
  drawRightArrowBtn();
  drawSnackBar();
  drawAlert();
  drawGrid();
  drawList();
}

export { initDom, drawAll };
