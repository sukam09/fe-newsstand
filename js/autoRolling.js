const RECENT_CNT = 5;
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

window.addEventListener("focus", function () {
  leftAutoRollingInterval = setInterval(
    () => rollingCallback("recent-left"),
    5000
  );
  setTimeout(() => {
    rightAutoRollingInterval = setInterval(
      () => rollingCallback("recent-right"),
      5000
    );
  }, 1000);
});

window.addEventListener("blur", function () {
  clearInterval(leftAutoRollingInterval);
  clearInterval(rightAutoRollingInterval);
});

const recent_left = document.querySelector("#recent-left");
const recent_right = document.querySelector("#recent-right");

recent_left.addEventListener("mouseover", () => {
  clearInterval(leftAutoRollingInterval);
});

recent_left.addEventListener("mouseout", () => {
  leftAutoRollingInterval = setInterval(
    () => rollingCallback("recent-left"),
    5000
  );
});

recent_right.addEventListener("mouseover", () => {
  clearInterval(rightAutoRollingInterval);
});

recent_right.addEventListener("mouseout", () => {
  rightAutoRollingInterval = setInterval(
    () => rollingCallback("recent-right"),
    5000
  );
});
