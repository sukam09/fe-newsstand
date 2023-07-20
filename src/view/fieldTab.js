import { MODE, CATEGORY, GLOBAL } from "../model/variable.js";
import { strToCategory } from "../model/model.js";

function initFieldTab() {
  const dom = document.createElement("nav");
  dom.className = "field-tab";

  const progressDom = `<div class="progress-bar"></div>`;
  dom.innerHTML = progressDom;

  for (let category in CATEGORY) {
    const tempDom = `
    <button class="available-medium14">
      <span>${CATEGORY[category]}</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>`;
    dom.innerHTML += tempDom;
  }

  return dom;
}

function drawFieldTab() {
  settingFieldTab();

  const fieldTab = document.querySelector(".field-tab");
  const navBarDefaultLeft = fieldTab.getBoundingClientRect().left;
  const curPageInCategory = GLOBAL.LIST_CURRENT_PAGE - GLOBAL.CATEGORY_START_INDEX[strToCategory(GLOBAL.LIST_CURRENT_CATEGORY)] + 1;

  const progressRemoveTarget = fieldTab.querySelector(".progress");
  if (progressRemoveTarget) {
    progressRemoveTarget.className = "available-medium14";
  }

  fieldTab.querySelectorAll("div").forEach((element) => {
    if (element.className !== "progress-bar") {
      element.style.display = "none";
    }
  });

  const targetDomAll = document.querySelectorAll(".field-tab button");
  let targetDomIndex = 0;
  for (let category in CATEGORY) {
    if (CATEGORY[category] === GLOBAL.LIST_CURRENT_CATEGORY) {
      break;
    }
    targetDomIndex++;
  }
  const targetDom = targetDomAll[targetDomIndex];
  targetDom.querySelector("div").style.display = "flex";
  targetDom.className = "progress selected-bold14";
  targetDom.querySelectorAll("span")[1].innerHTML = curPageInCategory;
  targetDom.querySelectorAll("span")[2].innerHTML = GLOBAL.CATEGORY_NUM[strToCategory(GLOBAL.LIST_CURRENT_CATEGORY)];

  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.left = `${targetDom.getBoundingClientRect().left - navBarDefaultLeft}px`;
}

function settingFieldTab() {
  const fieldTab = document.querySelector(".field-tab");

  const progressDom = `<div class="progress-bar"></div>`;
  fieldTab.innerHTML = progressDom;

  const tabList = GLOBAL.CURRENT_MODE === MODE.LIST_ALL ? CATEGORY : GLOBAL.SUBSCRIBE_NEWS_DATA;
  for (let tab in tabList) {
    const tabName = GLOBAL.CURRENT_MODE === MODE.LIST_ALL ? tabList[tab] : tabList[tab].name;
    const buttonDom = `
    <button class="available-medium14">
      <span>${tabName}</span>
      <div>
        <span class="progress-curr-num display-bold12"></span>
        <img src="./icons/SymbolDivision.svg" />
        <span class="progress-total-num display-bold12"></span>
      </div>
    </button>`;
    fieldTab.innerHTML += buttonDom;
  }
}

export { initFieldTab, drawFieldTab };
