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
let current = 50;
let max = 100;

function rendListNews() {
    const news_data_container = document.querySelector(".main_news_container");

    createMainNav(news_data_container);
}

function createMainNav(container) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");

    const div = document.createElement("div");
    div.classList.add("main_nav_title");
    div.innerHTML = `
    <progress
        value="50"
        min="0"
        max="100"></progress>
    <span>${currentCategory}</span>
    <span>${current}/${max}</span>
  `;

    const ul = document.createElement("ul");
    category.forEach((item) => {
        if (item !== currentCategory) {
            ul.innerHTML += `<li class="main_nav_item">${item}</li>`;
        }
    });

    nav.appendChild(div);
    nav.appendChild(ul);
    container.appendChild(nav);
}

function setProgress() {}

export { rendListNews };
