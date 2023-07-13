import { store } from "../store/index.js";
import { nextCategory, nextPage } from "../store/reducer.js";

const PROGRESS_DURATION_TOTAL = 1000;
const PROGRESS_DURATION_ELAPSE = 1000;

let interval;

const setTransitionDuration = ($progressBar, duration) => {
  $progressBar.style.transitionDuration = `${duration}ms`;
};

const setWidth = ($progressBar, width) => {
  $progressBar.style.width = `${width}%`;
};

const initProgress = ($progressBar) => {
  setTransitionDuration($progressBar, 0);
  setWidth($progressBar, 0);
};

export const stopProgressing = () => {
  clearInterval(interval);
};

export const startProgressing = (currentPage, currentCategoryLength) => {
  const $progressBar = document.querySelector(
    ".category-selected > .tab_progress-bar"
  );

  clearInterval(interval);
  initProgress($progressBar);

  const progress = () => {
    let elapsedTime = 0;

    interval = setInterval(() => {
      elapsedTime += PROGRESS_DURATION_ELAPSE;

      setTransitionDuration($progressBar, PROGRESS_DURATION_ELAPSE);
      setWidth($progressBar, (elapsedTime / PROGRESS_DURATION_TOTAL) * 100);

      if (elapsedTime === PROGRESS_DURATION_TOTAL) {
        clearInterval(interval);
        initProgress($progressBar);

        if (currentCategoryLength - 1 === currentPage) {
          store.dispatch(nextCategory());
        } else {
          store.dispatch(nextPage());
        }
      }
    }, PROGRESS_DURATION_ELAPSE);
  };

  progress();
};
