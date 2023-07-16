import { PROGRESS_DURATION_MS } from "../../constants/constant.js";
import { moveToNextPage } from "./setListButton.js";

let $progress;
let progressTimer;
let currentPercentage = 0;

export const clearProgress = () => {
  currentPercentage = 0;
};

export const stopProgress = () => {
  if (progressTimer) {
    clearProgress();
    clearInterval(progressTimer);
  }
};

export const startProgress = (sortedAgencies, currentPage, currentCategory) => {
  $progress = document.querySelector(".progress-count-wrapper");
  const increment = 100 / (PROGRESS_DURATION_MS / 16);

  progressTimer = setInterval(() => {
    currentPercentage += increment;
    if (currentPercentage > 100) {
      moveToNextPage(sortedAgencies, currentPage, currentCategory);
      clearProgress();
    }
    $progress.style.background = `linear-gradient(to right, #4362d0 ${currentPercentage}%, #7890e7 ${currentPercentage}%)`;
  }, 16);
};
