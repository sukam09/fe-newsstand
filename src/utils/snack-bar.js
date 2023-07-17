import { HEADER_CLASS, PATH, TITLE, STYLE } from '../constants/press-header.js';
import { subscribeEvent } from '../components/press-header.js';

const getSnackBar = (pressData) => {
  const snackBar = document.querySelector('.snack-bar');
  snackBar.innerText = '내가 구독한 언론사에 추가되었습니다.';
  snackBar.classList.remove('hidden');

  setTimeout(() => {
    snackBar.classList.add('hidden');
    const h2Entire = document.querySelector(`.${HEADER_CLASS.H2_ENTIRE}`);
    const h2Subscribe = document.querySelector(`.${HEADER_CLASS.H2_SUBSCRIBE}`);
    const imgList = document.querySelector(`.${HEADER_CLASS.IMG_LIST}`);
    const imgGrid = document.querySelector(`.${HEADER_CLASS.IMG_GRID}`);
    const gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
    const listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);

    subscribeEvent(pressData, h2Entire, h2Subscribe, imgList, imgGrid, gridWrapper, listWrapper);
  }, 5000);
};

export { getSnackBar };
