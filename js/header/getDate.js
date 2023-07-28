const week = ["일", "월", "화", "수", "목", "금", "토"];

function makeDate(className) {
  const day = document.querySelector(className);
  const date = new Date();

  day.innerHTML = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, 0)}. ${String(date.getDate()).padStart(2, 0)}. ${
    week[date.getDay()]
  }요일`;
}

function getDateInterval(className, time) {
  setInterval(makeDate(className), time);
}

function getDate(className, time) {
  makeDate(className);
  getDateInterval(className, time);
}
export { getDate };
