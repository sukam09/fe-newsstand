import { MAX_GRID_COUNT } from "../constant/constants.js";
import { getPressObj } from "./api.js";
import { getState, resister } from "./observer/observer.js";
import { gridPageIdx } from "./store/store.js";
import { $, $All, shuffleArray } from "./util.js";

let cachedpressObj = null;

// 셔플된 리스트 그리드리스트에 append
async function appendGridList() {
  const gridContainerList = $All(".grid_container");
  if (cachedpressObj === null) {
    cachedpressObj = await getPressObj();
  }
  const shuffledArr = shuffleArray(cachedpressObj);
  await shuffledArr.forEach(async (element, idx) => {
    const id = Math.floor(idx / MAX_GRID_COUNT);
    const gridItem = await createGridItem(element);
    gridContainerList[id].appendChild(gridItem);
  });
}

// 구독버튼 컨테이너 생성
function createSubButtonContainer() {
  const subButtonContainer = document.createElement("div");
  subButtonContainer.className = "sub_button_container";
  return subButtonContainer;
}

// 구독버튼 생성
function createSubButton(id) {
  if (cachedpressObj === null) {
    cachedpressObj = getPressObj();
  }
  const subButtonContainer = createSubButtonContainer();
  const subButton = document.createElement("button");
  subButton.className = "sub_button";
  subButton.innerHTML = "+ 구독하기";

  subButton.addEventListener("click", () => {
    const targetPress = cachedpressObj.find((item) => item.id === id);
    targetPress.isSub = true;
    toggleSubButton(targetPress, subButtonContainer);
  });
  subButtonContainer.appendChild(subButton);
  return subButtonContainer;
}

// 해지버튼 생성
function createUnSubButton(id) {
  if (cachedpressObj === null) {
    cachedpressObj = getPressObj();
  }
  const unSubButtonContainer = createSubButtonContainer();
  const unSubButton = document.createElement("button");
  unSubButton.className = "unsub_button";
  unSubButton.innerHTML = "✕ 해지하기";

  unSubButton.addEventListener("click", () => {
    const targetPress = cachedpressObj.find((item) => item.id === id);
    targetPress.isSub = false;
    toggleUnSubButton(targetPress, unSubButtonContainer);
  });
  unSubButtonContainer.appendChild(unSubButton);

  return unSubButtonContainer;
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
  subButtonContainer.style.display = element.isSub ? "none" : "flex";
}

// 해지버튼 토글
function toggleUnSubButton(element, unSubButtonContainer) {
  if (element.isSub) {
    unSubButtonContainer.style.display = "flex";
  } else {
    unSubButtonContainer.style.display = "none";
  }
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

// 그리뷰의 좌우 페이지 전환 버튼 업데이트

function setGridEvents() {
  appendGridList();
  resister(gridPageIdx, showGridPage);
  // resister(isGrid, showGridPageButton);
}

export { setGridEvents };
