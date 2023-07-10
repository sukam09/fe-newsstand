// Time 설정
var setTime = function () {
    var today = new Date()
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    }
    var todayString = today.toLocaleDateString("ko-KR", options)
    var $time = document.getElementById("time")
    $time.setAttribute("datetime", String(today))
    $time.textContent = todayString
}
export { setTime }
