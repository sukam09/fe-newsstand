import {
    list_option,
    grid_option,
    view_option,
    subscribe_option,
} from "../store.js";
import {
    ASSETS_IMAGE_PATH,
    CATEGORIES,
    PROGRESS_MAX,
    SUBSCRIBE_TEXT,
    FROM_TO_TEXT,
} from "../constants.js";
import { isSubscribed } from "../utils/data_util.js";

function renderListView(options, data, category, page) {
    const list_news_container = document.querySelector(".main_news_container");

    const main_content = document.createElement("div");
    const new_categories =
        options.press === "all"
            ? CATEGORIES
            : subscribe_option.subscribe_categories;
    const new_page =
        options.press === "all" ? page : list_option.subscribe_page;
    let new_current =
        options.press === "all"
            ? list_option.category
            : subscribe_option.subscribe_current;
    if (new_categories[new_current] === undefined) {
        new_current = 0;
    }
    const new_data =
        data === undefined ? undefined : data[new_categories[new_current]];

    switch (options.target) {
        case "all":
            if (data === undefined || Object.keys(data).length === 0) {
                main_content.classList.add("main_content");
                main_content.innerHTML = `<p class="error_message">구독한 언론사가 없습니다.</p>
                `;
                list_news_container.appendChild(main_content);
                return;
            }

            list_news_container.innerHTML = "";
            main_content.classList.add("main_content");
            clearInterval(list_option.interval);
            list_option.progress_time = 0;
            createNewsNav(
                list_news_container,
                new_data,
                new_page + 1,
                new_categories,
                new_current
            );
            createNewsHeader(main_content, new_data, new_page);
            createMainContents(main_content, new_data, new_page);
            break;
        case "sub":
            renderSubscribeButton();
            break;
        default:
            break;
    }

    list_news_container.appendChild(main_content);
}

function renderNewsItem(mode) {
    const content_press = document.querySelector(".content_press");
    if (content_press === null) return;

    content_press.src = `${ASSETS_IMAGE_PATH}${mode}${content_press.alt}`;
}

function renderSubscribeButton() {
    const subscribe_toggle = document.querySelector(".content_header button");

    if (subscribe_toggle.value === "false") {
        subscribe_toggle.classList.add("content_subscribe_cancel");
        subscribe_toggle.classList.remove("content_subscribe_active");
        subscribe_toggle.value = "true";
        subscribe_toggle.innerHTML = `<img src="./assets/icons/symbol.png" />`;
    } else {
        subscribe_toggle.classList.add("content_subscribe_active");
        subscribe_toggle.classList.remove("content_subscribe_cancel");
        subscribe_toggle.value = "false";
        subscribe_toggle.innerHTML = `<img src="./assets/icons/plus.png" />
        <span>${SUBSCRIBE_TEXT}</span>`;
    }
}

function createNewsNav(container, data, page, category, current) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");
    const ul = document.createElement("ul");

    category.forEach((item) => {
        if (item === category[current]) {
            ul.innerHTML += `<li class="main_nav_title">
            <progress class="main_nav_progress"
                value="${list_option.progress_time}"
                min="0"
                max="${PROGRESS_MAX}"></progress>
            <span>${category[current]}</span>
            ${
                data.length > 1
                    ? `<span class="progress_cnt">
                    ${page} / <b>${data.length}</b>
                </span>`
                    : `<span class="progress_cnt"> > </span>`
            }
            </li>`;
        } else {
            ul.innerHTML += `<li class="main_nav_item">${item}</li>`;
        }
    });
    nav.appendChild(ul);
    container.appendChild(nav);
}

function createNewsHeader(parent, data, page, current) {
    const container = document.createElement("div");
    container.classList.add("content_header");
    let press_url = 0;
    grid_option.press_data.forEach((item) => {
        if (item.name === data[page].press_name) {
            press_url = item.url;
        }
    });

    const subscribe = isSubscribed(data[page].press_name);
    container.innerHTML = `
        <img src="${ASSETS_IMAGE_PATH}${view_option.mode}${press_url}"
        class="content_press" alt="${press_url}"/>
        <p class="content_edit">${data[page].last_edit} 편집</p>
        ${
            subscribe === "true"
                ? `<button class="content_subscribe content_subscribe_cancel"
                name="${data[page].press_name}" value="${subscribe}">
                <img src="./assets/icons/symbol.png" />
                </button>`
                : `<button class="content_subscribe content_subscribe_active"
                name="${data[page].press_name}" value="${subscribe}">
                    <img src="./assets/icons/plus.png" />
                    <span>${SUBSCRIBE_TEXT}</span>
                    </button>`
        }
        `;

    parent.appendChild(container);
}

function createMainContents(parent, data, page) {
    const container = document.createElement("div");
    container.classList.add("content_body");

    const ul = document.createElement("ul");
    ul.classList.add("content_body_contents");

    data[page].contents.forEach((item) => {
        ul.innerHTML += `
            <li class="content_body_contents_item"><span>${item}</span></li>
            `;
    });

    const li = document.createElement("li");
    li.classList.add("content_body_contents_item", "contents_press");
    li.innerHTML = `<span>${data[page].press_name}${FROM_TO_TEXT}</span>`;
    ul.appendChild(li);
    const list_news = ul.outerHTML;

    container.innerHTML = `
        <div class="content_body_title">
            <div class="content_picture_container">
                <img src="${data[page].main_url}" class="content_picture" />
            </div>
            <p class="content_title">${data[page].main_title}</p>
        </div>
        ${list_news}`;

    parent.appendChild(container);
}

export { renderListView, createNewsHeader, renderNewsItem };
