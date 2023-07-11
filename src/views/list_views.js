import { fetchNewsData } from "../utils.js";

const category = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
];

let currentCategory = "종합/경제";
let list_current_page = 0;
let current = 10;
let count = 23;
let max = 100;

function rendListNews(data, category, page) {
    const news_data_container = document.querySelector(".main_news_container");

    // data.category = category search
    const filteredData = data.filter((item) => item.category === category);

    news_data_container.innerHTML = "";
    createMainNav(news_data_container);
    createMainContent(news_data_container, filteredData, 0);
    changeCategory(data);
}

function createMainNav(container) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");
    const ul = document.createElement("ul");

    category.forEach((item) => {
        if (item === currentCategory) {
            ul.innerHTML += `<li class="main_nav_title">
            <progress
                value="${count}"
                min="0"
                max="100"></progress>
            <span>${currentCategory}</span>
            <span>${current} / ${max}</span></li>`;
        } else {
            ul.innerHTML += `<li class="main_nav_item">${item}</li>`;
        }
    });
    nav.appendChild(ul);
    container.appendChild(nav);
}

function changeCategory(data) {
    const main_nav_item = document.querySelectorAll(".main_nav_item");
    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            currentCategory = item.innerText;
            rendListNews(data, currentCategory, 0);
        });
    });
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

function initListNews() {
    const promise_data = fetchNewsData();

    promise_data.then((data) => {
        rendListNews(data, currentCategory, 0);
    });
}

function setProgress() {}

export { initListNews, rendListNews };
