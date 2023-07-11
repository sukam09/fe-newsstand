import { setLatestNews } from './components/latest-news.js';

const newsWrapper = document.querySelector('.press-logo__wrapper');
const systemDate = document.querySelector('.header__time');

let idList = Array.from({ length: 96 }, (_, idx) => idx);
let isLightMode = true;
let pageNum = 0;

/************************************************** 롤링롤링 테스트 */

/**
 * 배열을 섞는 함수
 */
const shuffleList = (list) => {
  list.sort(() => Math.random() - 0.5);
};

/**
 * 뉴스스탠드 Grid 제작하기
 */
const makeGrid = () => {
  for (let i = 0; i < 24; i++) {
    const gridItem = document.createElement('li');
    const imgSrc = isLightMode
      ? `./assets/images/light-press-logo/${idList[i]}.png`
      : `./assets/images/dark-press-logo/${idList[i]}.png`;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = function () {
      const img = document.createElement('img');
      img.classList.add(`img${i}`);
      img.src = imgSrc;
      img.style.height = '20px';
      gridItem.classList.add('press-logo__li');
      gridItem.appendChild(img);
    };

    newsWrapper.append(gridItem);
  }
};

/**
 * 이미지 src 변경하기
 */
const changeImgSrc = () => {
  let newImg = idList.slice(pageNum * 24, pageNum * 24 + 24);

  for (let i = 0; i < 24; i++) {
    const $img = document.querySelector(`.img${i}`);
    const imgSrc = isLightMode
      ? `./assets/images/light-press-logo/${newImg[i]}.png`
      : `./assets/images/dark-press-logo/${newImg[i]}.png`;

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
const clickArrow = (className) => {
  if (className === 'left-arrow') pageNum--;
  if (className === 'right-arrow') pageNum++;
  changeImgSrc();
  setArrowVisible();
};

/**
 * 시스템 날짜 가져오기
 */
const getSystemDate = () => {
  const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = WEEKDAY[Number(today.getDay())];

  return [year, month, date, day];
};

/**
 * 시스템 날짜 표시하기
 */
const setSystemDate = (todayInfo) => {
  let [year, month, date, day] = todayInfo;
  if (month < 10) month = String(month).padStart(2, '0');
  if (date < 10) date = String(date).padStart(2, '0');
  const dateForm = year + '. ' + month + '. ' + date + '. ' + day;

  const $p = document.createElement('p');
  const dateText = document.createTextNode(dateForm);
  $p.appendChild(dateText);
  systemDate.append($p);
};

/**
 * 로고를 클릭하면 새로고침
 */
const reloadPage = () => {
  location.reload();
};

function init() {
  setSystemDate(getSystemDate());
  shuffleList(idList);
  setArrowVisible(idList);
  makeGrid();
  setLatestNews();
}

init();
