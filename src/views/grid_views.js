import { COL_SIZE, ROW_SIZE, ASSETS_IMAGE_PATH } from "../constants.js";
import { view_option } from "../globals.js";

function renderGridView(data, page, action) {
    const grid_press_container = document.querySelector(".main_news_container");
    grid_press_container.innerHTML = "";

    createPressList(grid_press_container, data, page * 24);

    action[0]("grid", page);
    action[1]();
}

function createPressList(container, data, idx) {
    for (let i = 0; i < COL_SIZE; i++) {
        let ul = document.createElement("ul");
        for (let j = 0; j < ROW_SIZE; j++) {
            const item = data[idx] || { name: "empty", url: "" };
            const subscribe =
                view_option.subscribe_press[item.name] === undefined
                    ? false
                    : view_option.subscribe_press[item.name];
            ul.innerHTML += `
            <li class="press_data_container">
                <div class="press_data_item">
                    <img class="press_item press_data_img press_front" src="${ASSETS_IMAGE_PATH}${
                view_option.mode
            }${item.url}" alt="${item.url}"/>
                    <button class="press_item content_subscribe press_back" name="${
                        item.name
                    }" is_subscribe="${subscribe}">
                    ${
                        subscribe
                            ? `<img src="./assets/icons/symbol.png" />`
                            : `<img src="./assets/icons/plus.png" />`
                    }
                    ${
                        subscribe
                            ? `<span>해지하기</span>`
                            : `<span>구독하기</span>`
                    }    
                    </button>
                </div>
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
    if (is_subscribe) {
        press.is_subscribe = false;
        press.innerHTML = `
        <img src="./assets/icons/plus.png" />
        <span>구독하기</span>
        `;
    } else {
        press.is_subscribe = true;
        press.innerHTML = `
        <img src="./assets/icons/symbol.png" />
        <span>해지하기</span>
        `;
    }
}

export { renderGridView, renderSubscribe, renderPressItem };
