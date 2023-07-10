import { MEDIA } from './constants.js'; // magic 넘버
/* 
  media_data = [
  { name: '한국농어촌방송', src: '0.png' },
  { name: '머니투데이', src: '1.png' },
                ...
  ]
*/
import media_data from '../assets/data/media_data.js';

const arrow_left = document.querySelector('#arrow_wrapper_left'); // media or 카테고리 이동 화살표 변수
const arrow_right = document.querySelector('#arrow_wrapper_right'); // media or 카테고리 이동 화살표 변수

let interval1; // 왼쪽 article 반복적으로 rolling하는 변수
let interval2; // 오른쪽 article 반복적으로 rolling하는 변수
let timeout; // 오른쪽 article 1초 뒤 실행 관리하는 변수

let page = 0; // 언론사 보기 페이지
const subscribed = []; // 구독된 언론사 index 추가
const logoIndex = Array.from({ length: MEDIA.TOTAL }, (_, index) => index); // 전체 언론사 index

/**
  *언론사 index shuffle하는 함수
*/
const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

/**
 * 
 * @param {boolean} isSub 
 * 구독중인지 확인하는 변수
 * @returns {HTMLDivElement}
 */
const addSubButton = isSub => {
  const subElement = document.createElement('div');
  subElement.className = 'media-hover surface-alt';
  subElement.innerHTML = isSub ? '구독하기' : '해지하기';
  return subElement;
};

/**
 * grid안에 요소 이미지+태그 추가하는 함수
 * @param {number} media 
 * @param {number} index 
 */
const updateImageElement = (media, index) => { // media : PAGE_SIZE * page + index, index : 0~MEDIA.PAGE_SIZE
  const mediaLogo = document.querySelectorAll('.media_logo');
  const imageElement = mediaLogo[index];
  imageElement.className = `media_logo media_${logoIndex[media]}`;
  imageElement.src = `assets/images/logo/light/${media_data[logoIndex[media]]?.src}`;

  // 이미지랑 같은 노드인 구독하기 or 해지하기 제거
  imageElement.nextElementSibling?.remove();
  imageElement.parentElement.className = '';

  // 구독 여부에 따라 구독하기 or 해지하기 추가
  imageElement.insertAdjacentElement(
    'afterend',
    addSubButton(!subscribed.includes(logoIndex[media]))
  );
}

/**
 * 빈 grid에 list요소 채우는 함수
 */
const setLogoList = () => {
  const gridIndex = Array(MEDIA.PAGE_SIZE).fill().map((_, index) => page * MEDIA.PAGE_SIZE + index);
  gridIndex.forEach(updateImageElement);
};

/**
 * 페이지 이동시키는 함수
 * @param {number} index 
 */
const setPage = index => {
  page += index;
  setLogoList();
  setArrowVisible();
};

/**
 * 화살표 보이게 설정하는 함수
 */
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

/**
 * 화살표 페이지에 따라 보이게 하는 함수
 */
const setArrowVisible = () => {
  arrow_left.className = `page_${page}`;
  arrow_right.className = `page_${page}`;
};

/**
 *  처음에 grid 요소 추가하는 함수
 */
const setLiList = () => {
  const ul = document.querySelector(".grid_wrapper ul");
  for (let i = 0; i < MEDIA.PAGE_SIZE; i++) {
    const liHTML = `
      <li>
          <img src="" alt="" class="media_logo">
      </li>
    `;
    ul.innerHTML += liHTML;
  }
}

/**
 * 초기 실행 함수
 */
const init = () => {
  setLiList();
  shuffle(logoIndex);
  setLogoList();
  setArrow();
  rollingHandler();
};

/**
 * 특정 위치의 롤링 시작 함수
 */
const startRolling = (location, delay) => {
  return window.setInterval(() => rollingCallback(location), delay);
}

/**
 * 전반적인 rolling 관리 함수
 */
const rollingHandler = () => {
  const newsTitleWrapper = document.querySelector('.news_title_wrapper');

  interval1 = startRolling('first', 5000);
  timeout = setTimeout(() => interval2 = startRolling('second', 5000), 1000);

  const clearAllIntervalsAndTimeouts = () => {
    window.clearInterval(interval1);
    window.clearInterval(interval2);
    window.clearTimeout(timeout);
  }

  const restartRolling = () => {
    interval1 = startRolling('first', 5000);
    timeout = setTimeout(() => interval2 = startRolling('second', 5000), 1000);
  }

  newsTitleWrapper.addEventListener('mouseenter', clearAllIntervalsAndTimeouts);
  newsTitleWrapper.addEventListener('mouseleave', restartRolling);
}


/**
 * rolling시 요소 움직이게 하는 함수
 */
const rollingCallback = (location) => {
  const newsWrapper = document.querySelector(`.news_title_wrapper.${location}`);

  const prev = newsWrapper.querySelector('.prev');
  prev.classList.remove('prev');

  const current = newsWrapper.querySelector('.current');
  current.classList.remove('current');
  current.classList.add('prev');

  const next = newsWrapper.querySelector('.next');
  next.classList.remove('next');
  next.classList.add('current');

  const newNext = next.nextElementSibling || newsWrapper.querySelector('p:first-child');
  newNext.classList.add('next');
}


init();