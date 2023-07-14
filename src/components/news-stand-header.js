/**
 * 뉴스스탠드의 INIT
 */
const initNewsStandHeader = () => {
  setHeader();
  setHeaderButton();
  const dateFormat = getHeaderTime();
  setHeaderTime(dateFormat);
};

/**
 * 뉴스스탠드의 ELEMENT
 */
const setHeader = () => {
  const headerWrapper = document.querySelector('.header__wrapper');
  const headerElement = `
    <button class='header__button'>
      <img class='header__img' src='./assets/icons/newspaper.svg'></img>
      <h1 class='header__h1'>뉴스스탠드</h1>
    </button>
    <time class='header__time'></time>
  `;
  headerWrapper.innerHTML = headerElement;
};

/**
 * 뉴스스탠드의 로고 이벤트
 */
const setHeaderButton = () => {
  const headerButton = document.querySelector('.header__button');
  headerButton.addEventListener('click', () => {
    location.reload();
  });
};

/**
 * 뉴스스탠드의 시간 반환
 */
const getHeaderTime = () => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };

  return Intl.DateTimeFormat('ko-KR', options).format(new Date());
};

/**
 * 뉴스스탠드의 시간 설정
 */
const setHeaderTime = (dateFormat) => {
  const headerTime = document.querySelector('.header__time');
  headerTime.innerText = dateFormat;
};

export { initNewsStandHeader };
