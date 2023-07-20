import {
    PRESS_DATA_PATH,
    NEWS_DATA_PATH,
    HOT_DATA_PATH,
    MAX_CATEGORY,
    CATEGORIES,
} from "./constants.js";
import {
    grid_option,
    list_option,
    view_option,
    subscribe_option,
} from "./globals.js";

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
export function setOptions(target, callback) {
    return {
        main: view_option.main,
        press: view_option.press,
        mode: view_option.mode,
        target: target || "all",
        callback: typeof callback === 'function' ? callback : undefined
    };
}

export function renderOptions() {
    return {
        grid: {
            all: {
                data: grid_option.press_data,
                page: grid_option.page,
                category: undefined,
            },
            subscribe: {
                data: grid_option.press_data.filter(
                    (press) =>
                        subscribe_option.subscribe_press[press["name"]] ===
                        "true"
                ),
                page: grid_option.subscribe_page,
                category: undefined,
            },
        },
        list: {
            all: {
                data: list_option.news_data,
                page: list_option.page,
                category: list_option.category,
            },
            subscribe: {
                data: list_option.unrefined_new_data.filter(
                    (press) =>
                        subscribe_option.subscribe_press[
                            press["press_name"]
                        ] === "true"
                ),
                page: list_option.subscribe_page,
                category: Object.keys(subscribe_option.subscribe_press).filter(
                    (press) => subscribe_option.subscribe_press[press]
                ),
            },
        },
    };
}

export function getCalPage(page) {
    const { main, press } = setOptions();

    if (main === "grid") {
        if (press === "all") {
            grid_option.page += page;
            return grid_option.page;
        } else {
            grid_option.subscribe_page += page;
            return grid_option.subscribe_page;
        }
    }
    if (main === "list") {
        if (press === "all") {
            list_option.page += page;
            return list_option.page;
        } else {
            list_option.subscribe_page += page;
            return list_option.subscribe_page;
        }
    }
}

export function setCategoryIndex(text) {
    list_option.category = CATEGORIES.indexOf(text);
}

export function getCategoryIndex() {
    return list_option.category;
}

export function updateCategoryIndex(category, direction) {
    if (category === MAX_CATEGORY) {
        list_option.category = 0;
        list_option.page = 0;
    } else if (category < 0) {
        list_option.category = MAX_CATEGORY - 1;
        list_option.page =
            list_option.news_data[CATEGORIES[list_option.category]].length - 1;
    } else {
        list_option.category = category;
        if (direction === "next") list_option.page = 0;
        else if (direction === "prev")
            list_option.page =
                list_option.news_data[CATEGORIES[list_option.category]].length -
                1;
    }
    return { category: list_option.category, page: list_option.page };
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
