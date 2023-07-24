import { HEADER_CLASS, PATH, TITLE, STYLE } from '../constants/press-header.js';
import { STATE, LIST } from '../constants/press-data.js';
import { getFetchData } from '../utils/fetch.js';
import { initLightDarkMode } from '../components/light-dark-mode.js';
import { initPressGrid } from './press-grid.js';
import { initPressList } from './press-list.js';

/**
 * 언론사의 INIT
 * 언론사 데이터를 받아와서 GRID, LIST에게 전달 📁
 */
const initPressHeader = async () => {
  try {
    const fetchData = await getFetchData('./assets/data/press-news.json');
    let pressData = fetchData.press;

    setNav(getNavLeft());
    setNav(getNavRight());
    setNavClick(pressData);

    initLightDarkMode();
    initPressGrid(pressData, LIST.SUFFLE_ID);
    initPressList(pressData, LIST.CATEGORY_NAME);
  } catch (error) {
    console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
  }
};

const setNav = (pressElement) => {
  const pressHeader = document.querySelector(`.${HEADER_CLASS.PRESS_HEADER}`);
  pressHeader.insertAdjacentHTML('beforeend', pressElement);
};

const getNavLeft = () => {
  return `
    <nav class=${HEADER_CLASS.NAV_LEFT}>
      <h2 class="${HEADER_CLASS.H2_ENTIRE} press__h2-select">${TITLE.ENTIRE}</h2>
      <h2 class="${HEADER_CLASS.H2_SUBSCRIBE} press__h2-unselect">${TITLE.SUBSCRIBE}</h2>
    </nav>
  `;
};

const getNavRight = () => {
  return `
    <nav class=${HEADER_CLASS.NAV_RIGHT}>
      <img class=${HEADER_CLASS.IMG_LIST} src=${PATH.HIDE_LIST_ICON} />
      <img class=${HEADER_CLASS.IMG_GRID} src=${PATH.GRID_ICON}  />
    </nav>
  `;
};

/**
 * 언론사의 헤더 설정
 */
const setNavClick = (pressData) => {
  const h2Entire = document.querySelector(`.${HEADER_CLASS.H2_ENTIRE}`);
  const h2Subscribe = document.querySelector(`.${HEADER_CLASS.H2_SUBSCRIBE}`);
  const imgList = document.querySelector(`.${HEADER_CLASS.IMG_LIST}`);
  const imgGrid = document.querySelector(`.${HEADER_CLASS.IMG_GRID}`);
  const gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
  const listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);

  h2Entire.addEventListener('click', () =>
    entireEvent(pressData, h2Entire, h2Subscribe, imgList, imgGrid, gridWrapper, listWrapper)
  );
  h2Subscribe.addEventListener('click', () =>
    subscribeEvent(pressData, h2Entire, h2Subscribe, imgList, imgGrid, gridWrapper, listWrapper)
  );
  imgList.addEventListener('click', () => listEvent(pressData, imgList, imgGrid, gridWrapper, listWrapper));
  imgGrid.addEventListener('click', () => gridEvent(pressData, imgList, imgGrid, gridWrapper, listWrapper));
};

const entireEvent = (pressData, h2Entire, h2Subscribe, imgList, imgGrid, gridWrapper, listWrapper) => {
  gridWrapper.classList.remove('none');
  listWrapper.classList.add('none');

  h2Entire.classList.add('press__h2-select');
  h2Entire.classList.remove('press__h2-unselect');
  h2Subscribe.classList.add('press__h2-unselect');
  h2Subscribe.classList.remove('press__h2-select');

  imgList.src = PATH.HIDE_LIST_ICON;
  imgGrid.src = PATH.GRID_ICON;

  STATE.IS_GRID = true;
  STATE.IS_TOTAL = true;

  initPressGrid(pressData, LIST.SUFFLE_ID);
};

const subscribeEvent = (pressData, h2Entire, h2Subscribe, imgList, imgGrid, gridWrapper, listWrapper) => {
  listWrapper.classList.remove('none');
  gridWrapper.classList.add('none');

  h2Entire.classList.add('press__h2-unselect');
  h2Entire.classList.remove('press__h2-select');
  h2Subscribe.classList.add('press__h2-select');
  h2Subscribe.classList.remove('press__h2-unselect');

  imgList.src = PATH.LIST_ICON;
  imgGrid.src = PATH.HIDE_GRID_ICON;

  STATE.IS_GRID = false;
  STATE.IS_TOTAL = false;

  initPressList(pressData, LIST.SUBSCRIBE_NAME);
};

const listEvent = (pressData, imgList, imgGrid, gridWrapper, listWrapper) => {
  if (STATE.IS_TOTAL) {
    listWrapper.classList.remove('none');
    gridWrapper.classList.add('none');

    imgList.src = PATH.LIST_ICON;
    imgGrid.src = PATH.HIDE_GRID_ICON;
    initPressList(pressData, LIST.CATEGORY_NAME);
  }
  if (!STATE.IS_TOTAL) {
    listWrapper.classList.remove('none');
    gridWrapper.classList.add('none');

    imgList.src = PATH.LIST_ICON;
    imgGrid.src = PATH.HIDE_GRID_ICON;
    initPressList(pressData, LIST.SUBSCRIBE_NAME);
  }
};

const gridEvent = (pressData, imgList, imgGrid, gridWrapper, listWrapper) => {
  if (STATE.IS_TOTAL) {
    gridWrapper.classList.remove('none');
    listWrapper.classList.add('none');

    imgList.src = PATH.HIDE_LIST_ICON;
    imgGrid.src = PATH.GRID_ICON;
    initPressGrid(pressData, LIST.SUFFLE_ID);
  }
  if (!STATE.IS_TOTAL) {
    gridWrapper.classList.remove('none');
    listWrapper.classList.add('none');

    imgList.src = PATH.HIDE_LIST_ICON;
    imgGrid.src = PATH.GRID_ICON;
    initPressGrid(pressData, LIST.SUBSCRIBE_ID);
  }
};

export { initPressHeader, subscribeEvent };
