import { fetchPressData } from "../utils.js";
import { show_options } from "../events.js";

// ROWSIZE, COLSIZE, MAXPAGE, grid_current_page is main size variable
const ROWSIZE = 6;
const COLSIZE = 4;
const MAXPAGE = 3;
let grid_current_page = 0;

// move page
function movePage(data) {
    document.querySelector(".left_arrow").addEventListener("click", () => {
        if (grid_current_page < 0) return;

        renderGridPress(data, grid_current_page - 1);
        grid_current_page = grid_current_page - 1;
    });
    document.querySelector(".right_arrow").addEventListener("click", () => {
        if (grid_current_page > MAXPAGE) return;

        renderGridPress(data, grid_current_page + 1);
        grid_current_page = grid_current_page + 1;
    });
}

// render news
function renderGridPress(shuffledData, page) {
    const news_data_container = document.querySelector(".main_news_container");
    let cnt = page * 24;
    news_data_container.innerHTML = "";
    toggleArrow(page);

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

// toggle arrow
function toggleArrow(page) {
    switch (page) {
        case 0:
            document.querySelector(".left_arrow").style.display = "none";
            document.querySelector(".right_arrow").style.display = "block";
            break;
        case MAXPAGE:
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

export { initPress, renderGridPress, grid_current_page };
