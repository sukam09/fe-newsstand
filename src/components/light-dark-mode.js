/**
 * 뉴스스탠드의 INIT
 * 기본은 Light 모드 ☀️
 */
const initLightDarkMode = () => {
  //   setNewsStandHeader();
  //   setHeaderButton();
  //   const dateFormat = getHeaderTime();
  //   setHeaderTime(dateFormat);
  localStorage.setItem('mode', 'light');

  setMode();
  setModeLabel();
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
const setModeImg = () => {
  const modeImg = document.querySelector('.mode__img');
  modeImg.addEventListener('click', () => {});
};

/**
 *  라이트/다크모드 변경
 */
const changeMode = (e) => {
  //   if (e.target.checked) {
  //     localStorage.setItem('data-theme', 'dark');
  //     document.documentElement.setAttribute('data-theme', 'dark');
  //   } else {
  //     localStorage.setItem('data-theme', 'light');
  //     document.documentElement.setAttribute('data-theme', 'light');
  //   }
};

// 뉴스스탠드 함수이름 수정

export { initLightDarkMode };
