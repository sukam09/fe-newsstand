import { setTotalPressGrid } from './press-grid.js';
import { setTotalPressList } from './press-list.js';

const initPressHeader = () => {
  setNav(getNavLeft());
  setNav(getNavRight());
  setNavImg();

  setTotalPressList(); //
  setTotalPressGrid(); //
};

const setNav = (pressElement) => {
  const pressHeader = document.querySelector('.press__header');
  pressHeader.insertAdjacentHTML('beforeend', pressElement);
};

const getNavLeft = () => {
  return `
    <nav class='press__nav-left'>
      <h2 class='press__h2-entire'>전체 언론사</h2>
      <h2 class='press__h2-subscribe'>내가 구독한 언론사</h2>
    </nav>
  `;
};

const getNavRight = () => {
  return `
    <nav class='press__nav-right'>
      <img class='press__img-list' src='./assets/icons/list-hide.svg' />
      <img class='press__img-grid' src='./assets/icons/grid-view.svg' />
    </nav>
  `;
};

const setNavImg = () => {
  const imgList = document.querySelector('.press__img-list');
  const imgGrid = document.querySelector('.press__img-grid');
  const gridWrapper = document.querySelector('.arrows__wrapper-grid');
  const listWrapper = document.querySelector('.arrows__wrapper-list');

  setNavList(imgList, imgGrid, gridWrapper, listWrapper);
  setNavGrid(imgList, imgGrid, gridWrapper, listWrapper);
};

const setNavList = (imgList, imgGrid, gridWrapper, listWrapper) => {
  imgList.addEventListener('click', () => {
    imgList.src = './assets/icons/list-view.svg';
    imgGrid.src = './assets/icons/grid-hide.svg';
    gridWrapper.classList.add('none');
    listWrapper.classList.remove('none');
  });
};

const setNavGrid = (imgList, imgGrid, gridWrapper, listWrapper) => {
  imgGrid.addEventListener('click', () => {
    imgGrid.src = './assets/icons/grid-view.svg';
    imgList.src = './assets/icons/list-hide.svg';
    listWrapper.classList.add('none');
    gridWrapper.classList.remove('none');
  });
};

export { initPressHeader };
