import { view_option } from "../globals.js";
import { fetchNewsData } from "../utils.js";
import { movePage, changeCategoryEvent } from "../events.js";

function renderListView(data, category, page) {
    const list_news_container = document.querySelector(".main_news_container");
    list_news_container.innerHTML = "";
    const main_content = document.createElement("div");
    main_content.classList.add("main_content");

    // 임시
    clearInterval(view_option.interval);
    view_option.progress_time = 0;

    createNewsNav(
        list_news_container,
        data[view_option.categorys[category]],
        page + 1
    );
    createNewsHeader(main_content, data[view_option.categorys[category]], page);
    createMainContents(
        main_content,
        data[view_option.categorys[category]],
        page
    );

    list_news_container.appendChild(main_content);
    setProgress();
    changeCategoryEvent(data);
}

function createNewsNav(container, data, page) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");
    const ul = document.createElement("ul");

    view_option.categorys.forEach((item) => {
        if (item === view_option.categorys[view_option.category]) {
            ul.innerHTML += `<li class="main_nav_title">
            <progress class="main_nav_progress"
                value="${view_option.progress_time}"
                min="0"
                max="${view_option.progress_max}"></progress>
            <span>${view_option.categorys[view_option.category]}</span>
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

    container.innerHTML = `
        <img src="${data[page].press_url}" class="content_press" />
        <p class="content_edit">${data[page].last_edit} 편집</p>
        <button class="content_subscribe">
            <img src="./assets/icons/plus.png" />
            <span>구독하기</span>
        </button>`;

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
            <img src="${data[page].main_url}" class="content_picture" />
            <p class="content_title">${data[page].main_title}</p>
        </div>
        ${list_news}`;

    parent.appendChild(container);
}

function initNews() {
    const promise_data = fetchNewsData();

    promise_data.then((data) => {
        // category 별로 분류하여 view_option.news_data에 저장
        view_option.categorys.forEach((item) => {
            view_option.news_data[item] = data.filter(
                (news) => news.category === item
            );
        });
    });
}

function setProgress() {
    const progress = document.querySelector(".main_nav_progress");

    // clearInterval(view_option.interval);
    // view_option.progress_time = 0;

    // 1초마다 1씩 증가
    view_option.interval = setInterval(() => {
        view_option.progress_time += 1;
        if (view_option.progress_time === 21) {
            clearInterval(view_option.interval);
            view_option.progress_time = 0;
            movePage("next");
        }
        progress.value = view_option.progress_time;
    }, 1000);
}

export { initNews, renderListView };
