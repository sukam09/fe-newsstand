import { HEADER_CLASS } from '../constants/press-header.js';
import { STATE, LIST } from '../constants/press-data.js';
import { subscribeEvent } from '../components/press-header.js';
import { initPressGrid } from '../components/press-grid.js';
import { initPressList } from '../components/press-list.js';

const getSnackBar = (pressData) => {
  const snackBar = document.querySelector('.snack-bar');
  snackBar.innerText = '내가 구독한 언론사에 추가되었습니다.';
  snackBar.classList.add('show');
  snackBar.classList.remove('hidden');

  setTimeout(() => {
    snackBar.classList.add('hidden');
    snackBar.classList.remove('show');
    const h2Entire = document.querySelector(`.${HEADER_CLASS.H2_ENTIRE}`);
    const h2Subscribe = document.querySelector(`.${HEADER_CLASS.H2_SUBSCRIBE}`);
    const imgList = document.querySelector(`.${HEADER_CLASS.IMG_LIST}`);
    const imgGrid = document.querySelector(`.${HEADER_CLASS.IMG_GRID}`);
    const gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
    const listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);

    subscribeEvent(pressData, h2Entire, h2Subscribe, imgList, imgGrid, gridWrapper, listWrapper);
  }, 5000);
};

const getAlert = (pressData, pressIds, pressName) => {
  setAlert();
  setAlertEvent(pressData, pressIds, pressName);
};

const setAlertEvent = (pressData, pressIds, pressName) => {
  const alert = document.querySelector('.alert');
  const alertPress = alert.querySelector('.alert-name');
  const alertYes = alert.querySelector('.alert-yes');
  const alertNo = alert.querySelector('.alert-no');
  alert.classList.remove('hidden');
  alert.classList.add('show');

  alertPress.innerText = pressName;

  alertYes.addEventListener('click', () => {
    STATE.IS_UNSUBSCRIBE = true;
    alert.classList.remove('show');
    alert.classList.add('hidden');
    if (pressIds.length < 96) {
      initPressGrid(pressData, LIST.SUBSCRIBE_ID);
      initPressList(pressData, LIST.SUBSCRIBE_NAME);
    }
    if (pressIds.length >= 96) {
      initPressGrid(pressData, LIST.SUFFLE);
      initPressList(pressData, LIST.SUFFLE_CATEGORY);
    }
  });
  alertNo.addEventListener('click', () => {
    STATE.IS_UNSUBSCRIBE = false;
    alert.classList.remove('show');
    alert.classList.add('hidden');
  });
};

const setAlert = () => {
  const alert = document.querySelector('.alert');
  const alertElement = `
    <article class="alert-info">
      <div class="alert-press">
        <h4 class="alert-name">뉴스토마토</h4>
        <p class="alert-into">을(를)</p>
      </div>
      <p class="alert-unsubscribe">구독해지하시겠습니까?</p>
    </article>

    <div class="alert-yes-no">
      <p class="alert-yes">예, 해지합니다.</p>
      <p class="alert-no">아니오</p>
    </div>
  `;
  alert.innerHTML = alertElement;
};

export { getSnackBar, getAlert };
