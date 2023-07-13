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
            <li class="press_data_item">
                <img class="press_item press_data_img press_front" src="${item.url}" />
                <button class="press_item content_subscribe press_back">
                    <img src="./assets/icons/plus.png" />
                    <span>구독하기</span>
                </button>
            </li>
            `;
            cnt += 1;
        }
        news_data_container.appendChild(ul);
    }
    togglePress();
}

function togglePress() {
    const press_container = document.querySelectorAll(".press_data_item");
    press_container.forEach((item) => {
        //hover event
        item.addEventListener("mouseenter", (e) => {
            // 3d rotate
            item.style.transform = "rotateX(180deg)";
            item.style.transition = "transform 0.5s";

            // show press name
            console.log(1);
        });

        item.addEventListener("mouseleave", (e) => {
            // 3d rotate back
            item.style.transform = "rotateX(0deg)";
            item.style.transition = "transform 0.5s";
            console.log(2);
        });
    });
    console.log("호출");
}

function initPress() {
    const promise_data = fetchPressData();

    promise_data.then((data) => {
        show_options.press_data = data;
        renderGridPress(data, 0);
    });
}

export { initPress, renderGridPress };
