import { constants } from "../../Data/constants.js";
import { movePageRight } from "./pageButton.js";

let $progress;
let progressTimer;
let currentPercentage = 0;

const clearProgress = () => {
  currentPercentage = 0;
};

const stopProgress = () => {
  if (progressTimer) {
    clearProgress();
    clearInterval(progressTimer);
  }
};

const startProgress = () => {
  $progress = document.querySelector(".news-list__field-tab__progress");
  const increment = 100 / (constants.PROGRESS_DURATION_MS / 16); // 16ms 마다 업데이트

  progressTimer = setInterval(() => {
    currentPercentage += increment;
    if (currentPercentage >= 100) {
      movePageRight();
      clearProgress();
    }

    $progress.style.background = `linear-gradient(to right, #4362d0 ${currentPercentage}%, #7890e7 ${currentPercentage}%)`;
  }, 16); // 16ms 마다 업데이트
};

export { clearProgress, stopProgress, startProgress };
