import { DELAY, INTERVAL } from "../constants.js";
/**
 * @description
 * 1. 배너를 업데이트한다.
 * @returns {Object} options
 */
export function controlBanner() {
    const banner_left =
        document.getElementById("rollingBannerLeft").childNodes[0];
    const banner_right =
        document.getElementById("rollingBannerRight").childNodes[0];

    // 5초마다 배너 교체

    const leftBannerTime = setTimeout(() => {
        const left_time = setInterval(() => {
            //updateBanner 이후 banner update
            updateBanner(banner_left, left_time, "left");
        }, INTERVAL);
    }, 0);

    const rightBannerTime = setTimeout(() => {
        const right_time = setInterval(() => {
            updateBanner(banner_right, right_time, "right");
        }, INTERVAL);
    }, DELAY);

    return {
        banner_left: banner_left,
        banner_right: banner_right,
    };
}

function updateBanner(banner, banner_time, loc) {
    if (banner.style.animationPlayState === "paused") {
        clearTimeout(banner_time);
        return;
    }

    if (loc === "left") {
        banner.style.animation = "roll-up-left 3s ease-in-out forwards";
    }
    if (loc === "right") {
        banner.style.animation = "roll-up-right 3s ease-in-out forwards";
    }

    setTimeout(() => {
        if (banner.style.animationPlayState === "paused") {
            return;
        }
        if (banner.style.animationPlayState === "running") {
            banner.appendChild(banner.childNodes[0]);
            banner.style.animation = "none";
        }
    }, 4000);
}
