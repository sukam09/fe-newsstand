//롤링 뉴스바

const SET_INTERVAL_TIME = 5000;
const SET_TIMEOUT_TIME = 1000;
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
        leftInterval = setInterval(rollingNewsBarLeft, SET_INTERVAL_TIME);
      });
    } else {
      news.addEventListener("mouseover", () => {
        clearInterval(rightInterval);
      });
      news.addEventListener("mouseout", () => {
        rightInterval = setInterval(rollingNewsBarRight, SET_INTERVAL_TIME);
      });
    }
  });
}

function rollingNewsBarLeft() {
  document.querySelector(".prev").classList.remove("prev");

  const current = document.querySelector(".current");
  current.classList.remove("current");
  current.classList.add("prev");

  const next = document.querySelector(".next");
  //마지막 요소 check
  if (next.nextElementSibling === null) {
    document
      .querySelector(".auto-rolling-news ul li:first-child")
      .classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function rollingNewsBarRight() {
  document.querySelectorAll(".prev")[1].classList.remove("prev");

  const current = document.querySelectorAll(".current")[1];
  current.classList.remove("current");
  current.classList.add("prev");

  const next = document.querySelectorAll(".next")[1];
  //마지막 요소 check
  if (next.nextElementSibling === null) {
    document
      .querySelectorAll(".auto-rolling-news ul li:first-child")[1]
      .classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function initRolling() {
  addEventToRolling();
  leftInterval = setInterval(rollingNewsBarLeft, SET_INTERVAL_TIME);
  setTimeout(() => {
    rightInterval = setInterval(rollingNewsBarRight, SET_INTERVAL_TIME);
  }, SET_TIMEOUT_TIME);
}
export { initRolling };
