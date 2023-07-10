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

document.addEventListener("DOMContentLoaded", () => {
  leftAutoRollingInterval = setInterval(
    () => rollingCallback("recent-left"),
    5000
  );
});

document.addEventListener("DOMContentLoaded", () =>
  setTimeout(() => {
    rightAutoRollingInterval = setInterval(
      () => rollingCallback("recent-right"),
      5000
    );
  }, 1000)
);

const recent_left = document.querySelector("#recent-left");
const recent_right = document.querySelector("#recent-right");

recent_left.addEventListener("mouseover", () => {
  clearInterval(leftAutoRollingInterval);
  recent_left.querySelector(".current").style.textDecoration = "underline";
});

recent_left.addEventListener("mouseout", () => {
  leftAutoRollingInterval = setInterval(
    () => rollingCallback("recent-left"),
    5000
  );
  recent_left.querySelector(".current").style.textDecoration = "none";
});

recent_right.addEventListener("mouseover", () => {
  clearInterval(rightAutoRollingInterval);
  recent_right.querySelector(".current").style.textDecoration = "underline";
});

recent_right.addEventListener("mouseout", () => {
  rightAutoRollingInterval = setInterval(
    () => rollingCallback("recent-right"),
    5000
  );
  recent_right.querySelector(".current").style.textDecoration = "none";
});
