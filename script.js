const mediaLogo = document.querySelectorAll('.media_logo');
const arrow_left = document.querySelector('.arrow_wrapper_left');
const arrow_right = document.querySelector('.arrow_wrapper_right');
const subscribed = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
];
let page = 0;

const logoIndex = Array.from({ length: 96 }, (_, index) => index + 1);

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

const setLogoList = () => {
  const gridIndex = Array.from({ length: 24 }, (_, index) => page * 24 + index);
  gridIndex.forEach((media, index) => {
    mediaLogo[index].src = `assets/images/logo/light/${logoIndex[media]}.png`;
    mediaLogo[index].classList.add(`media_${logoIndex[media]}`);
    mediaLogo[index].className = `media_logo media_${logoIndex[media]}`;
  });
};

const setPage = index => {
  page += index;
  setLogoList();
  setArrowVisible();
};

const setArrowVisible = () => {
  if (page == 0) {
    arrow_left.classList.add('display-none');
    arrow_right.classList.remove('display-none');
  } else if (page == 3) {
    arrow_left.classList.remove('display-none');
    arrow_right.classList.add('display-none');
  } else {
    arrow_left.classList.remove('display-none');
    arrow_right.classList.remove('display-none');
  }
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
  setArrowVisible();
};

init();
