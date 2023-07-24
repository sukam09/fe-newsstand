import { PATH, MODE, GLOBAL } from "../model/variable.js";
import { subscribe } from "../controller/observer.js";
import { toggleView, toggleSubscription, toggleDarkMode } from "../model/store.js";

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

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_ALL) {
    allPressBtn.className = "all-press-btn selected-bold16 selected-tab";
    subPressBtn.className = "sub-press-btn available-medium16 available-tab";
  } else if (GLOBAL.CURRENT_MODE === MODE.GRID_SUB || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
    allPressBtn.className = "all-press-btn available-medium16 available-tab";
    subPressBtn.className = "sub-press-btn selected-bold16 selected-tab";
  }
}

function drawViewer() {
  const listBtnImg = document.querySelector(".list-btn img");
  const gridBtnImg = document.querySelector(".grid-btn img");

  if (GLOBAL.CURRENT_MODE === MODE.GRID_ALL || GLOBAL.CURRENT_MODE === MODE.GRID_SUB) {
    listBtnImg.src = PATH.LIST_BTN;
    gridBtnImg.src = PATH.GRID_BTN_BLUE;
  } else if (GLOBAL.CURRENT_MODE === MODE.LIST_ALL || GLOBAL.CURRENT_MODE === MODE.LIST_SUB) {
    listBtnImg.src = PATH.LIST_BTN_BLUE;
    gridBtnImg.src = PATH.GRID_BTN;
  }
}

subscribe(toggleView, drawTab);
subscribe(toggleSubscription, drawTab);
subscribe(toggleView, drawViewer);
subscribe(toggleSubscription, drawViewer);
subscribe(toggleDarkMode, drawViewer);

export { initTabAndViewer, drawTab, drawViewer };
