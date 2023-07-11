// Time 설정
const setTime = function () {
    const today = new Date();
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    };
    const todayString = today.toLocaleDateString("ko-KR", options);
    const $time = document.getElementById("time");
    $time.setAttribute("datetime", String(today));
    $time.textContent = todayString;
};
export { setTime };
