function date() {
  const $headerDate = document.querySelector('.header—date');
  const today = new Date();

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };

  $headerDate.innerText = today.toLocaleDateString('ko-KR', options);
}
export { date };
