import {
  ANIMATION_GAP,
  BANNER_LIST,
  NEXT_BANNER,
  NOW_BANNER,
  PREV_BANNER,
  ROLLING_NEWS_NUM,
  ROLLING_TIME,
} from "../constant/constants.js";
import { getRollingList } from "./api.js";
import { $ } from "./util.js";

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
export async function appendRollingList() {
  const headlineData = await getRollingList();
  const rollingListContainerLeft = $(".newsbanner__list-container--left");
  const rollingListContainerRight = $(".newsbanner__list-container--right");
  for (let i = 0; i < ROLLING_NEWS_NUM; i++) {
    const leftItem = createBannerItem(i, headlineData[i].title, "left");
    const rightItem = createBannerItem(i, headlineData[i + 5].title, "right");
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
      newItem.className = `${BANNER_LIST} ${PREV_BANNER}`;
      break;
    case 1:
      newItem.className = `${BANNER_LIST} ${NOW_BANNER}`;
      break;
    case 2:
      newItem.className = `${BANNER_LIST} ${NEXT_BANNER}`;
      break;
    default:
      newItem.className = `${BANNER_LIST}`;
  }
  return newItem;
}

// 롤링 애니메이션
function rollingEvent(state) {
  // 이전 값 삭제
  $(`.newsbanner__list-container--${state} .${PREV_BANNER}`).classList.remove(
    PREV_BANNER
  );

  // 현재 값 이전으로 옮기기
  let now = $(`.newsbanner__list-container--${state} .${NOW_BANNER}`);
  now.classList.remove(NOW_BANNER);
  now.classList.add(PREV_BANNER);
  // 다음 값 현재로 옮기기
  let next = $(`.newsbanner__list-container--${state} .${NEXT_BANNER}`);

  // 다음 값이 없다면 처음부터
  if (next.nextElementSibling === null) {
    $(
      `.newsbanner__list-container--${state} .newsbanner__list:first-child`
    ).classList.add(NEXT_BANNER);
  } else {
    next.nextElementSibling.classList.add(NEXT_BANNER);
  }
  next.classList.remove(NEXT_BANNER);
  next.classList.add(NOW_BANNER);
}
