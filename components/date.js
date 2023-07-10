function showToday() {
    const today = new Date();
    const options = {
        year: "numeric", // 숫자 표기
        month: "numeric",
        day: "numeric",
        weekday: "long", // 문자 표기
    };
    const header_right = document.querySelector(".header-right");
    header_right.innerHTML = today.toLocaleDateString("ko-kr", options);
}

(function render() {
    document.addEventListener("DOMContentLoaded", showToday);
})();
