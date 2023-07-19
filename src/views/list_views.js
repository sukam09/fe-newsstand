import { list_option, grid_option, view_option } from "../globals.js";
import { ASSETS_IMAGE_PATH, CATEGORIES } from "../constants.js";
import { isSubscribed } from "../utils.js";

function renderListView(data, category, page) {
    const list_news_container = document.querySelector(".main_news_container");
    list_news_container.innerHTML = "";
    const main_content = document.createElement("div");
    main_content.classList.add("main_content");

    // 임시
    clearInterval(list_option.interval);
    list_option.progress_time = 0;

    createNewsNav(list_news_container, data[CATEGORIES[category]], page + 1);
    createNewsHeader(main_content, data[CATEGORIES[category]], page);
    createMainContents(main_content, data[CATEGORIES[category]], page);

    list_news_container.appendChild(main_content);
}

function renderNewsItem(mode) {
    const content_press = document.querySelector(".content_press");

    content_press.src = `${ASSETS_IMAGE_PATH}${mode}${content_press.alt}`;
}

function createNewsNav(container, data, page) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");
    const ul = document.createElement("ul");

    CATEGORIES.forEach((item) => {
        if (item === CATEGORIES[list_option.category]) {
            ul.innerHTML += `<li class="main_nav_title">
            <progress class="main_nav_progress"
                value="${list_option.progress_time}"
                min="0"
                max="${list_option.progress_max}"></progress>
            <span>${CATEGORIES[list_option.category]}</span>
            <span class="progress_cnt">${page} / <b>${
                data.length
            }</b></span></li>`;
        } else {
            ul.innerHTML += `<li class="main_nav_item">${item}</li>`;
        }
    });
    nav.appendChild(ul);
    container.appendChild(nav);
}

function createNewsHeader(parent, data, page) {
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
            subscribe
                ? `<button class="content_subscribe_cancel">
                <img src="./assets/icons/symbol.png" />
                </button>`
                : `<button class="content_subscribe">
                    <img src="./assets/icons/plus.png" />
                    <span>구독하기</span>
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
    li.innerHTML = `<span>${data[page].press_name}에서 직접 편집한 뉴스입니다.</span>`;
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
