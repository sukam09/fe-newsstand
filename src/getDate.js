const addLeadingZero = number => (number < 10 ? '0' + number : number);

const getDate = () => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const weekDay = weekDays[today.getDay()];

  const dateString = `${year}. ${addLeadingZero(month)}. ${addLeadingZero(day)} ${weekDay}요일`;

  const $date = document.querySelector('.date');
  $date.textContent = dateString;
};

getDate();
