/***** 뉴스 배너 롤링 *****/
const ROLLING_TIME = 5000;

function rollingCallback(idx) {
  //.prev 클래스 삭제
  document.querySelector(`.rolling-${idx} .prev`).classList.remove("prev");

  //.current -> .prev
  let current = document.querySelector(`.rolling-${idx} .current`);
  current.classList.remove("current");
  current.classList.add("prev");

  //.next -> .current
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
//첫번째 배너
function initFirstRolling() {
  let interval1 = firstRolling();

  const banner = document.querySelector(".rollingbanner");
  banner.addEventListener("mouseenter", () => {
    window.clearInterval(interval1);
  });

  banner.addEventListener("mouseleave", function () {
    interval1 = firstRolling();
  });
}

//두번째 배너
function initSecondRolling() {
  let interval2;
  let time_out = setTimeout(() => (interval2 = secondRolling()), 1000);

  const banner = document.querySelectorAll(".rollingbanner")[1];
  banner.addEventListener("mouseenter", () => {
    window.clearInterval(interval2);
    window.clearTimeout(time_out);
  });

  banner.addEventListener("mouseleave", function () {
    secondRolling();
  });
}

export { initFirstRolling, initSecondRolling };
