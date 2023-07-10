import { MEDIA } from './constants.js';
import media_data from '../assets/data/media_data.js';
const arrow_left = document.querySelector('#arrow_wrapper_left');
const arrow_right = document.querySelector('#arrow_wrapper_right');
let interval1;
let interval2;
let timeout;
const subscribed = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
];
let page = 0;

const logoIndex = Array.from({ length: MEDIA.TOTAL }, (_, index) => index);

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

const setLogoList = () => {
  const mediaLogo = document.querySelectorAll('.media_logo');
  const addSubButton = isSub => {
    const subElement = document.createElement('div');
    subElement.className = 'media-hover surface-alt';
    subElement.innerHTML = isSub ? '구독하기' : '해지하기';
    return subElement;
  };
  const gridIndex = Array.from(
    { length: MEDIA.PAGE_SIZE },
    (_, index) => page * MEDIA.PAGE_SIZE + index
  );
  gridIndex.forEach((media, index) => {
    const imageElement = mediaLogo[index];
    imageElement.className = `media_logo media_${logoIndex[media]}`;
    imageElement.src = `assets/images/logo/light/${
      media_data[logoIndex[media]]?.src
    }`;

    // 이미지랑 같은 노드인 구독하기 or 해지하기 제거
    imageElement.nextElementSibling?.remove();
    imageElement.parentElement.className = '';

    // 구독 여부에 따라 구독하기 or 해지하기 추가
    imageElement.insertAdjacentElement(
      'afterend',
      addSubButton(!subscribed.includes(logoIndex[media]))
    );
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

const setLiList = () => {
  const ul = document.querySelector(".grid_wrapper ul");
  for (let i = 0; i < 24; i++) {
    const liHTML = `
      <li>
          <img src="" alt="" class="media_logo">
      </li>
    `;
    ul.innerHTML += liHTML;
  }
}
const init = () => {
  setLiList();
  shuffle(logoIndex);
  setLogoList();
  setArrow();
  rollingHandler();
};
const startRollingFirst = () => {
  interval1 = window.setInterval(() => rollingCallback('first'), 5000);
}
const startRollingSecond = () => {
  interval2 = window.setInterval(() => rollingCallback('second'), 5000);
}
const rollingHandler = () => {
  startRollingFirst();
  timeout = setTimeout(startRollingSecond, 1000);
  document.querySelector('.news_title_wrapper').addEventListener('mouseenter',function(){
    window.clearInterval(interval1);
    window.clearInterval(interval2);
    window.clearTimeout(timeout);
  })
  document.querySelector('.news_title_wrapper').addEventListener('mouseleave',function(){
    startRollingFirst();
    timeout = setTimeout(startRollingSecond, 1000);
  })
}
const rollingCallback = (location) => {
  document.querySelector(`.news_title_wrapper.${location} .prev`).classList.remove('prev');
  let current = document.querySelector(`.news_title_wrapper.${location} .current`);
  current.classList.remove('current');
  current.classList.add('prev');
  let next = document.querySelector(`.news_title_wrapper.${location} .next`);
  if(next.nextElementSibling == null){
      document.querySelector(`.news_title_wrapper.${location} p:first-child`).classList.add('next');
  }else{
      next.nextElementSibling.classList.add('next');
  }
  next.classList.remove('next');
  next.classList.add('current');
}


init();
