let pageNum = 0;

const setPressGrid = (isLightMode) => {
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
  $imgList.src = './assets/icons/list-view.svg';

  const $imgGrid = document.createElement('img');
  $imgGrid.classList.add('press__img');
  $imgGrid.src = './assets/icons/grid-view.svg';

  $navRight.appendChild($imgList);
  $navRight.appendChild($imgGrid);

  return $navRight;
};

/**
 * 언론사 불러오기
 */
const setTotalPress = (isLightMode) => {
  fetch('./assets/data/total-press.json')
    .then((response) => response.json())
    .then((data) => {
      let shufflePress = setPressList(data);
      getPressLogoElement(data, shufflePress, isLightMode);
      makePressGrid(data, shufflePress, isLightMode);
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const setPressList = (pressData) => {
  let shufflePress = Array.from({ length: pressData.length }, (_, idx) => idx + 1);
  shuffleList(shufflePress);

  return shufflePress;
};

const makePressGrid = (pressData, shufflePress, isLightMode) => {
  const pressLogoWrapper = document.querySelector('.press-logo__wrapper');

  let shufflePressNum = shufflePress.slice(pageNum * 24, pageNum * 24 + 24);
  shufflePressNum.forEach((pressNum, idx) => {
    const $li = document.createElement('li');
    $li.classList.add('press-logo__li');

    const selectPress = pressData.filter((data) => data.id === pressNum);
    const imgSrc = isLightMode ? selectPress[0].lightSrc : selectPress[0].darkSrc;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => {
      const $img = document.createElement('img');
      $img.classList.add(`img${idx}`);
      $img.src = imgSrc;
      $li.appendChild($img);
      pressLogoWrapper.append($li);
    };
  });
};

/**
 * 그리드 화살표
 */
const getPressLogoElement = (pressData, shufflePress, isLightMode) => {
  const arrowsWrapper = document.querySelector('.arrows__wrapper');

  const $ul = document.createElement('ul');
  $ul.classList.add('press-logo__wrapper');

  const $imgLeft = document.createElement('img');
  $imgLeft.classList.add('arrows__img-left');
  $imgLeft.classList.add('hidden');
  $imgLeft.src = './assets/icons/chevron-left.svg';
  $imgLeft.addEventListener('click', () => {
    pageNum -= 1;
    changePressLogo(pressData, shufflePress, isLightMode);
    setArrowVisible();
  });

  const $imgRight = document.createElement('img');
  $imgRight.classList.add('arrows__img-right');
  $imgRight.src = './assets/icons/chevron-right.svg';
  $imgRight.addEventListener('click', () => {
    pageNum += 1;
    changePressLogo(pressData, shufflePress, isLightMode);
    setArrowVisible();
  });

  arrowsWrapper.appendChild($ul);
  arrowsWrapper.appendChild($imgLeft);
  arrowsWrapper.appendChild($imgRight);
};

const changePressLogo = (pressData, shufflePress, isLightMode) => {
  let shufflePressNum = shufflePress.slice(pageNum * 24, pageNum * 24 + 24);
  shufflePressNum.forEach((pressNum, idx) => {
    const $img = document.querySelector(`.img${idx}`);

    const selectPress = pressData.filter((data) => data.id === pressNum);
    const imgSrc = isLightMode ? selectPress[0].lightSrc : selectPress[0].darkSrc;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = () => ($img.src = imgSrc);
    checkImg.onerror = () => $img.remove();
  });
};

const setArrowVisible = () => {
  const leftArrow = document.querySelector('.arrows__img-left');
  const rightArrow = document.querySelector('.arrows__img-right');

  if (pageNum === 0) {
    leftArrow.classList.add('hidden');
  }
  if (pageNum > 0 && pageNum < 3) {
    leftArrow.classList.remove('hidden');
    rightArrow.classList.remove('hidden');
  }
  if (pageNum === 3) {
    rightArrow.classList.add('hidden');
  }
};

export { setPressGrid };
