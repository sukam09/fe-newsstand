import { startRolling, getNewsHeadline } from "./newsbar/rolling.js";
import { pressViewChange } from "./pressContent/pressViewChange.js";
import { showDate } from "./header/showTodayDate.js";
import { shuffleImgs } from "./pressContent/pressGridList.js";
import { pageReload } from "./header/pageReload.js";
import { getCategoryInfo } from "./pressContent/pressCategory.js";
import { getNewsData } from "./pressContent/pressListChange.js";
import { initPageBtn } from "./arrow.js";

// 가장 처음에 실행되는 함수
window.addEventListener("DOMContentLoaded", () => {
  pageReload();
  showDate();
  shuffleImgs();
  startRolling();
  pressViewChange();
  getNewsHeadline();
  getCategoryInfo();
  getNewsData();
  initPageBtn();
});
