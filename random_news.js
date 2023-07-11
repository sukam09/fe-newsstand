import { fetchPressData } from "./utils.js";
import { show_options } from "./events.js";

// rowSize, colSize, maxPage, currentPage is main size variable
const rowSize = 6;
const colSize = 4;
const maxPage = 3;
let currentPage = 0;

// move page
function movePage(data) {
    document.querySelector(".left_arrow").addEventListener("click", () => {
        if (currentPage < 0) return;

        renderGridPress(data, currentPage - 1);
        currentPage = currentPage - 1;
    });
    document.querySelector(".right_arrow").addEventListener("click", () => {
        if (currentPage > maxPage) return;

        renderGridPress(data, currentPage + 1);
        currentPage = currentPage + 1;
    });
}

// render news
function renderGridPress(shuffledData, page) {
    const news_data_container = document.querySelector(".main_news_container");
    let cnt = page * 24;
    news_data_container.innerHTML = "";
    toggleArrow(page);

    for (let i = 0; i < colSize; i++) {
        let ul = document.createElement("ul");
        for (let j = 0; j < rowSize; j++) {
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

// toggle arrow
function toggleArrow(page) {
    switch (page) {
        case 0:
            document.querySelector(".left_arrow").style.display = "none";
            document.querySelector(".right_arrow").style.display = "block";
            break;
        case maxPage:
            document.querySelector(".left_arrow").style.display = "block";
            document.querySelector(".right_arrow").style.display = "none";
            break;
        default:
            document.querySelector(".left_arrow").style.display = "block";
            document.querySelector(".right_arrow").style.display = "block";
            break;
    }
}

function initPress() {
    const promise_data = fetchPressData();

    promise_data.then((data) => {
        renderPress(data, 0);
        show_options.press_data = data;
    });
}

function renderPress(data, page) {
    renderGridPress(data, page);
    movePage(data);
}

export { initPress, renderGridPress, currentPage };
