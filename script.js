
const date_container = document.querySelector(".header-right");

function drawDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let weekDay = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]
    
    let fullDate = year + ". " + month + ". " + day + " " + weekDay[date.getDay()];
    let dateContent = document.createTextNode(fullDate);
    date_container.appendChild(dateContent);
    
}
function init(){
    drawDate();
}
window.onload = init;