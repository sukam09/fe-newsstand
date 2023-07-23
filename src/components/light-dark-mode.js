import { MODE_CLASS, MODE, PATH } from '../constants/light-dark-mode.js';

/**
 * 뉴스스탠드의 INIT
 * 기본은 Light 모드 🌈
 */

/** @@
 * 1. media query를 사용해서 사용자 OS의 라이트/다크모드를 인식하는 방법
 * 2. HTML Element에 속성 데이터를 넣어서, 속성 데이터에 따라 CSS를 세팅하는 방법
 * 3. localStorage를 활용해서 데이터를 저장하는 방법
 */

const initLightDarkMode = () => {
  localStorage.setItem(MODE.MODE, MODE.LIGHT);
  setMode();
  setModeEvent();
};

const setMode = () => {
  const navRight = document.querySelector(`.${MODE_CLASS.NAV}`);
  const modeElement = `
    <img class=${MODE_CLASS.IMG} src=${PATH.LIGHT}></img>
    `;
  navRight.insertAdjacentHTML('afterbegin', modeElement);
};

const setModeEvent = () => {
  const modeImg = document.querySelector(`.${MODE_CLASS.IMG}`);
  modeImg.addEventListener('click', toggleMode);
};

/**
 *  라이트/다크모드 변경
 */
const toggleMode = () => {
  let mode = localStorage.getItem(MODE.MODE);

  if (mode === MODE.LIGHT) {
    localStorage.setItem(MODE.MODE, MODE.DARK);
    changeStyle(PATH.DARK_STYLESHEET);
    changeIcon(PATH.DARK);
  }
  if (mode === MODE.DARK) {
    localStorage.setItem(MODE.MODE, MODE.LIGHT);
    changeStyle(PATH.LIGHT_STYLESHEET);
    changeIcon(PATH.LIGHT);
  }
};

const changeStyle = (href) => {
  const darkMode = document.querySelector(`.${MODE_CLASS.DARK_MODE}`);
  darkMode.href = href;
};

const changeIcon = (src) => {
  const modeImg = document.querySelector(`.${MODE_CLASS.IMG}`);
  modeImg.src = src;
};

export { initLightDarkMode };
