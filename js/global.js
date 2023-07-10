let interval = setInterval(rollingEvent, 3000);

function startRolling() {
  interval = setInterval(rollingEvent, 3000);
}
function stopRolling() {
  clearInterval(interval);
}
function appendRollingList() {
  const rollingListContainer = document.getElementsByClassName(
    "newsbanner__list-container"
  );
  rollingNewsContent.forEach((item, idx) => {
    const bannerItem = createBannerItem(idx, item);
    rollingListContainer[0].appendChild(bannerItem);
  });
}

function createBannerItem(idx, content) {
  const newItem = document.createElement("li");
  newItem.innerHTML = content;
  newItem.addEventListener("mouseover", () => {
    newItem.style.textDecorationLine = "underline";
    newItem.style.cursor = "pointer";
    stopRolling();
  });
  newItem.addEventListener("mouseout", () => {
    newItem.style.textDecorationLine = "none";
    startRolling();
  });
  switch (idx) {
    case 0:
      newItem.className = "newsbanner__list newsbanner__list--prev";
      break;
    case 1:
      newItem.className = "newsbanner__list newsbanner__list--now";
      break;
    case 2:
      newItem.className = "newsbanner__list newsbanner__list--next";
      break;
    default:
      newItem.className = "newsbanner__list";
  }
  return newItem;
}

// 롤링 애니메이션
function rollingEvent() {
  // 이전 값 삭제
  document
    .querySelector(".newsbanner__list--prev")
    .classList.remove("newsbanner__list--prev");

  // 현재 값 이전으로 옮기기
  let now = document.querySelector(".newsbanner__list--now");
  now.classList.remove("newsbanner__list--now");
  now.classList.add("newsbanner__list--prev");

  // 다음 값 현재로 옮기기
  let next = document.querySelector(".newsbanner__list--next");

  // 다음 값이 없다면 처음부터
  if (next.nextElementSibling == null) {
    document
      .querySelector(".newsbanner__list:first-child")
      .classList.add("newsbanner__list--next");
  } else {
    next.nextElementSibling.classList.add("newsbanner__list--next");
  }
  next.classList.remove("newsbanner__list--next");
  next.classList.add("newsbanner__list--now");
}

// 그리드 뷰로 전환
function changeToGrid() {
  const list_button = document.getElementsByClassName("list_button")[0];
  const grid_button = document.getElementsByClassName("grid_button")[0];
  const list_container = document.getElementsByClassName("list_container")[0];
  const grid_container =
    document.getElementsByClassName("grid_container")[now_grid_page];
  const left_list_button =
    document.getElementsByClassName("left_list_button")[0];
  const right_list_button =
    document.getElementsByClassName("right_list_button")[0];
  const left_grid_button =
    document.getElementsByClassName("left_grid_button")[0];
  const right_grid_button =
    document.getElementsByClassName("right_grid_button")[0];

  // 버튼 색상 바꾸기
  list_button.src = "./assets/icons/list_off.png";
  grid_button.src = "./assets/icons/grid_on.png";

  // 그리드, 리스트 전환
  list_container.style.display = "none";
  grid_container.style.display = "grid";

  // 버튼 바꾸기
  left_grid_button.style.display = "block";
  right_grid_button.style.display = "block";
  left_list_button.style.display = "none";
  right_list_button.style.display = "none";
  showGridPageButton();
}

// 리스트 뷰로 변환
function changeToList() {
  const list_button = document.getElementsByClassName("list_button")[0];
  const grid_button = document.getElementsByClassName("grid_button")[0];
  const list_container = document.getElementsByClassName("list_container")[0];
  const grid_container =
    document.getElementsByClassName("grid_container")[now_grid_page];
  const left_list_button =
    document.getElementsByClassName("left_list_button")[0];
  const right_list_button =
    document.getElementsByClassName("right_list_button")[0];
  const left_grid_button =
    document.getElementsByClassName("left_grid_button")[0];
  const right_grid_button =
    document.getElementsByClassName("right_grid_button")[0];

  // 버튼 색상 바꾸기
  list_button.src = "./assets/icons/list_on.png";
  grid_button.src = "./assets/icons/grid_off.png";

  // 그리드, 리스트 전환
  list_container.style.display = "block";
  grid_container.style.display = "none";

  // 버튼 바꾸기
  left_grid_button.style.display = "none";
  right_grid_button.style.display = "none";
  left_list_button.style.display = "block";
  right_list_button.style.display = "block";
}

// 오늘 날짜 update
function updateDate() {
  let today = new Date();
  const dateHtml = document.getElementsByClassName("container__header_date")[0];
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  today = today.toLocaleDateString("ko-KR", options);
  dateHtml.innerHTML = today;
}
