import { news_trend_left, news_trend_right } from "./trend_news.js";

function createList(news) {
    const list = document.createElement("ul");
    list.classList.add("hot_list");
    news.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.url;
        const span = document.createElement("span");
        span.classList.add("hot_press");
        span.textContent = item.press;
        const strong = document.createElement("p");
        strong.classList.add("hot_title");
        strong.textContent = item.title;
        a.appendChild(span);
        a.appendChild(strong);
        li.appendChild(a);
        list.appendChild(li);
    });
    return list;
}

function showBanner() {
    const banners = document.querySelectorAll(".rolling_banner");

    banners.forEach((banner) => {
        createList(news_trend_left);
        const list = createList(news_trend_left);
        banner.appendChild(list);
    });
}

function updateBanner(banner) {
    if (banner.style.animationPlayState === "paused") {
        return;
    }
    banner.style.animation = "roll-up 3s ease-in-out forwards";

    setTimeout(() => {
        //if hover, stop animation
        if (banner.style.animationPlayState === "paused") {
            return;
        }
        banner.appendChild(banner.childNodes[0]);
        banner.style.animation = "none";
    }, 4000);
}

//hover event stop animation
function hoverStop(banner) {
    banner.style.animationPlayState = "paused";
}

function hoverStart(banner) {
    banner.style.animationPlayState = "running";
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function bannerMouseEvents() {
    const left_banner =
        document.getElementById("rollingBannerLeft").childNodes[0];
    const right_banner =
        document.getElementById("rollingBannerRight").childNodes[0];

    left_banner.addEventListener("mouseover", function () {
        hoverStop(left_banner);
    });

    left_banner.addEventListener("mouseout", function () {
        hoverStart(left_banner);
    });

    right_banner.addEventListener("mouseover", function () {
        hoverStop(right_banner);
    });

    right_banner.addEventListener("mouseout", function () {
        hoverStart(right_banner);
    });
}

function controlBanner() {
    const left_banner =
        document.getElementById("rollingBannerLeft").childNodes[0];
    const right_banner =
        document.getElementById("rollingBannerRight").childNodes[0];

    setInterval(() => {
        updateBanner(left_banner);
    }, 5000);
    delay(1000).then(() => {
        setInterval(() => {
            updateBanner(right_banner);
        }, 5000);
    });
}

function init() {
    showBanner();
    bannerMouseEvents();
    controlBanner();
}

init();
