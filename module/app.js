import { initDate } from "./util.js";
import { printGrid, moveGrid } from "./grid.js";
import { initRollingNews, rollingCallback } from "./rolling.js";

const LEFT = 0;
const RIGHT = 1;
const NEWS_BAR_DELAY_TIME = 5000;
const NEWS_BAR_DELAY_DIFF = 1000;

const right_btn = document.querySelector(".right-btn");
const left_btn = document.querySelector(".left-btn");
const first_news = document.querySelector("#first-news");
const second_news = document.querySelector("#second-news");

let first_interval, second_interval;

function init() {
  initDate();
  initRollingNews();
  printGrid();

  right_btn.addEventListener("click", () => moveGrid(RIGHT));
  left_btn.addEventListener("click", () => moveGrid(LEFT));

  first_interval = window.setInterval(() => rollingCallback(LEFT), NEWS_BAR_DELAY_TIME);
  window.setTimeout(() => (second_interval = window.setInterval(() => rollingCallback(RIGHT), NEWS_BAR_DELAY_TIME)), NEWS_BAR_DELAY_DIFF);

  first_news.addEventListener("mouseover", () => {
    window.clearInterval(first_interval);
  });
  first_news.addEventListener("mouseout", () => {
    first_interval = window.setInterval(() => rollingCallback(LEFT), NEWS_BAR_DELAY_TIME);
  });
  second_news.addEventListener("mouseover", () => {
    window.clearInterval(second_interval);
  });
  second_news.addEventListener("mouseout", () => {
    second_interval = window.setInterval(() => rollingCallback(RIGHT), NEWS_BAR_DELAY_TIME);
  });
}

init();

export { right_btn, left_btn };
