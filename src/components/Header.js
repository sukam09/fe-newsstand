/**
 * 뉴스스탠드 로고에 새로고침 기능을 추가합니다.
 * @param { HTMLElement } $element
 */
const setRefresh = ($element) => {
    $element.addEventListener("click", () => {
        window.location.reload();
    });
};
/**
 * 현재 날짜를 표시합니다.
 * @param { Date } date
 */
const setDate = (date) => {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    };
    const todayString = date.toLocaleDateString("ko-KR", options);
    const $time = document.querySelector(".header__date");
    $time.setAttribute("datetime", String(date));
    $time.textContent = todayString;
};
/**
 * 헤더를 설정합니다.
 */
const setHeader = () => {
    const $title = document.querySelector(".header__title");
    setRefresh($title);
    setDate(new Date());
};
export { setHeader };
