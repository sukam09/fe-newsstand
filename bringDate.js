/***** 날짜 가져오기 *****/
const day = ["일", "월", "화", "수", "목", "금", "토"];

document.addEventListener("DOMContentLoaded", () => {
  setDate();
});

function addZero(date) {
  if (date < 10) {
    const zeroDate = ("00" + date).slice(-2);
    return zeroDate;
  }
  return date;
}

function setDate() {
  const today = new Date();
  const dayStr = `${today.getFullYear()}.${addZero(
    today.getMonth() + 1
  )}.${addZero(today.getDate())}.${day[today.getDay()]}요일`;
  document.querySelector(".date").textContent = dayStr;
}
