import { PRESS_DATA_PATH, NEWS_DATA_PATH, HOT_DATA_PATH } from "./constants.js";

function showToday() {
    const date = new Date();

    const today = document.querySelector(".today");
    today.innerText = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });
}

// brute force로 구현 - 순차탐색
function myQuerySelector(selector, element = document) {
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

async function fetchPressData() {
    try {
        const data = await fetch(PRESS_DATA_PATH)
            .then((res) => res.json())
            .then((data) => data.sort(() => Math.random() - 0.5));
        // then return data
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchHotTopicData() {
    try {
        const data = await fetch(HOT_DATA_PATH)
            .then((res) => res.json())
            .then((data) => data.sort(() => Math.random() - 0.5));
        // then data.location = "left" or "right" two arr return

        const left = data.filter((item) => item.location === "left");
        const right = data.filter((item) => item.location === "right");

        return [left, right];
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function fetchNewsData() {
    try {
        const data = await fetch(NEWS_DATA_PATH).then((res) => res.json());

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", showToday);

export { fetchPressData, fetchHotTopicData, fetchNewsData, myQuerySelector };
