/***** 뉴스 배너 롤링 *****/
const ROLLING_TIME = 5000;
const SECOND_BANNER_DELAY = 1000;

function rollingCallback(idx) {
  document.querySelector(`.rolling-${idx} .prev`).classList.remove("prev");

  let current = document.querySelector(`.rolling-${idx} .current`);
  current.classList.remove("current");
  current.classList.add("prev");

  let next = document.querySelector(`.rolling-${idx} .next`);
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document
      .querySelector(`.rolling-${idx} ul li:first-child`)
      .classList.add("next");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function firstRolling() {
  return window.setInterval(() => rollingCallback("first"), ROLLING_TIME);
}

function secondRolling() {
  return window.setInterval(() => rollingCallback("second"), ROLLING_TIME);
}

/***** 롤링 배너 호버시 멈추기 & 재시작 *****/
function initRolling() {
  let interval1 = firstRolling();
  let interval2;
  let time_out = setTimeout(
    () => (interval2 = secondRolling()),
    SECOND_BANNER_DELAY
  );

  const banners = document.querySelectorAll(".rollingbanner");
  banners.forEach((banner) => {
    banner.addEventListener("mouseenter", () => {
      window.clearInterval(interval1);
      window.clearInterval(interval2);
      window.clearTimeout(time_out);
    });

    banner.addEventListener("mouseleave", function () {
      interval1 = firstRolling();
      time_out = setTimeout(
        () => (interval2 = secondRolling()),
        SECOND_BANNER_DELAY
      );
    });
  });
}

export { initRolling };
