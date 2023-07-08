function getTodayDate() {
  const today = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  };

  return today.toLocaleDateString('ko-KR', options);
}

function shufflePressOrder() {
  const array = Array.from({ length: 96 }, (v, idx) => idx);
  array.sort(() => Math.random() - 0.5);
  return array;
}

export { getTodayDate, shufflePressOrder };
