export function showToday(tag) {
    const date = new Date();

    const today = document.querySelector(`.${tag}`);
    today.innerText = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });
}

/**
 * @description
 * 1. 현재 시간을 기준으로 mode를 설정한다.
 * @returns {String} mode
 */
export function currentHourToMode() {
    const current_hour = new Date().getHours();
    return current_hour >= 18 || current_hour < 6 ? "dark-mode" : "light-mode";
}

// brute force로 구현 - 순차탐색
export function myQuerySelector(selector, element = document) {
    const matchesSelector = (el) => el.matches(selector);

    return Array.from(element.children).reduce((found_el, cur_el) => {
        return (
            found_el ||
            (matchesSelector(cur_el)
                ? cur_el
                : myQuerySelector(selector, cur_el))
        );
    }, null);
}

/**
 * @description
 * 1. grid_view의 arrow display를 변경한다.
 * @param {*} mode
 * @param {*} page
 */
export function toggleArrow(mode, page, max) {
    const left_arrow = document.querySelector(`.grid_left_arrow`);
    const right_arrow = document.querySelector(`.grid_right_arrow`);

    if (mode === "subscribe") {
        left_arrow.style.display = "none";
        right_arrow.style.display = "none";
        return;
    }

    switch (page) {
        case 0:
            left_arrow.style.display = "none";
            right_arrow.style.display = "block";
            break;
        case max:
            left_arrow.style.display = "block";
            right_arrow.style.display = "none";
            break;
        default:
            left_arrow.style.display = "block";
            right_arrow.style.display = "block";
            break;
    }
}
