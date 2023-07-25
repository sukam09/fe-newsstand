import { MAX_GRID_COUNT, PRESS_COUNT } from "./core/store/constants.js";
import { getPressObj } from "./core/utils/api.js";
import { getState, register, setState } from "./core/observer/observer.js";
import {
  deletePress,
  gridPageIdx,
  isAlertOn,
  isGrid,
  isSnackOn,
  isSubTab,
  subscribeList,
} from "./core/store/store.js";
import { $, $All, shuffleArray } from "./core/utils/util.js";

let pressObj = null;

// 셔플된 리스트 그리드리스트에 append
function appendGridList(shuffledArr) {
  const isSubscribeTab = getState(isSubTab);
  const isGridMode = getState(isGrid);
  const subList = getState(subscribeList);
  const gridContainerList = $All(".grid_container");
  gridContainerList.forEach((item) => (item.innerHTML = ""));
  if (isGridMode) {
    gridContainerList[0].style.display = "grid";
    if (isSubscribeTab) {
      const subPressList = pressObj.filter((item) => {
        return subList.includes(item.name);
      });
      subPressList.forEach((element, idx) => {
        const id = Math.floor(idx / MAX_GRID_COUNT);
        const gridItem = createGridItem(element);
        gridContainerList[id].appendChild(gridItem);
      });
      for (let i = subPressList.length; i < PRESS_COUNT; i++) {
        const id = Math.floor(i / MAX_GRID_COUNT);
        const gridItem = document.createElement("li");
        gridItem.className = "grid_item";
        gridContainerList[id].appendChild(gridItem);
      }
    } else {
      shuffledArr.forEach((element, idx) => {
        const id = Math.floor(idx / MAX_GRID_COUNT);
        const gridItem = createGridItem(element);
        gridContainerList[id].appendChild(gridItem);
      });
    }
  } else {
    gridContainerList.forEach((item) => (item.style.display = "none"));
  }
}

// 구독버튼 컨테이너 생성
function createSubButtonContainer() {
  const subButtonContainer = document.createElement("div");
  subButtonContainer.className = "sub_button_container";
  return subButtonContainer;
}

// 구독버튼 생성
function createSubButton(id) {
  const subButtonContainer = createSubButtonContainer();
  const subButton = document.createElement("button");
  subButton.className = "sub_button";
  subButton.innerHTML = "+ 구독하기";

  subButton.addEventListener("click", () => {
    const currentSubList = getState(subscribeList);
    const targetPress = pressObj.find((item) => item.id === id);
    setState(subscribeList, [...currentSubList, targetPress.name]);
    setState(isSnackOn, true);
    toggleSubButton(targetPress, subButtonContainer);
  });
  subButtonContainer.appendChild(subButton);
  return subButtonContainer;
}

// 해지버튼 생성
function createUnSubButton(id) {
  const unSubButtonContainer = createSubButtonContainer();
  const unSubButton = document.createElement("button");
  unSubButton.className = "unsub_button";
  unSubButton.innerHTML = "✕ 해지하기";

  unSubButton.addEventListener("click", () => {
    const targetPress = pressObj.find((item) => item.id === id);
    setVisible(targetPress);
    toggleUnSubButton(targetPress, unSubButtonContainer);
  });
  unSubButtonContainer.appendChild(unSubButton);

  return unSubButtonContainer;
}
function setVisible(targetPress) {
  setState(isAlertOn, true);
  setState(deletePress, targetPress.name);
}

// 그리드 아이템 리스트 태그 생성
function createGridItem(element) {
  const newImg = document.createElement("img");
  const li = document.createElement("li");
  const subButtonContainer = createSubButton(element.id);
  const unSubButtonContainer = createUnSubButton(element.id);

  // 이미지 로드
  newImg.src = element.lightSrc;
  newImg.id = element.id;
  li.style.position = "relative";

  // li 생성
  li.className = "grid_item";
  li.append(subButtonContainer, unSubButtonContainer);
  li.addEventListener("mouseover", () => {
    toggleSubButton(element, subButtonContainer);
    toggleUnSubButton(element, unSubButtonContainer);
  });
  li.addEventListener("mouseout", () =>
    hiddenSubButtons(subButtonContainer, unSubButtonContainer)
  );

  li.appendChild(newImg);
  return li;
}

// 구독버튼 토글
function toggleSubButton(element, subButtonContainer) {
  const currentSubList = getState(subscribeList);
  subButtonContainer.style.display = currentSubList.includes(element.name)
    ? "none"
    : "flex";
}

// 해지버튼 토글
function toggleUnSubButton(element, unSubButtonContainer) {
  const currentSubList = getState(subscribeList);
  unSubButtonContainer.style.display = currentSubList.includes(element.name)
    ? "flex"
    : "none";
}

// 구독, 해지 버튼 숨기기
function hiddenSubButtons(subButtonContainer, unSubButtonContainer) {
  subButtonContainer.style.display = "none";
  unSubButtonContainer.style.display = "none";
}

// 그리드 페이지 업데이트
function showGridPage() {
  const gridContainer = $All(".grid_container");
  gridContainer.forEach((item) => (item.style.display = "none"));
  const nowPageIdx = getState(gridPageIdx);
  const curPage = $(`#page${nowPageIdx}`);
  curPage.style.display = "grid";
}

function checkMode() {
  const isSubView = getState(isSubTab);
  const subListCount = getState(subscribeList).length;
  if (isSubView) {
    switch (subListCount) {
      case 0:
        setState(isSubTab, false);
        return;
      case MAX_GRID_COUNT:
        setState(gridPageIdx, 0);
        return;
      case MAX_GRID_COUNT * 2:
        setState(gridPageIdx, 1);
        return;
    }
    appendGridList();
  }
}

async function setGridEvents() {
  pressObj = await getPressObj();
  const shuffledArr = shuffleArray(pressObj);
  appendGridList(shuffledArr);
  register(gridPageIdx, showGridPage);
  register(isSubTab, () => {
    appendGridList(shuffledArr);
  });
  register(isGrid, () => {
    appendGridList(shuffledArr);
  });
  register(subscribeList, checkMode);
}

export { setGridEvents };
