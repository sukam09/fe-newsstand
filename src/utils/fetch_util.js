import {
    HOT_DATA_PATH,
    NEWS_DATA_PATH,
    PRESS_DATA_PATH,
} from "../constants.js";

export async function fetchHotTopicData() {
    try {
        const data = await fetch(HOT_DATA_PATH)
            .then((res) => res.json())
            .then((data) => data.sort(() => Math.random() - 0.5));

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

export async function fetchPressData() {
    try {
        const data = await fetch(PRESS_DATA_PATH)
            .then((res) => res.json())
            .then((data) => data.sort(() => Math.random() - 0.5));

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
