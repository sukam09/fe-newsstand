import {
    COL_SIZE,
    ROW_SIZE,
    ASSETS_IMAGE_PATH,
    MAX_PAGE,
    SUBSCRIBE_TEXT,
    UNSUBSCRIBE_TEXT,
} from "../constants.js";
import { view_option } from "../store.js";
import { isSubscribed } from "../utils/data_util.js";

function renderGridView(options, data, page, toggleArrow) {
    switch (options["target"]) {
        case "all":
            const grid_press_container = document.querySelector(
                ".main_news_container"
            );
            grid_press_container.innerHTML = "";
            createPressList(grid_press_container, data, page * 24);
            toggleArrow(options["press"], page, MAX_PAGE);
            break;
        case "sub":
            renderSubscribe(data, data.value);
            break;
        default:
            break;
    }
}

function createPressList(container, data, idx) {
    for (let i = 0; i < COL_SIZE; i++) {
        let ul = document.createElement("ul");
        for (let j = 0; j < ROW_SIZE; j++) {
            const item = data[idx] || { name: "empty", url: "" };
            const subscribe = isSubscribed(item.name);

            ul.innerHTML += `
            <li class="press_data_container">
                ${
                    item.name === "empty"
                        ? ``
                        : `
                <div class="press_data_item">
                    <img class="press_item press_data_img press_front" src="${ASSETS_IMAGE_PATH}${
                              view_option.mode
                          }${item.url}" alt="${item.url}"/>
                    <button class="press_item content_subscribe content_subscribe_active press_back" name="${
                        item.name
                    }" value="${subscribe}">
                    ${
                        subscribe === "true"
                            ? `<img src="./assets/icons/symbol.png" />
                            <span>${UNSUBSCRIBE_TEXT}</span>`
                            : `<img src="./assets/icons/plus.png" />
                            <span>${SUBSCRIBE_TEXT}</span>`
                    }
                    </button>
                </div>`
                }
            </li>
            `;
            idx += 1;
        }
        container.appendChild(ul);
    }
}

function renderPressItem(mode) {
    const press_items = document.querySelectorAll(".press_data_img");

    press_items.forEach((item) => {
        item.src = `${ASSETS_IMAGE_PATH}${mode}${item.alt}`;
    });
}

function renderSubscribe(press, is_subscribe) {
    if (is_subscribe === "false") {
        press.value = "true";
        press.innerHTML = `
        <img src="./assets/icons/symbol.png" />
        <span>${UNSUBSCRIBE_TEXT}</span>
        `;
    } else {
        press.value = "false";
        press.innerHTML = `
        <img src="./assets/icons/plus.png" />
        <span>${SUBSCRIBE_TEXT}</span>
        `;
    }
}

export { renderGridView, renderSubscribe, renderPressItem };
