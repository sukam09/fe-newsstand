function date() {
  const headerDate = document.querySelector(".header—-date");
  const today = new Date();

  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  const year = today.getFullYear();
  const month =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1;
  const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const day = today.getDay();

  const todayString = `${year}. ${month}. ${date}. ${dayList[day]}요일`;

  headerDate.innerText = todayString;
}

export { date };
