//롤링 뉴스바

const SET_INTERVAL_TIME = 5000;
const SET_TIMEOUT_TIME = 1000;
const LEFT = 0;
const RIGHT = 1;
let leftInterval, rightInterval;

function addEventToRolling() {
  const newsList = document.querySelectorAll(".auto-rolling-news ul li");
  newsList.forEach((news) => {
    // 왼쪽, 오른쪽 뉴스 롤링 바 구분
    if (news.parentElement.id === "left-rolling") {
      news.addEventListener("mouseover", () => {
        clearInterval(leftInterval);
      });
      news.addEventListener("mouseout", () => {
        leftInterval = setInterval(
          () => rollingNewsBar(LEFT),
          SET_INTERVAL_TIME
        );
      });
    } else {
      news.addEventListener("mouseover", () => {
        clearInterval(rightInterval);
      });
      news.addEventListener("mouseout", () => {
        rightInterval = setInterval(
          () => rollingNewsBar(RIGHT),
          SET_INTERVAL_TIME
        );
      });
    }
  });
}

function rollingNewsBar(side) {
  document.querySelectorAll(".prev")[side].classList.remove("prev");

  const current = document.querySelectorAll(".current")[side];
  current.classList.remove("current");
  current.classList.add("prev");

  const next = document.querySelectorAll(".next")[side];
  //마지막 요소 check
  if (next.nextElementSibling === null) {
    document
      .querySelectorAll(".auto-rolling-news ul li:first-child")
      [side].classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function initRolling() {
  addEventToRolling();
  leftInterval = setInterval(() => rollingNewsBar(LEFT), SET_INTERVAL_TIME);
  setTimeout(() => {
    rightInterval = setInterval(() => rollingNewsBar(RIGHT), SET_INTERVAL_TIME);
  }, SET_TIMEOUT_TIME);
}
export { initRolling };
