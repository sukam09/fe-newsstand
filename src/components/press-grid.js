const setPressGrid = () => {
  const pressHeader = document.querySelector('.press__header');

  pressHeader.appendChild(getNavLeftElement());
  pressHeader.appendChild(getNavRightElement());
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
  $imgList.src = './assets/icons/list-view.svg';

  const $imgGrid = document.createElement('img');
  $imgGrid.classList.add('press__img');
  $imgGrid.src = './assets/icons/grid-view.svg';

  $navRight.appendChild($imgList);
  $navRight.appendChild($imgGrid);

  return $navRight;
};

const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const makeGrid = () => {
  for (let i = 0; i < 24; i++) {
    const gridItem = document.createElement('li');
    const imgSrc = isLightMode
      ? `./assets/images/light-press-logo/${idList[i]}.png`
      : `./assets/images/dark-press-logo/${idList[i]}.png`;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = function () {
      const img = document.createElement('img');
      img.classList.add(`img${i}`);
      img.src = imgSrc;
      img.style.height = '20px';
      gridItem.classList.add('press-logo__li');
      gridItem.appendChild(img);
    };

    newsWrapper.append(gridItem);
  }
};

export { setPressGrid };
