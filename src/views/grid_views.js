import { fetchPressData } from "../utils.js";
import { show_options, toggleArrow, ROWSIZE, COLSIZE } from "../events.js";

// render news
function renderGridPress(shuffledData, page) {
    const news_data_container = document.querySelector(".main_news_container");
    let cnt = page * 24;
    news_data_container.innerHTML = "";
    toggleArrow("grid", page);

    for (let i = 0; i < COLSIZE; i++) {
        let ul = document.createElement("ul");
        for (let j = 0; j < ROWSIZE; j++) {
            const item = shuffledData[cnt] || { name: "empty", url: "" };
            ul.innerHTML += `
            <li class="news_data_item">
                <img class="news_data_img" src="${item.url}" />
            </li>
            `;
            cnt += 1;
        }
        news_data_container.appendChild(ul);
    }
}

function initPress() {
    const promise_data = fetchPressData();

    promise_data.then((data) => {
        show_options.press_data = data;
        renderGridPress(data, 0);
    });
}

export { initPress, renderGridPress };
