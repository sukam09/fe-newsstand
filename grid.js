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
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function appendList() {
  const grid_container_list = document.getElementsByClassName("grid_container");
  const shuffledArr = shuffleArray(pressObjArr);

  shuffledArr.forEach((element, idx) => {
    const id = Math.floor(idx / 24);
    const gridItem = createGridItem(element);
    grid_container_list[id].appendChild(gridItem);
  });
}

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

function toggleSubButton(element, subButtonContainer) {
  if (element.isSub) {
    subButtonContainer.style.display = "none";
  } else {
    subButtonContainer.style.display = "flex";
  }
}
function toggleUnSubButton(element, unSubButtonContainer) {
  if (element.isSub) {
    unSubButtonContainer.style.display = "flex";
  } else {
    unSubButtonContainer.style.display = "none";
  }
}

function hiddenSubButtons(subButtonContainer, unSubButtonContainer) {
  subButtonContainer.style.display = "none";
  unSubButtonContainer.style.display = "none";
}

function createSubButtonContainer() {
  const subButtonContainer = document.createElement("div");
  subButtonContainer.className = "sub_button_container";

  return subButtonContainer;
}

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

function rightGridButtonClick() {
  const curPage = document.getElementById(`page${now_grid_page}`);
  now_grid_page > 3 ? (now_grid_page = 3) : (now_grid_page += 1);
  const nextPage = document.getElementById(`page${now_grid_page}`);
  curPage.style.display = "none";
  nextPage.style.display = "grid";
  showGridPageButton();
}

function leftGridButtonClick() {
  const curPage = document.getElementById(`page${now_grid_page}`);
  now_grid_page < 0 ? (now_grid_page = 0) : (now_grid_page -= 1);
  const nextPage = document.getElementById(`page${now_grid_page}`);
  curPage.style.display = "none";
  nextPage.style.display = "grid";
  showGridPageButton();
}
