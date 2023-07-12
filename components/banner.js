import { headline_news_left, headline_news_right } from "../data/headline_news.js";

let interval;

function restartRolling() {
    interval = window.setInterval(rollingCallback, 5000);
}

function stopRolling() {
    clearInterval(interval);
}

function getList(news) {
    const container_sec_banner_list = document.createElement("ul");
    container_sec_banner_list.setAttribute("class", "container_sec-banner-list");

    news.forEach((news_elem, idx) => {
        const container_sec_li_banner = document.createElement("li");
        if (idx === 0) container_sec_li_banner.setAttribute("class", "container_sec_li-banner current");
        else if (idx === 1) container_sec_li_banner.setAttribute("class", "container_sec_li-banner next");
        else if (idx === 2) container_sec_li_banner.setAttribute("class", "container_sec_li-banner prev");
        else container_sec_li_banner.setAttribute("class", "container_sec_li-banner");

        const a_title = document.createElement("a");
        a_title.setAttribute("class", "medium14");
        a_title.setAttribute("href", news_elem.url);
        a_title.innerHTML = news_elem.title;
        a_title.addEventListener("mouseover", stopRolling);
        a_title.addEventListener("mouseout", restartRolling);

        container_sec_li_banner.appendChild(a_title);
        container_sec_banner_list.appendChild(container_sec_li_banner);
    });
    return container_sec_banner_list;
}

function getBanner(news_data) {
    const container_section_banner = document.createElement("div");
    container_section_banner.setAttribute("class", "container_section-banner");

    const banner_press = document.createElement("span");
    banner_press.setAttribute("class", "container_section-banner-press bold14");
    banner_press.innerHTML = news_data.press;

    container_section_banner.appendChild(banner_press);
    container_section_banner.appendChild(getList(news_data.news));

    return container_section_banner;
}

function getSection() {
    const container_section = document.querySelector(".container_section");
    container_section.appendChild(getBanner(headline_news_left));
    container_section.appendChild(getBanner(headline_news_right));
}

function rollingCallback() {
    const bannerArr = document.querySelectorAll(".container_section-banner");
    rollingBanner(bannerArr[0]);
    setTimeout(() => rollingBanner(bannerArr[1]), 1000); // 좌우시간차 1초
}

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

export function renderBanner() {
    document.addEventListener("DOMContentLoaded", () => {
        getSection(); // 좌우 배너 만들기
        interval = window.setInterval(rollingCallback, 5000); // 5초간 자동 롤링
    });
}
