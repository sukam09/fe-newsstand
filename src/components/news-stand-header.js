const setNewsStandHeader = () => {
  const headerWrapper = document.querySelector('.header__wrapper');

  const $button = document.createElement('button');
  $button.classList.add('header__button');
  $button.addEventListener('click', () => {
    location.reload();
  });

  const $img = document.createElement('img');
  $img.classList.add('header__img');
  $img.src = './assets/icons/newspaper.svg';

  const $h1 = document.createElement('h1');
  $h1.classList.add('header__h1');
  $h1.innerText = '뉴스스탠드';

  const $time = document.createElement('time');
  $time.classList.add('header__time');

  $button.appendChild($img);
  $button.appendChild($h1);
  headerWrapper.appendChild($button);
  headerWrapper.appendChild($time);
  setHeaderTime();
};

const setHeaderTime = () => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };

  const headerTime = document.querySelector('.header__time');
  headerTime.innerHTML = Intl.DateTimeFormat('ko-KR', options).format(new Date());
};

export { setNewsStandHeader };
