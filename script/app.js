import { startRolling, getNewsHeadline } from './newsbar/rolling.js';
import { pressViewChange } from './pressContent/pressViewChange.js';
import { showDate } from './header/showTodayDate.js';
import { shuffleImgs, changePressGrid } from './pressContent/pressGridList.js';

// 가장 처음에 실행되는 함수 
window.addEventListener('DOMContentLoaded', () => {
  showDate();
  shuffleImgs();
  startRolling();
  pressViewChange();
  getNewsHeadline();
  changePressGrid();
});
