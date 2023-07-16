export const TimeComponent = () => {
  const $time = document.querySelector(".time time");
  const today = new Date();
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  $time.setAttribute("datetime", String(today));
  const format = (num) => String(num).padStart(2, "0");
  $time.innerText = `${today.getFullYear()}. ${format(
    today.getMonth() + 1
  )}. ${format(today.getDate())}. ${DAYS[today.getDay()]}요일`;
};
