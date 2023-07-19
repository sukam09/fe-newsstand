import { PRESS_DATA_PATH, NEWS_DATA_PATH, HOT_DATA_PATH } from "./constants.js";
import { view_option, subscribe_option } from "./globals.js";

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

/**
 * @description
 * 1. 현재 시간을 기준으로 mode를 설정한다.
 * @returns {String} mode
 */
export function currentHourToMode() {
    const current_hour = new Date().getHours();
    return current_hour >= 18 || current_hour < 6 ? "dark-mode" : "light-mode";
}

/**
 * @description
 * 1. 언론사 구독 여부를 확인한다.
 * @param {String} item
 * @returns Boolean
 */
export function isSubscribed(item) {
    return subscribe_option.subscribe_press[item] === undefined
        ? false
        : subscribe_option.subscribe_press[item];
}

/**
 * @description
 * 1. view의 옵션을 준다.
 * @param {*} target
 * @returns options
 */
export function setOptions(target) {
    return {
        main: view_option.main,
        press: view_option.press,
        mode: view_option.mode,
        target: target,
    };
}

// brute force로 구현 - 순차탐색
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

export async function fetchPressData() {
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

export async function fetchHotTopicData() {
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

export async function fetchNewsData() {
    try {
        const data = await fetch(NEWS_DATA_PATH).then((res) => res.json());

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
