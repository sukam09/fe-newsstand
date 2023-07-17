const dateContainer = document.querySelector(".header-right");

function drawDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const weekDay = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]

    const fullDate = `${year}. ${month}. ${day}. ${weekDay[date.getDay()]}`;
    const dateContent = document.createTextNode(fullDate);
    dateContainer.appendChild(dateContent);
}

export {drawDate};