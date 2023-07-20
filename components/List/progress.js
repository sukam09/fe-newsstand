import { PROGRESS_DURATION_MS } from "../../constants/constant.js";
import { moveToNextPage } from "./setListButton.js";

let $progress;
let progress_timer;
let current_percentage = 0;

export const clearProgress = () => {
  current_percentage = 0;
};

export const stopProgress = () => {
  if (progress_timer) {
    clearProgress();
    clearInterval(progress_timer);
  }
};

export const startProgress = (
  sorted_agencies,
  current_page,
  current_category
) => {
  $progress = document.querySelector(".progress-count-wrapper");
  const increment = 100 / (PROGRESS_DURATION_MS / 16);

  progress_timer = setInterval(() => {
    current_percentage += increment;
    if (current_percentage > 100) {
      moveToNextPage(sorted_agencies, current_page, current_category);
      clearProgress();
    }
    $progress.style.background = `linear-gradient(to right, #4362d0 ${current_percentage}%, #7890e7 ${current_percentage}%)`;
  }, 16);
};
