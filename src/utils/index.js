function getTodayDate() {
  const date = new Date();
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  return `${date.getFullYear()}. ${`${date.getMonth() + 1}`.padStart(
    2,
    "0"
  )}. ${`${date.getDate()}`.padStart(2, "0")}. ${days[date.getDay()]}`;
}

function shufflePressOrder() {
  const array = Array.from({ length: 96 }, (v, idx) => idx + 1);
  array.sort(() => Math.random() - 0.5);
  return array;
}

export { getTodayDate, shufflePressOrder };
