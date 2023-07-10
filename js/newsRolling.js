const ROLLING_TIME = 5000;
const ROLLING_LATENCY = 1000;

function rollingCallback(index) {
  //.prev 클래스 삭제
  console.log(document.querySelector(`.rolling-${index} .prev`));
  document.querySelector(`.rolling-${index} .prev`).classList.remove("prev");

  //.current -> .prev
  let current = document.querySelector(`.rolling-${index} .current`);
  current.classList.remove("current");
  current.classList.add("prev");

  //.next -> .current
  let next = document.querySelector(`.rolling-${index} .next`);
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document.querySelector(`.rolling-${index} ul li:first-child`).classList.add("next");
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

function initRolling() {
  let interval1 = firstRolling();
  let interval2;
  let t_out = setTimeout(() => (interval2 = secondRolling()), ROLLING_LATENCY);

  const rollings = document.querySelectorAll(".rollingbanner");
  for (const rolling of rollings) {
    rolling.addEventListener("mouseenter", function () {
      window.clearInterval(interval1);
      window.clearInterval(interval2);
      window.clearTimeout(t_out);
    });

    rolling.addEventListener("mouseleave", function () {
      interval1 = firstRolling();
      t_out = setTimeout(() => (interval2 = secondRolling()), ROLLING_LATENCY);
    });
  }
}

export { initRolling };
