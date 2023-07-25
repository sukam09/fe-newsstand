/**
 년, 월, 일, 요일 화면에 띄우기
 */
function showDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, 0);
  const date = String(now.getDate()).padStart(2, 0);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const day = week[now.getDay()];
  const $todayDate = document.querySelector('.date');
  $todayDate.innerText = `${year}. ${month}. ${date}. ${day}요일`;
}

export default showDate;