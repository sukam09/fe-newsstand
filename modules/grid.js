import { pressObjArr } from "./pressObj.js";

export let gridPage = 0;
const NUM_IN_A_GRID = 24;
const MAX_PAGE = 4;

export function initGrid() {
  const mainContent = document.getElementsByClassName("main_content")[0];
  const gridButton = document.getElementById("grid_button");
  for (let i = 0; i < MAX_PAGE; i++) {
    const gridContainer = document.createElement("ul");
    gridContainer.id = `grid_page_${i}`;
    gridContainer.className = "grid_container";
    gridContainer.style.display = "none";

    for (let j = 0; j < NUM_IN_A_GRID; j++) {
      const idx = i * NUM_IN_A_GRID + j;
      const newItem = createGridItem(pressObjArr[idx]);
      gridContainer.appendChild(newItem);
    }
    mainContent.appendChild(gridContainer);
  }
  gridButton.className = "clicked";
}

export function showGridPage(page) {
  const gridContainer = document.getElementById(`grid_page_${page}`);
  gridContainer.style.display = "grid";
}
export function hiddenGridPage(page) {
  const gridContainer = document.getElementById(`grid_page_${page}`);
  gridContainer.style.display = "none";
}

// 구독버튼 컨테이너 생성
export function createSubButtonContainer() {
  const subButtonContainer = document.createElement("div");
  subButtonContainer.className = "sub_button_container";

  return subButtonContainer;
}

// 구독버튼 생성
export function createSubButton(id) {
  const subButtonContainer = createSubButtonContainer();
  const subButton = document.createElement("button");
  subButton.className = "sub_button";
  subButton.innerHTML = "+ 구독하기";

  subButton.addEventListener("click", () => {
    const targetPress = pressObjArr.find((item) => item.id == id);
    targetPress.isSub = true;

    toggleSubButton(targetPress, subButtonContainer);
  });

  subButtonContainer.appendChild(subButton);
  return subButtonContainer;
}

// 구독 해지 버튼 생성
export function createUnSubButton(id) {
  const unSubButtonContainer = createSubButtonContainer();
  const unSubButton = document.createElement("button");
  unSubButton.className = "unsub_button";
  unSubButton.innerHTML = "✕ 해지하기";

  unSubButton.addEventListener("click", () => {
    const targetPress = pressObjArr.find((item) => item.id == id);
    targetPress.isSub = false;
    toggleUnSubButton(targetPress, unSubButtonContainer);
  });

  unSubButtonContainer.appendChild(unSubButton);

  return unSubButtonContainer;
}

// 그리드 아이템 리스트 태그 생성
export function createGridItem(pressObj) {
  const newImg = document.createElement("img");
  const li = document.createElement("li");
  const subButtonContainer = createSubButton(pressObj.id);
  const unSubButtonContainer = createUnSubButton(pressObj.id);

  // 이미지 로드
  newImg.src = pressObj.src;
  newImg.id = pressObj.id;
  li.style.position = "relative";

  // li 생성
  li.className = "grid_item";
  li.append(subButtonContainer);
  li.append(unSubButtonContainer);
  li.addEventListener("mouseover", () => {
    toggleSubButton(pressObj, subButtonContainer);
    toggleUnSubButton(pressObj, unSubButtonContainer);
  });
  li.addEventListener("mouseout", () =>
    hiddenSubButtons(subButtonContainer, unSubButtonContainer)
  );

  li.appendChild(newImg);
  return li;
}

// 구독버튼 토글
export function toggleSubButton(element, subButtonContainer) {
  if (element.isSub) {
    subButtonContainer.style.display = "none";
  } else {
    subButtonContainer.style.display = "flex";
  }
}

// 해지버튼 토글
export function toggleUnSubButton(element, unSubButtonContainer) {
  if (element.isSub) {
    unSubButtonContainer.style.display = "flex";
  } else {
    unSubButtonContainer.style.display = "none";
  }
}

// 구독, 해지 버튼 숨기기
export function hiddenSubButtons(subButtonContainer, unSubButtonContainer) {
  subButtonContainer.style.display = "none";
  unSubButtonContainer.style.display = "none";
}

// 그리드 다음 페이지 전환
export function showNextGridPage() {
  hiddenGridPage(gridPage);
  gridPage += 1;
  if (gridPage >= MAX_PAGE) {
    gridPage = MAX_PAGE - 1;
  }
  showGridPage(gridPage);
  showGridPageButton();
}

// 그리드 이전 페이지 전환
export function showPrevGridPage() {
  hiddenGridPage(gridPage);
  gridPage -= 1;
  if (gridPage < 0) {
    gridPage = 0;
  }
  showGridPage(gridPage);
  showGridPageButton();
}

// 그리뷰의 좌우 페이지 전환 버튼 업데이트
export function showGridPageButton() {
  const left_grid_button =
    document.getElementsByClassName("left_grid_button")[0];
  const right_grid_button =
    document.getElementsByClassName("right_grid_button")[0];

  console.log(gridPage);
  if (gridPage <= 0) {
    left_grid_button.style.display = "none";
    right_grid_button.style.display = "block";
  } else if (gridPage >= MAX_PAGE - 1) {
    left_grid_button.style.display = "block";
    right_grid_button.style.display = "none";
  } else {
    left_grid_button.style.display = "block";
    right_grid_button.style.display = "block";
  }
}
