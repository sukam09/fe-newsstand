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
    setNavImg();

    initLightDarkMode(); //
    setTotalPressList(); // 수정중
    // setTotalPressGrid(); // 수정중
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
      <h2 class=${HEADER_CLASS.H2_ENTIRE}>${TITLE.ENTIRE}</h2>
      <h2 class=${HEADER_CLASS.H2_SUBSCRIBE}>${TITLE.SUBSCRIBE}</h2>
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
const setNavImg = () => {
  const imgList = document.querySelector(`.${HEADER_CLASS.IMG_LIST}`);
  const imgGrid = document.querySelector(`.${HEADER_CLASS.IMG_GRID}`);
  const gridWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_GRID}`);
  const listWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER_LIST}`);

  setNavList(imgList, imgGrid, gridWrapper, listWrapper);
  setNavGrid(imgList, imgGrid, gridWrapper, listWrapper);
};

const setNavList = (imgList, imgGrid, gridWrapper, listWrapper) => {
  imgList.addEventListener('click', () => {
    imgList.src = PATH.LIST_ICON;
    imgGrid.src = PATH.HIDE_GRID_ICON;
    gridWrapper.classList.add(STYLE.NONE);
    listWrapper.classList.remove(STYLE.NONE);
  });
};

const setNavGrid = (imgList, imgGrid, gridWrapper, listWrapper) => {
  imgGrid.addEventListener('click', () => {
    imgGrid.src = PATH.GRID_ICON;
    imgList.src = PATH.HIDE_LIST_ICON;
    listWrapper.classList.add(STYLE.NONE);
    gridWrapper.classList.remove(STYLE.NONE);
  });
};

export { initPressHeader };
