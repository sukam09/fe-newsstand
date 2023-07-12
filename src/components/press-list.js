let pageNum = 0;

/**
 * 언론사 불러오기
 */
const setTotalPressList = (isLightMode) => {
  fetch('./assets/data/total-press.json')
    .then((response) => response.json())
    .then((data) => {
      let shufflePress = setPressList(data);
      getPressLogoElement(data, shufflePress, isLightMode);
      //   makePressGrid(data, shufflePress, isLightMode);
    })
    .catch((error) => {
      console.error('언론사 정보를 불러오는 중에 오류가 발생했습니다.', error);
    });
};

const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

const getPressLogoElement = (pressData, shufflePress, isLightMode) => {
  const arrowsWrapper = document.querySelector('.arrows__wrapper-list');

  /* nav */
  const $nav = document.createElement('nav');
  $nav.classList.add('press-category__nav');

  const $ul = document.createElement('ul');
  $ul.classList.add('press-category__ul');

  /* article */
  const $article = document.createElement('article');
  $article.classList.add('press-category__article');

  /* article-main */

  const $articleNav = document.createElement('nav');
  $articleNav.classList.add('press-category__article-nav');

  const $articleMain = document.createElement('');
  $articleNav.classList.add('press-category__article-nav');

  /* article-sub */

  //   const $imgLeft = document.createElement('img');
  //   $imgLeft.classList.add('arrows__img-left');
  //   $imgLeft.classList.add('hidden');
  //   $imgLeft.src = './assets/icons/chevron-left.svg';
  //   $imgLeft.addEventListener('click', () => {
  //     pageNum -= 1;
  //     changePressLogo(pressData, shufflePress, isLightMode);
  //     setArrowVisible();
  //   });

  //   const $imgRight = document.createElement('img');
  //   $imgRight.classList.add('arrows__img-right');
  //   $imgRight.src = './assets/icons/chevron-right.svg';
  //   $imgRight.addEventListener('click', () => {
  //     pageNum += 1;
  //     changePressLogo(pressData, shufflePress, isLightMode);
  //     setArrowVisible();
  //   });

  //   arrowsWrapper.appendChild($ul);
  //   arrowsWrapper.appendChild($imgLeft);
  //   arrowsWrapper.appendChild($imgRight);
};

export { setTotalPressList };
