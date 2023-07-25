import { PATH, MODE } from "../model/variable.js";
import { getState, subscribe } from "../controller/observer.js";
import { toggleSubscription, toggleDarkMode, currentMode } from "../model/store.js";

function initTabAndViewer(parentNode) {
  const dom = `
  <nav class="tab-and-viewer">
    <div class="tabs">
      <span class="all-press-btn">전체 언론사</span>
      <span class="sub-press-btn">내가 구독한 언론사</span>
    </div>
    <div class="viewer">
      <button class="list-btn">
        <img src="" />
      </button>
      <button class="grid-btn">
        <img src="" />
      </button>
    </div>
  </nav>`;

  parentNode.innerHTML += dom;
}

function drawTab() {
  const allPressBtn = document.querySelector(".all-press-btn");
  const subPressBtn = document.querySelector(".sub-press-btn");

  if (getState(currentMode) === MODE.GRID_ALL || getState(currentMode) === MODE.LIST_ALL) {
    allPressBtn.className = "all-press-btn selected-bold16 selected-tab";
    subPressBtn.className = "sub-press-btn available-medium16 available-tab";
  } else {
    allPressBtn.className = "all-press-btn available-medium16 available-tab";
    subPressBtn.className = "sub-press-btn selected-bold16 selected-tab";
  }
}

function drawViewer() {
  const listBtnImg = document.querySelector(".list-btn img");
  const gridBtnImg = document.querySelector(".grid-btn img");

  if (getState(currentMode) === MODE.GRID_ALL || getState(currentMode) === MODE.GRID_SUB) {
    listBtnImg.src = PATH.LIST_BTN;
    gridBtnImg.src = PATH.GRID_BTN_BLUE;
  } else {
    listBtnImg.src = PATH.LIST_BTN_BLUE;
    gridBtnImg.src = PATH.GRID_BTN;
  }
}

subscribe(toggleSubscription, drawTab);
subscribe(toggleSubscription, drawViewer);

subscribe(currentMode, drawTab);
subscribe(toggleDarkMode, drawTab);
subscribe(currentMode, drawViewer);
subscribe(toggleDarkMode, drawViewer);

export { initTabAndViewer, drawTab, drawViewer };
