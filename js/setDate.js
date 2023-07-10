let date = new Date();
const day = ["일", "월", "화", "수", "목", "금", "토"];

export function setDate() {
  document.querySelector(".date").textContent = `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. ${
    day[date.getDay()]
  }요일`;
}
