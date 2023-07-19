import { CONSTANT, GLOBAL } from "../model/variable.js";

let first_rolling, second_rolling;

function initRollingEvent() {
  const news = [];
  news.push(document.querySelector("#first-news"), document.querySelector("#second-news"));

  startInterval(news[0]);
  window.setTimeout(() => {
    startInterval(news[1]);
  }, CONSTANT.ROLLING_DELAY_GAP);

  news.forEach((news, index) => {
    news.addEventListener("mouseover", () => {
      window.clearTimeout(index === 0 ? first_rolling : second_rolling);
    });
    news.addEventListener("mouseout", () => {
      startInterval(news);
    });
  });
}

function startInterval(parentNode) {
  const tempValue = window.setTimeout(() => {
    rollingCallback(parentNode);
    startInterval(parentNode);
  }, CONSTANT.ROLLING_TIME);

  if (parentNode.id === "first-news") {
    first_rolling = tempValue;
  } else {
    second_rolling = tempValue;
  }
}

function rollingCallback(parentNode) {
  let prev, current, next;

  prev = parentNode.querySelector(".prev-news");
  prev.classList.remove("prev-news");

  current = parentNode.querySelector(".current-news");
  current.classList.remove("current-news");
  current.classList.add("prev-news");

  next = parentNode.querySelector(".next-news");
  if (next.nextElementSibling == null) {
    parentNode.querySelector("li").classList.add("next-news");
  } else {
    next.nextElementSibling.classList.add("next-news");
  }
  next.classList.remove("next-news");
  next.classList.add("current-news");
}

export { initRollingEvent };
