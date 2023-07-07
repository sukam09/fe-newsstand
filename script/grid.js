import { MEDIA } from './constants.js';
const mediaLogo = document.querySelectorAll('.media_logo');
const arrow_left = document.querySelector('#arrow_wrapper_left');
const arrow_right = document.querySelector('#arrow_wrapper_right');
const subscribed = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
];
let page = 0;

const logoIndex = Array.from({ length: MEDIA.TOTAL }, (_, index) => index + 1);

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

const setLogoList = () => {
  const gridIndex = Array.from(
    { length: MEDIA.PAGE_SIZE },
    (_, index) => page * MEDIA.PAGE_SIZE + index
  );
  gridIndex.forEach((media, index) => {
    mediaLogo[index].src = `assets/images/logo/light/${logoIndex[media]}.png`;
    mediaLogo[index].className = `media_logo media_${logoIndex[media]}`;
  });
};

const setPage = index => {
  page += index;
  setLogoList();
  setArrowVisible();
};

const setArrow = () => {
  setArrowVisible();

  // 화살표 이벤트리스너
  arrow_left.addEventListener('click', () => {
    setPage(-1);
  });
  arrow_right.addEventListener('click', () => {
    setPage(1);
  });
};

const setArrowVisible = () => {
  arrow_left.className = `page_${page}`;
  arrow_right.className = `page_${page}`;
};
const setSubscribed = () => {
  subscribed.forEach(index => {
    const media = document.querySelector(`.media_${index}`);
    if (media) {
      media.parentElement.classList.add('subscribed');
      media.nextElementSibling.innerHTML = '해지하기';
    }
  });
};

const init = () => {
  shuffle(logoIndex);
  setLogoList();
  setSubscribed();
  setArrow();
};

init();
