import { view_option } from "../globals.js";
import { fetchNewsData } from "../utils.js";
import { movePage } from "../events.js";

function renderListNews(data, category, page) {
    const news_data_container = document.querySelector(".main_news_container");
    news_data_container.innerHTML = "";

    // 임시
    clearInterval(view_option.interval);
    view_option.progress_time = 0;

    createMainNav(
        news_data_container,
        data[view_option.categorys[category]],
        page + 1
    );
    setProgress();
    createMainContent(
        news_data_container,
        data[view_option.categorys[category]],
        page
    );
    changeCategory(data);
}

function createMainNav(container, data, page) {
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

function createMainContent(container, data, page) {
    const main_content = document.createElement("div");
    main_content.classList.add("main_content");

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

    main_content.innerHTML = `
    <div class="content_header">
        <img src="${data[page].press_url}" class="content_press" />
        <p class="content_edit">${data[page].last_edit} 편집</p>
        <button class="content_subscribe">
            <img src="./assets/icons/plus.png" />
            <span>구독하기</span>
        </button>
    </div>
    <div class="content_body">
        <div class="content_body_title">
            <img src="${data[page].main_url}" class="content_picture" />
            <p class="content_title">${data[page].main_title}</p>
        </div>
        ${list_news}
    </div>`;

    container.appendChild(main_content);
}

function changeCategory(data) {
    const main_nav_item = document.querySelectorAll(".main_nav_item");

    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            view_option.category = view_option.categorys.indexOf(
                item.innerText
            );
            renderListNews(data, view_option.category, 0);
            view_option.list_current_page = 0;
        });
    });
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

export { initNews, renderListNews };
