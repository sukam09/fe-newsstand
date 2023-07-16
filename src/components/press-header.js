import { HEADER_CLASS, PATH, TITLE, STYLE } from '../constants/press-header.js';
import { getFetchData } from '../utils/fetch.js';
import { initLightDarkMode } from '../components/light-dark-mode.js';
import { initPressGrid } from './press-grid.js';
import { setTotalPressList } from './press-list.js';

/**
 * 언론사의 INIT
 * 언론사 데이터를 받아와서 GRID, LIST에게 전달 📁
 */
const initPressHeader = async () => {
  try {
    const fetchData = await getFetchData('./assets/data/press-news.json');
    const categoryData = fetchData.category;
    let pressData = fetchData.press;

    setNav(getNavLeft());
    setNav(getNavRight());
    setNavRight();
    setNavLeft();

    initLightDarkMode();
    setTotalPressList(); // 수정해야 함
    initPressGrid(pressData);
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
const setNavLeft = () => {
  const h2Entire = document.querySelector(`.${HEADER_CLASS.H2_ENTIRE}`);
  const h2Subscribe = document.querySelector(`.${HEADER_CLASS.H2_SUBSCRIBE}`);
  const entireWrapper = document.querySelector('.press__wrapper-grid__entire');
  const subscribeWrapper = document.querySelector('.press__wrapper-grid__subscribe');

  h2Entire.addEventListener('click', () => {
    toggleNavLeft(true, h2Entire, h2Subscribe, entireWrapper, subscribeWrapper);
  });
  h2Subscribe.addEventListener('click', () => {
    toggleNavLeft(false, h2Entire, h2Subscribe, entireWrapper, subscribeWrapper);
  });
};

const toggleNavLeft = (isSelected, h2Entire, h2Subscribe, entireWrapper, subscribeWrapper) => {
  h2Entire.classList.toggle('press__h2-select', isSelected);
  h2Entire.classList.toggle('press__h2-unselect', !isSelected);
  h2Subscribe.classList.toggle('press__h2-select', !isSelected);
  h2Subscribe.classList.toggle('press__h2-unselect', isSelected);
  entireWrapper.classList.toggle('none', !isSelected);
  subscribeWrapper.classList.toggle('none', isSelected);
};

const setNavRight = () => {
  const imgList = document.querySelector(`.${HEADER_CLASS.IMG_LIST}`);
  const imgGrid = document.querySelector(`.${HEADER_CLASS.IMG_GRID}`);
  const gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
  const listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);

  imgList.addEventListener('click', () => {
    toggleNavRight(true, imgList, imgGrid, gridWrapper, listWrapper);
  });

  imgGrid.addEventListener('click', () => {
    toggleNavRight(false, imgList, imgGrid, gridWrapper, listWrapper);
  });
};

const toggleNavRight = (isSelected, imgList, imgGrid, gridWrapper, listWrapper) => {
  imgList.src = isSelected ? PATH.LIST_ICON : PATH.HIDE_LIST_ICON;
  imgGrid.src = isSelected ? PATH.HIDE_GRID_ICON : PATH.GRID_ICON;
  listWrapper.classList.toggle(STYLE.NONE, !isSelected);
  gridWrapper.classList.toggle(STYLE.NONE, isSelected);
};

export { initPressHeader };
