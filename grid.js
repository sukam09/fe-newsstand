let now_grid_page = 0;

// 언론사 랜덤 셔플
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 셔플된 리스트 그리드리스트에 append
function appendList() {
  const gridContainerList = document.getElementsByClassName("grid_container");
  const shuffledArr = shuffleArray(pressObjArr);

  shuffledArr.forEach((element, idx) => {
    const id = Math.floor(idx / 24);
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
    const targetPress = pressObjArr.find((item) => item.id == id);
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
    const targetPress = pressObjArr.find((item) => item.id == id);
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
  newImg.src = element.imgSrc;
  newImg.id = element.id;
  li.style.position = "relative";

  // li 생성
  li.className = "item";
  li.append(subButtonContainer);
  li.append(unSubButtonContainer);
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
  if (element.isSub) {
    subButtonContainer.style.display = "none";
  } else {
    subButtonContainer.style.display = "flex";
  }
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

// 그리드 다음 페이지 전환
function showNextGridPage() {
  const curPage = document.getElementById(`page${now_grid_page}`);
  now_grid_page > 3 ? (now_grid_page = 3) : (now_grid_page += 1);
  const nextPage = document.getElementById(`page${now_grid_page}`);
  curPage.style.display = "none";
  nextPage.style.display = "grid";
  showGridPageButton();
}

// 그리드 이전 페이지 전환
function showPrevGridPage() {
  const curPage = document.getElementById(`page${now_grid_page}`);
  now_grid_page < 0 ? (now_grid_page = 0) : (now_grid_page -= 1);
  const nextPage = document.getElementById(`page${now_grid_page}`);
  curPage.style.display = "none";
  nextPage.style.display = "grid";
  showGridPageButton();
}

// 그리뷰의 좌우 페이지 전환 버튼 업데이트
function showGridPageButton() {
  const left_grid_button =
    document.getElementsByClassName("left_grid_button")[0];
  const right_grid_button =
    document.getElementsByClassName("right_grid_button")[0];
  switch (now_grid_page) {
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
