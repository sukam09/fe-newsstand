const setHeader = () => {
  const headerElement = document.querySelector('.title_wrapper');

  headerElement.addEventListener('click', () => {
    location.reload();
  });
};

const setTime = () => {
  const timeElement = document.querySelector('time');

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };
  timeElement.innerHTML = Intl.DateTimeFormat('ko-KR', options).format(
    new Date()
  );
};

/**
 * 즉시실행함수
 */
(() => {
  setHeader();
  setTime();
})();
