function getDate() {
  let time;
  const weekend = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  let month = `0${today.getMonth() + 1}`;
  month = month.slice(-2);
  let date = `0${today.getDate()}`;
  date = date.slice(-2);
  const day = weekend[today.getDay()];
  time = `${year}. ${month}. ${date}. ${day}요일`;
  return time;
}

function setDate() {
  let time = getDate();
  const dateDiv = document.getElementById("header-div-02");
  const timeDiv = document.createElement("div");
  timeDiv.innerText = time;
  dateDiv.appendChild(timeDiv);
}

export { setDate };
