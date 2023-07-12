import { pressGrid } from "./components/mainSection/mainBody/pressGrid/pressGrid.js";

export let gridPage = 0;
const MAX_PAGE = 4;

export function initGridView(pressDataArr) {
  // create grid
  const $gridContainer = document.getElementById("grid_container");
  for (let i = 0; i < MAX_PAGE; i++) {
    $gridContainer.innerHTML += pressGrid(pressDataArr, i);
  }

  // addEvent
  const pressItems = $gridContainer.getElementsByClassName("grid_item");
  for (let i = 0; i < pressItems.length; i++) {
    pressItems[i].addEventListener("mouseover", (e) => {
      e.currentTarget.getElementsByClassName(
        "sub_button_container"
      )[0].style.display = "flex";
    });
    pressItems[i].addEventListener("mouseout", (e) => {
      e.currentTarget.getElementsByClassName(
        "sub_button_container"
      )[0].style.display = "none";
    });
  }

  const gridButton = document.getElementById("grid_button");
  gridButton.className = "view_clicked";
}

export function showGridPage(page) {
  const pressGrid = document.getElementById(`grid_page_${page}`);
  pressGrid.style.display = "grid";
}
export function hiddenGridPage(page) {
  const pressGrid = document.getElementById(`grid_page_${page}`);
  pressGrid.style.display = "none";
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
