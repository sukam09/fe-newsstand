import { getShuffleList } from '../utils/shuffle.js';

let pageNum = 0; //

/**
 * 언론사 그리드의 INIT
 */
const initPressGrid = (pressData) => {
  console.log(pressData);

  const shufflePress = getShuffleList(pressData.length);
};

/**
 * 언론사 불러오기
 */
const setTotalPressGrid = (isLightMode) => {
  fetch('./assets/data/total-press.json')
    .then((response) => response.json())
    .then((data) => {
      let shufflePress = getShuffleList(data.length);
      getPressLogoElement(data, shufflePress, isLightMode);
      makePressGrid(data, shufflePress, isLightMode);
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
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
  const arrowsWrapper = document.querySelector('.arrows__wrapper-grid');

  const $ul = document.createElement('ul');
  $ul.classList.add('press-logo__wrapper');

  const $imgLeft = document.createElement('img');
  $imgLeft.classList.add('arrows__img-left');
  $imgLeft.classList.add('none');
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
    leftArrow.classList.add('none');
  }
  if (pageNum > 0 && pageNum < 3) {
    leftArrow.classList.remove('none');
    rightArrow.classList.remove('none');
  }
  if (pageNum === 3) {
    rightArrow.classList.add('none');
  }
};

export { setTotalPressGrid, initPressGrid };
