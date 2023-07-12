const week = ["일", "월", "화", "수", "목", "금", "토"];
const day = document.querySelector(".date");

function makeDate() {
  const date = new Date();
  day.innerHTML = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, 0)}. ${String(date.getDate()).padStart(2, 0)}. ${
    week[date.getDay()]
  }요일`;
}

function getDateInterval() {
  setInterval(makeDate, 60000);
}

function initDate() {
  makeDate();
  getDateInterval();
}
export { initDate };
//파라미터로 day를 받으면 범용성 굳
//함수 파라미터 활용
