import { getShuffle } from '../../../utils/shuffle.js';
import { LIST } from '../../../constants/press-data.js';
import { getSnackBar, getAlert } from '../../../utils/popup.js';

/**
 * 언론사 리스트의 INIT
 */
const initPressList = (pressData, categoryList) => {
  setListButtonClick(pressData, categoryList); //
};

/**
 * 언론사 리스트의 구독하기
 */
const setListButtonClick = (pressData, categoryList) => {
  const button = document.querySelector('.section-main__button');
  button.addEventListener('click', () => {
    const pressId = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1][LIST.PAGE_COUNT - 1].id;
    const pressName = LIST.SUFFLE_CATEGORY[LIST.CATEGORY_COUNT - 1][LIST.PAGE_COUNT - 1].name;
    const isSubscribe = LIST.SUBSCRIBE_ID.includes(pressId);

    if (isSubscribe) {
      LIST.SUBSCRIBE_ID = LIST.SUBSCRIBE_ID.filter((id) => id !== pressId);
      LIST.SUBSCRIBE_NAME = LIST.SUBSCRIBE_NAME.filter((name) => name !== pressName);
    }
    if (!isSubscribe) {
      LIST.SUBSCRIBE_ID.push(pressId);
      LIST.SUBSCRIBE_NAME.push(pressName);
    }

    setSubscribe(pressData, categoryList, pressName, isSubscribe);
  });
};

const setSubscribe = (pressData, pressIds, pressName, isSubscribe) => {
  if (isSubscribe) getAlert(pressData, pressIds, pressName);
  if (!isSubscribe) getSnackBar(pressData);
};

const setListButtonChange = (isSubscribe) => {
  const button = document.querySelector('.section-main__button');
  const buttonImg = button.querySelector(`.section-main__img-button`);
  const buttonP = button.querySelector(`.section-main__p-button`);

  const newButtonSrc = isSubscribe ? buttonImg.src.replace('plus', 'closed') : buttonImg.src.replace('closed', 'plus');
  const newButtonP = isSubscribe ? '' : '구독하기';

  if (isSubscribe) button.classList.add('section-main__button-closed');
  buttonImg.src = newButtonSrc;
  buttonP.innerText = newButtonP;
};

const setSubscribeArrow = (isSubscribe) => {
  const categoryDiv = document.querySelector('.press-category__div');
  const categoryArrow = `
    <img class="press-category__div-img" src='./assets/icons/arrow.svg'></img>
    `;

  const catogoryCount = `
    <div class='press-category__div-now'>1</div>
    <div class='press-category__div-divide'>/</div>
    <div class='press-category__div-sum'></div>`;

  isSubscribe ? (categoryDiv.innerHTML = categoryArrow) : (categoryDiv.innerHTML = catogoryCount);
};

export { initPressList };
