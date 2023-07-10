import { createNewsBar } from "./setNewsBar.js";

const setRollingEvent = (rollingElement) => {
    window.setInterval(() => {
        rollingElement.style.transitionDuration = "400ms";
        rollingElement.style.marginTop = "-26px";

        window.setTimeout(() => {
            rollingElement.removeAttribute("style");
            rollingElement.appendChild(rollingElement.firstElementChild);
        }, 1000);
    }, 5000);
};

const infiniteRolling = () => {
    const rollingElement = document.querySelectorAll(".news-bar-rolling > ul");
    rollingElement.forEach((item) => setRollingEvent(item));
};

const setNewsBarRolling = () => {
    const newsBarRolling = document.querySelectorAll(".news-bar-rolling");
    newsBarRolling.forEach((item, index) => createNewsBar(item, index));
};

export { setNewsBarRolling, infiniteRolling };
