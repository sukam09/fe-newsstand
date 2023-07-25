import { MODE_CLASS, MODE, PATH } from '../constants/light-dark-mode.js';

/**
 * 뉴스스탠드의 INIT
 * 기본은 Light 모드 🌈
 */

const initLightDarkMode = () => {
  localStorage.setItem(MODE.MODE, MODE.LIGHT);
  renderMode();
  setupEvent();
};

const renderMode = () => {
  const navRight = document.querySelector(`.${MODE_CLASS.NAV}`);
  const modeElement = `
    <img class=${MODE_CLASS.IMG} src=${PATH.LIGHT}></img>
    `;
  navRight.insertAdjacentHTML('afterbegin', modeElement);
};

const setupEvent = () => {
  const modeImg = document.querySelector(`.${MODE_CLASS.IMG}`);
  modeImg.addEventListener('click', toggleMode);
};

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
