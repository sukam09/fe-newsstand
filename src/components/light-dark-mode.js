/**
 * 뉴스스탠드의 INIT
 * 기본은 Light 모드 ☀️
 */
const initLightMode = () => {
  localStorage.setItem('mode', 'light');

  setMode();
  setModeEvent();
};

/**
 *  라이트/다크모드의 ELEMENT
 */
const setMode = () => {
  const navRight = document.querySelector('.press__nav-right');
  const modeElement = `
    <img class='mode__img' src='./assets/icons/mode-light.svg'></img>
    `;
  navRight.insertAdjacentHTML('afterbegin', modeElement);
};

/**
 *  라이트/다크모드의 이벤트
 */
const setModeEvent = () => {
  const modeImg = document.querySelector('.mode__img');
  modeImg.addEventListener('click', isLightMode);
};

/**
 *  라이트/다크모드 변경
 */
const isLightMode = () => {
  let mode = localStorage.getItem('mode');

  if (mode === 'light') {
    localStorage.setItem('mode', 'dark');
    changeMode('');
  }
  if (mode === 'dark') {
    localStorage.setItem('mode', 'light');
    changeMode('./styles/dark.css');
  }
};

const changeMode = (href) => {
  const darkMode = document.querySelector('.dark-mode');
  darkMode.href = href;
};

export { initLightMode };
