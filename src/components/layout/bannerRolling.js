import { INTERVAL_TIME, INTERVAL_SYNC } from "../../utils/constant.js";

let interval;

// 자동 롤링 시작
export function startRolling() {
    interval = window.setInterval(rollingCallback, INTERVAL_TIME);
}

// 자동 롤링 정지
export function stopRolling() {
    clearInterval(interval);
}

// 좌우 배너 1초 간격으로 롤링
function rollingCallback() {
    const banner_arr = document.querySelectorAll(".container_section-banner");
    rollingBanner(banner_arr[0]);
    setTimeout(() => rollingBanner(banner_arr[1]), INTERVAL_SYNC);
}

// 각각의 배너 롤링 구현
function rollingBanner(banner) {
    const prev = banner.querySelector(".container_section .prev");
    prev.classList.remove("prev");

    const current = banner.querySelector(".container_section .current");
    current.classList.remove("current");
    current.classList.add("prev");

    const next = banner.querySelector(".container_section .next");
    if (next.nextElementSibling == null) {
        banner.querySelector(".container_section li:first-child").classList.add("next");
    } else {
        next.nextElementSibling.classList.add("next");
    }
    next.classList.remove("next");
    next.classList.add("current");
}
