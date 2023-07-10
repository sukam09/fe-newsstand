import { fetchHotTopicData } from "./utils.js";

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

function showBanner(data1, data2) {
    const banner_left = document.getElementById("rollingBannerLeft");
    const banner_right = document.getElementById("rollingBannerRight");

    const list_left = createList(data1);
    const list_right = createList(data2);

    banner_left.appendChild(list_left);
    banner_right.appendChild(list_right);
}

function updateBanner(banner, loc) {
    if (banner.style.animationPlayState === "paused") {
        return;
    }
    if (loc === "left") {
        banner.style.animation = "roll-up-left 3s ease-in-out forwards";
    } else if (loc === "right") {
        banner.style.animation = "roll-up-right 3s ease-in-out forwards";
    }

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
        updateBanner(left_banner, "left");
    }, 5000);
    delay(1000).then(() => {
        setInterval(() => {
            updateBanner(right_banner, "right");
        }, 5000);
    });
}

function auto_rolling() {
    const promise_data = fetchHotTopicData();

    console.log(promise_data);

    promise_data.then((data) => {
        showBanner(data[0], data[1]);
        bannerMouseEvents();
        controlBanner();
    });
}

export { auto_rolling };
