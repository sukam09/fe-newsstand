import { news_trend_left, news_trend_right } from "../data/headline_news.js";

function rollingCallback() {
    const bannerArr = document.querySelectorAll(".grid_section-banner");
    rollingBanner(bannerArr[0]);
    setTimeout(() => rollingBanner(bannerArr[1]), 1000); // 좌우시간차 1초
}

function rollingBanner(banner) {
    const prev = banner.querySelector(".grid_section .prev");
    prev.classList.remove("prev");

    const current = banner.querySelector(".grid_section .current");
    current.classList.remove("current");
    current.classList.add("prev");

    const next = banner.querySelector(".grid_section .next");
    if (next.nextElementSibling == null) {
        banner.querySelector(".grid_section li:first-child").classList.add("next");
    } else {
        next.nextElementSibling.classList.add("next");
    }
    next.classList.remove("next");
    next.classList.add("current");
}

(function render() {
    document.addEventListener("DOMContentLoaded", () => {
        // getBanner(); // 좌우 배너 만들기
        window.setInterval(rollingCallback, 5000); // 5초간 자동 롤링
    });
})();
