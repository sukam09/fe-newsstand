document.documentElement.setAttribute("color-theme", "light");

//변수
const week = ["일", "월", "화", "수", "목", "금", "토"];

const mainLogo = document.querySelector(".title");
const day = document.querySelector(".date");
//함수
const reload = () => {
  window.location.reload();
};

const makeDate = () => {
  const date = new Date();
  day.innerHTML = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, 0)}. ${String(date.getDate()).padStart(2, 0)}. ${
    week[date.getDay()]
  }요일`;
};
//todo padstart
const getDateInterval = () => {
  setInterval(makeDate, 60000);
};
//이벤트 리스너
mainLogo.addEventListener("click", reload);

//default
makeDate();
getDateInterval();
