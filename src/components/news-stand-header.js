import { HEADER_CLASS, DATE_OPTIONS, PATH } from '../constants/news-stand-header.js';

/**
 * 뉴스스탠드의 INIT
 */
const initNewsStandHeader = () => {
  setHeader();
  setHeaderButton();
  const dateFormat = getHeaderTime();
  setHeaderTime(dateFormat);
};

const setHeader = () => {
  const headerWrapper = document.querySelector(`.${HEADER_CLASS.WRAPPER}`);
  const headerElement = `
    <button class=${HEADER_CLASS.BUTTON}>
      <img class=${HEADER_CLASS.IMAGE} src=${PATH.LOGO}></img>
      <h1 class=${HEADER_CLASS.H1}>뉴스스탠드</h1>
    </button>
    <time class=${HEADER_CLASS.TIME}></time>
  `;
  headerWrapper.innerHTML = headerElement;
};

/**
 * 뉴스스탠드의 로고 설정
 */
const setHeaderButton = () => {
  const headerButton = document.querySelector(`.${HEADER_CLASS.BUTTON}`);
  headerButton.addEventListener('click', () => {
    location.reload();
  });
};

/**
 * 뉴스스탠드의 시간 설정
 */
const getHeaderTime = () => {
  return new Date().toLocaleDateString('ko-KR', DATE_OPTIONS);
};

const setHeaderTime = (dateFormat) => {
  const headerTime = document.querySelector(`.${HEADER_CLASS.TIME}`);
  headerTime.innerText = dateFormat;
};

export { initNewsStandHeader };
