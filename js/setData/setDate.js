function calcDate() {
  const weekend = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const date = `0${today.getDate()}`.slice(-2);
  const day = weekend[today.getDay()];
  return `${year}. ${month}. ${date}. ${day}요일`;
}

function setDate(dateDiv) {
  const timeDiv = document.createElement("div");
  timeDiv.innerText = calcDate();
  dateDiv.appendChild(timeDiv);
}

export { setDate };
