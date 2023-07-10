function showToday() {
    const date = new Date();

    const today = document.querySelector(".today");
    today.innerText = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });
}

document.addEventListener("DOMContentLoaded", showToday);
