let date = new Date();
const day = ["일", "월", "화", "수", "목", "금", "토"];
const full_month = ("0" + (date.getMonth() + 1).toString()).slice(-2);
const full_date = ("0" + date.getDate().toString()).slice(-2);

export function setHeader() {
  document.querySelector(".date").textContent = `${date.getFullYear()}. ${full_month}. ${full_date}. ${day[date.getDay()]}요일`;
  document.querySelector(".title").addEventListener("click", reload);
}

function reload() {
  location.reload();
}
