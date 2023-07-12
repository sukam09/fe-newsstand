// 날짜 관련 함수
function initDate() {
  const date = new Date();
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const todaystr = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")}. ${week[date.getDay()]}`;
  document.querySelector(".today").innerHTML = todaystr;
}

function initBtn() {
  const right_btn = document.querySelector(".right-btn");
  const left_btn = document.querySelector(".left-btn");

  right_btn.addEventListener("click", () => moveGrid(RIGHT));
  left_btn.addEventListener("click", () => moveGrid(LEFT));
}

export { initDate, initBtn };
