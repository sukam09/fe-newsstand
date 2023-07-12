import { setTotalPress } from './press-grid.js';

const setPressHeader = (isLightMode) => {
  const pressHeader = document.querySelector('.press__header');

  pressHeader.appendChild(getNavLeftElement());
  pressHeader.appendChild(getNavRightElement());

  setTotalPress(isLightMode);
};

const getNavLeftElement = () => {
  const $navLeft = document.createElement('nav');
  $navLeft.classList.add('press__nav-left');

  const $h2Select = document.createElement('h2');
  $h2Select.classList.add('press__h2-select');
  $h2Select.innerText = '전체 언론사';

  const $h2UnSelect = document.createElement('h2');
  $h2UnSelect.classList.add('press__h2-unselect');
  $h2UnSelect.innerText = '내가 구독한 언론사';

  $navLeft.appendChild($h2Select);
  $navLeft.appendChild($h2UnSelect);

  return $navLeft;
};

const getNavRightElement = () => {
  const $navRight = document.createElement('nav');
  $navRight.classList.add('press__nav-right');

  const $imgList = document.createElement('img');
  $imgList.classList.add('press__img');
  $imgList.src = './assets/icons/list-hide.svg';

  const $imgGrid = document.createElement('img');
  $imgGrid.classList.add('press__img');
  $imgGrid.src = './assets/icons/grid-view.svg';

  $imgList.addEventListener('click', () => {
    $imgList.src = './assets/icons/list-view.svg';
    $imgGrid.src = './assets/icons/grid-hide.svg';

    const pressWrapper = document.querySelector('.arrows__wrapper');
    pressWrapper.classList.add('hidden');
  }); //

  $imgGrid.addEventListener('click', () => {
    $imgGrid.src = './assets/icons/grid-view.svg';
    $imgList.src = './assets/icons/list-hide.svg';

    const pressWrapper = document.querySelector('.arrows__wrapper');
    pressWrapper.classList.remove('hidden');
  }); //

  $navRight.appendChild($imgList);
  $navRight.appendChild($imgGrid);

  return $navRight;
};

export { setPressHeader };
