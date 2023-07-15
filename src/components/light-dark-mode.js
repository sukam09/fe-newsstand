const MODE = 'mode';
const LIGHT_MODE = 'light';
const DARK_MODE = 'dark';
const MODE_IMG_SRC_LIGHT = './assets/icons/mode-light.svg';
const MODE_IMG_SRC_DARK = './assets/icons/mode-dark.svg';
const LIGHT_MODE_STYLESHEET = '';
const DARK_MODE_STYLESHEET = './styles/dark.css';
const MODE_CLASS = {
  NAV: 'press__nav-right',
  IMG: 'mode__img',
  DARK_MODE: 'dark-mode',
};

/**
 * 뉴스스탠드의 INIT
 * 기본은 Light 모드 🌈
 */
const initLightDarkMode = () => {
  localStorage.setItem(MODE, LIGHT_MODE);
  setMode();
  setModeEvent();
};

const setMode = () => {
  const navRight = document.querySelector(`.${MODE_CLASS.NAV}`);
  const modeElement = `
    <img class=${MODE_CLASS.IMG} src=${MODE_IMG_SRC_LIGHT}></img>
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
  let mode = localStorage.getItem(MODE);

  if (mode === LIGHT_MODE) {
    localStorage.setItem(MODE, DARK_MODE);
    changeStyle(DARK_MODE_STYLESHEET);
    changeIcon(MODE_IMG_SRC_DARK);
  }
  if (mode === DARK_MODE) {
    localStorage.setItem(MODE, LIGHT_MODE);
    changeStyle(LIGHT_MODE_STYLESHEET);
    changeIcon(MODE_IMG_SRC_LIGHT);
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
