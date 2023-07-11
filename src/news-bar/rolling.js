import { createNewsBar } from "./setNewsBar.js";

const setRollingEvent = (rollingElement, index) => {
    let interval;

    const startInterval = () => {
        interval = window.setInterval(() => {
            rollingElement.style.transitionDuration = "500ms";
            rollingElement.style.marginTop = "-26px";

            window.setTimeout(() => {
                rollingElement.removeAttribute("style");
                rollingElement.appendChild(rollingElement.firstElementChild);
            }, 1000);
        }, 5000);
    };

    window.setTimeout(() => {
        startInterval();
    }, 1000 * index);

    rollingElement.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    rollingElement.addEventListener("mouseleave", () => {
        clearInterval(interval);
        startInterval();
    });
};

const infiniteRolling = () => {
    const rollingElements = document.querySelectorAll(".news-bar-rolling > ul");
    rollingElements.forEach((item, index) => setRollingEvent(item, index));
};

const setNewsBarRolling = () => {
    const newsBarRolling = document.querySelectorAll(".news-bar-rolling");
    newsBarRolling.forEach((item, index) => createNewsBar(item, index));
};

export { setNewsBarRolling, infiniteRolling };
