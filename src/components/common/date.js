export function showTodayDate() {
    const today = new Date();
    const options = {
        year: "numeric", // 숫자 표기
        month: "numeric",
        day: "numeric",
        weekday: "long", // 문자 표기
    };

    return today.toLocaleDateString("ko-kr", options);
}
