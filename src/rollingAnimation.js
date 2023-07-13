import { $ } from "./util.js";

// 롤링에 들어갈 뉴스 수
const ROLLING_NEWS_NUM = 5;
// 좌우 롤링 시간 차
const ANIMATION_GAP = 1000;
// 롤링되는 시간
const ROLLING_TIME = 5000;

// 왼쪽 배너 롤링 반복
let rollingIntervalLeft = setInterval(() => {
  rollingEvent("left");
}, ROLLING_TIME);

// 오른쪽 배너 롤링 1초 Timeout 후 반복
let rollingIntervalRight = setInterval(() => {
  setTimeout(() => {
    rollingEvent("right");
  }, ANIMATION_GAP);
}, ROLLING_TIME);

// 마우스 아웃시 반복 재시작
function startRolling(state) {
  if (state === "left") {
    rollingIntervalLeft = setInterval(() => {
      rollingEvent("left");
    }, ROLLING_TIME);
  } else {
    rollingIntervalRight = setInterval(() => {
      rollingEvent("right");
    }, ROLLING_TIME);
  }
}

// 마우스 호버시 반복 멈춤
function stopRolling(state) {
  if (state === "left") {
    clearInterval(rollingIntervalLeft);
  } else {
    clearInterval(rollingIntervalRight);
  }
}

// 롤링에 들어갈 뉴스 리스트 추가
export function appendRollingList() {
  const rollingListContainerLeft = $(".newsbanner__list-container--left");
  const rollingListContainerRight = $(".newsbanner__list-container--right");
  for (let i = 0; i < ROLLING_NEWS_NUM; i++) {
    const leftItem = createBannerItem(i, rollingNewsContentLeft[i], "left");
    const rightItem = createBannerItem(i, rollingNewsContentRight[i], "right");
    rollingListContainerLeft.appendChild(leftItem);
    rollingListContainerRight.appendChild(rightItem);
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
  $(
    `.newsbanner__list-container--${state} .newsbanner__list--prev`
  ).classList.remove("newsbanner__list--prev");

  // 현재 값 이전으로 옮기기
  let now = $(`.newsbanner__list-container--${state} .newsbanner__list--now`);
  now.classList.remove("newsbanner__list--now");
  now.classList.add("newsbanner__list--prev");
  // 다음 값 현재로 옮기기
  let next = $(`.newsbanner__list-container--${state} .newsbanner__list--next`);

  // 다음 값이 없다면 처음부터
  if (next.nextElementSibling === null) {
    $(
      `.newsbanner__list-container--${state} .newsbanner__list:first-child`
    ).classList.add("newsbanner__list--next");
  } else {
    next.nextElementSibling.classList.add("newsbanner__list--next");
  }
  next.classList.remove("newsbanner__list--next");
  next.classList.add("newsbanner__list--now");
}
