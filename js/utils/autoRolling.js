import {
  ROLLING_WAIT_TIME,
  ROLLING_DIFF_TIME,
} from "../constants/constants.js";
let leftAutoRollingInterval;
let rightAutoRollingInterval;

function rollingCallback(target) {
  //.prev 클래스 삭제
  document.querySelector(`#${target} .wrap .prev`).classList.remove("prev");

  //.current -> .prev
  let current = document.querySelector(`#${target} .wrap .current`);
  current.classList.remove("current");
  current.classList.add("prev");

  //.next -> .current
  let next = document.querySelector(`#${target} .wrap .next`);
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document
      .querySelector(`#${target} .wrap ul li:first-child`)
      .classList.add("next");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

export function autoRollingAnimation() {
  document.addEventListener("DOMContentLoaded", () => {
    leftAutoRollingInterval = setInterval(
      () => rollingCallback("recent-left"),
      ROLLING_WAIT_TIME
    );
    setTimeout(() => {
      rightAutoRollingInterval = setInterval(
        () => rollingCallback("recent-right"),
        ROLLING_WAIT_TIME
      );
    }, ROLLING_DIFF_TIME);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      clearInterval(leftAutoRollingInterval);
      clearInterval(rightAutoRollingInterval);
    } else {
      clearInterval(leftAutoRollingInterval);
      clearInterval(rightAutoRollingInterval);
      leftAutoRollingInterval = setInterval(
        () => rollingCallback("recent-left"),
        ROLLING_WAIT_TIME
      );
      setTimeout(() => {
        rightAutoRollingInterval = setInterval(
          () => rollingCallback("recent-right"),
          ROLLING_WAIT_TIME
        );
      }, ROLLING_DIFF_TIME);
    }
  });

  document.addEventListener("mouseover", (e) => {
    const target = e.target;
    if (target.matches("#recent-left .wrap a")) {
      clearInterval(leftAutoRollingInterval);
    } else if (target.matches("#recent-right .wrap a")) {
      clearInterval(rightAutoRollingInterval);
    }
  });

  document.addEventListener("mouseout", (e) => {
    const target = e.target;
    if (target.matches("#recent-left .wrap a")) {
      leftAutoRollingInterval = setInterval(
        () => rollingCallback("recent-left"),
        ROLLING_WAIT_TIME
      );
    } else if (target.matches("#recent-right .wrap a")) {
      setTimeout(() => {
        rightAutoRollingInterval = setInterval(
          () => rollingCallback("recent-right"),
          ROLLING_WAIT_TIME
        );
      }, ROLLING_DIFF_TIME);
    }
  });
}
