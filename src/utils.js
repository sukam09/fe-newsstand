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

async function fetchPressData() {
    try {
        const data = await fetch("./data/press_data.json")
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
        const data = await fetch("./data/hot_topic_data.json")
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
        const data = await fetch("./data/all_news.json").then((res) =>
            res.json()
        );

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function autoNext(interval, current_time, class_name) {
    const progress = document.querySelector(`.${class_name}`);

    clearInterval(interval);
    current_time = 0;

    // 1초마다 1씩 증가
    interval = setInterval(() => {
        current_time += 1;
        if (current_time === 21) {
            clearInterval(current_time);
            current_time = 0;
            movePage("next");
        }
        progress.value = current_time;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", showToday);

export { fetchPressData, fetchHotTopicData, fetchNewsData, autoNext };
