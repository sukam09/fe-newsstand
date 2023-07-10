const ROLLING_NEWS_NUM = 5;
let rollingIntervalLeft = setInterval(() => {
  rollingEvent("left");
}, 3000);
let rollingIntervalRight = setInterval(() => {
  rollingEvent("right");
}, 3000);

function startRolling(state) {
  if (state == "left") {
    rollingIntervalLeft = setInterval(() => {
      rollingEvent("left");
    }, 3000);
  } else {
    rollingIntervalRight = setInterval(() => {
      rollingEvent("right");
    }, 3000);
  }
}
function stopRolling(state) {
  if (state == "left") {
    clearInterval(rollingIntervalLeft);
  } else {
    clearInterval(rollingIntervalRight);
  }
}

// 롤링에 들어갈 뉴스 리스트 추가
function appendRollingList() {
  const rollingListContainerLeft = document.getElementsByClassName(
    "newsbanner__list-container--left"
  );
  const rollingListContainerRight = document.getElementsByClassName(
    "newsbanner__list-container--right"
  );
  for (let i = 0; i < ROLLING_NEWS_NUM; i++) {
    const leftItem = createBannerItem(i, rollingNewsContentLeft[i], "left");
    const rightItem = createBannerItem(i, rollingNewsContentRight[i], "right");
    rollingListContainerLeft[0].appendChild(leftItem);
    rollingListContainerRight[0].appendChild(rightItem);
  }
}

// 롤링 컨테이너에 넣을 리스트 생성
function createBannerItem(idx, content, state) {
  const newItem = document.createElement("li");
  newItem.innerHTML = content;
  newItem.addEventListener("mouseover", () => {
    newItem.style.textDecorationLine = "underline";
    newItem.style.cursor = "pointer";
    stopRolling(state);
  });
  newItem.addEventListener("mouseout", () => {
    newItem.style.textDecorationLine = "none";
    startRolling(state);
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
function rollingEvent(state) {
  // 이전 값 삭제
  document
    .querySelector(
      `.newsbanner__list-container--${state} .newsbanner__list--prev`
    )
    .classList.remove("newsbanner__list--prev");

  // 현재 값 이전으로 옮기기
  let now = document.querySelector(
    `.newsbanner__list-container--${state} .newsbanner__list--now`
  );
  now.classList.remove("newsbanner__list--now");
  now.classList.add("newsbanner__list--prev");
  // 다음 값 현재로 옮기기
  let next = document.querySelector(
    `.newsbanner__list-container--${state} .newsbanner__list--next`
  );

  // 다음 값이 없다면 처음부터
  if (next.nextElementSibling == null) {
    document
      .querySelector(
        `.newsbanner__list-container--${state} .newsbanner__list:first-child`
      )
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
