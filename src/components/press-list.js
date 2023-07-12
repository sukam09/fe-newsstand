let pageNum = 0;

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

const getPressLogoElement = (pressData, shufflePress, isLightMode) => {
  const arrowsWrapper = document.querySelector('.arrows__wrapper-grid');

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
