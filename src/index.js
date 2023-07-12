import { setNewsStandHeader } from './components/news-stand-header.js';
import { setLatestNews } from './components/latest-news.js';
import { setPressGrid } from './components/press-grid.js';

const newsWrapper = document.querySelector('.press-logo__wrapper');

let isLightMode = true;
let pageNum = 0;

/**
 * 이미지 src 변경하기
 */
const changeImgSrc = () => {
  let newImg = idList.slice(pageNum * 24, pageNum * 24 + 24);

  for (let i = 0; i < 24; i++) {
    const $img = document.querySelector(`.img${i}`);
    const imgSrc = isLightMode
      ? `./assets/images/light-press-logo/img${newImg[i]}.png`
      : `./assets/images/dark-press-logo/img${newImg[i]}.png`;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = function () {
      $img.src = imgSrc;
    };
    checkImg.onerror = function () {
      $img.remove();
    };
  }
};

/**
 * Grid 화살표 hidden 처리
 */
const setArrowVisible = (mediaList) => {
  const leftArrow = document.querySelector('.arrows__img-left');
  const rightArrow = document.querySelector('.arrows__img-right');

  // 페이지 제한 0~3에 따른 hidden 여부
  if (pageNum === 0) {
    leftArrow.classList.add('hidden');
  } else if (pageNum > 0 && pageNum < 3) {
    leftArrow.classList.remove('hidden');
    rightArrow.classList.remove('hidden');
  } else if (pageNum === 3) {
    rightArrow.classList.add('hidden');
  }

  // 언론사 로고 개수 따른 hidden 여부
};

/**
 * Grid 화살표 클릭
 */

function init() {
  setNewsStandHeader();
  setLatestNews();
  setPressGrid(isLightMode);
  //
  // shuffleList(idList);
  // setArrowVisible(idList);
  // makeGrid();
  //
}

init();
