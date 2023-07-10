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
        // then return data
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", showToday);

export { fetchPressData, fetchHotTopicData };
