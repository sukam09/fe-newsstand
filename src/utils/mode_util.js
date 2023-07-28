import { view_option } from "../store.js";

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

export function currentHourToMode() {
    const current_hour = new Date().getHours();
    view_option.mode =
        current_hour >= 18 || current_hour < 6 ? "dark-mode" : "light-mode";
}

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
