import { fetchNewsData } from "../utils.js";
import { show_options } from "../events.js";

let count = 40;

function renderListNews(data, category, page) {
    console.log(data, category, page);
    const news_data_container = document.querySelector(".main_news_container");
    news_data_container.innerHTML = "";

    createMainNav(news_data_container, page + 1, data[category]);
    createMainContent(news_data_container, data[category], page);
    changeCategory(data);
}

function createMainNav(container, page, data) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");
    const ul = document.createElement("ul");

    show_options.categorys.forEach((item) => {
        if (item === show_options.category) {
            ul.innerHTML += `<li class="main_nav_title">
            <progress
                value="${count}"
                min="0"
                max="100"></progress>
            <span>${show_options.category}</span>
            <span class="progress_cnt">${page} / <b>${data.length}</b></span></li>`;
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
        <img src="./assets/icons/subscribe_btn.png" class="content_subscribe" />
    </div>
    <div class="content_body">
        <div class="content_body_title">
            <img src="${data[page].main_url}" class="content_picture" />
            <p class="content_title">또 국민연금의 몽니…현대百 지주사 불발</p>
        </div>
        ${list_news}
    </div>`;

    container.appendChild(main_content);
}

function changeCategory(data) {
    const main_nav_item = document.querySelectorAll(".main_nav_item");
    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            show_options.category = item.innerText;
            renderListNews(data, show_options.category, 0);
        });
    });
    show_options.list_current_page = 0;
}

function initNews() {
    const promise_data = fetchNewsData();

    promise_data.then((data) => {
        // category 별로 분류하여 show_options.news_data에 저장
        show_options.categorys.forEach((item) => {
            show_options.news_data[item] = data.filter(
                (news) => news.category === item
            );
        });
    });
}

function setProgress() {}

export { initNews, renderListNews };
