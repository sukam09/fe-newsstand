import { getElemClass } from "../../utils/js/getElements.js";

// 표현식에 맞는 오늘 날짜 출력
function showDate() {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const formattedTodayDate = new Date().toLocaleDateString("ko", options);
  const todayDate = getElemClass(document, 'header-date');
  todayDate[0].innerHTML = formattedTodayDate;
}

export { showDate };