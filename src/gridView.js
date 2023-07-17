import { MAX_GRID_COUNT, NOW_GRID_PAGE } from "../constant/constants.js";
import { getPressObj } from "./api.js";
import { $, $All, shuffleArray } from "./util.js";

// 셔플된 리스트 그리드리스트에 append
export async function appendGridList() {
  const gridContainerList = $All(".grid_container");
  const pressObj = await getPressObj();
  const shuffledArr = shuffleArray(pressObj);
  shuffledArr.forEach((element, idx) => {
    const id = Math.floor(idx / MAX_GRID_COUNT);
    const gridItem = createGridItem(element);
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
  const subButtonContainer = createSubButtonContainer();
  const subButton = document.createElement("button");
  subButton.className = "sub_button";
  subButton.innerHTML = "+ 구독하기";

  subButton.addEventListener("click", () => {
    const targetPress = pressObj.find((item) => item.id === id);
    targetPress.isSub = true;
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
export function showGridPage(increment) {
  const curPage = $(`#page${NOW_GRID_PAGE.getValue()}`);
  NOW_GRID_PAGE.incrementValue(increment);
  const nextPage = $(`#page${NOW_GRID_PAGE.getValue()}`);
  NOW_GRID_PAGE.setValue(Math.max(0, Math.min(NOW_GRID_PAGE.getValue(), 3)));
  curPage.style.display = "none";
  nextPage.style.display = "grid";
  showGridPageButton();
}

// 그리뷰의 좌우 페이지 전환 버튼 업데이트
export function showGridPageButton() {
  const left_grid_button = $(".left_grid_button");
  const right_grid_button = $(".right_grid_button");
  switch (NOW_GRID_PAGE.getValue()) {
    case 0:
      left_grid_button.style.display = "none";
      right_grid_button.style.display = "block";
      return;
    case 3:
      left_grid_button.style.display = "block";
      right_grid_button.style.display = "none";
      return;
    default:
      left_grid_button.style.display = "block";
      right_grid_button.style.display = "block";
  }
}

(function init() {
  const leftButton = document.querySelector(".left_grid_button");
  const rightButton = document.querySelector(".right_grid_button");
  leftButton.addEventListener("click", () => showGridPage(-1));
  rightButton.addEventListener("click", () => showGridPage(1));
})();
