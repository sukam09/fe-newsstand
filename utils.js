function showToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = days[date.getDay()];

    const today = document.querySelector(".today");

    today.innerText = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;
}

document.addEventListener("DOMContentLoaded", showToday);