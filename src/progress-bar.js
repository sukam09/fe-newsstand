import { fillNewsList } from "./list.js";
import { listPagesStore } from "./store.js";

let timeElapsed = 0;
let interval;
const listCurrentPages = listPagesStore.getInstance();

const updateProgress = () => {
  const $progress = document.querySelector(".progress");
  $progress.style.width = timeElapsed + "%";
};

export const startProgress = () => {
  interval = setInterval(() => {
    timeElapsed += 5;
    updateProgress();

    if (timeElapsed === 100) {
      timeElapsed = 0;

      listCurrentPages.setPages(1);
      fillNewsList("종합/경제", listCurrentPages.getPages());
      updateListPage();
      updateProgress();
    }
  }, 1000);
};

export const updateListPage = () => {
  const $stateElem = document.querySelector(".progress-component > div > span");

  $stateElem.innerHTML = listCurrentPages.getPages();
};

export const stopProgress = () => {
  clearInterval(interval);
  timeElapsed = 0;
  updateProgress();
};

export const createProgressInner = (title, state, max) => {
  const $progressInner = ` <div class="progress"></div>
  <div class="progress-component">
    <span class="display-bold14">${title}</span>
    <div class="display-bold12">
      <span>${state}</span>
      <span>/${max}</span>
    </div>
  </div>`;

  return $progressInner;
};
