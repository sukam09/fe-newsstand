const category = [
    "종합/경제",
    "방송/통신",
    "IT",
    "영자지",
    "스포츠/연예",
    "매거진/전문지",
    "지역",
];

let currentCategory = "영자지";
let current = 50;
let max = 100;

function rendListNews() {
    const news_data_container = document.querySelector(".main_news_container");

    news_data_container.innerHTML = "";
    createMainNav(news_data_container);
    createMainContent(news_data_container);
    changeCategory();
}

function createMainNav(container) {
    const nav = document.createElement("nav");
    nav.classList.add("main_nav");
    const ul = document.createElement("ul");

    category.forEach((item) => {
        if (item === currentCategory) {
            ul.innerHTML += `<li class="main_nav_title">
            <progress
                value="50"
                min="0"
                max="100"></progress>
            <span>${currentCategory}</span>
            <span>${current}/${max}</span></li>`;
        } else {
            ul.innerHTML += `<li class="main_nav_item">${item}</li>`;
        }
    });
    nav.appendChild(ul);
    container.appendChild(nav);
}

function changeCategory() {
    const main_nav_item = document.querySelectorAll(".main_nav_item");
    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            currentCategory = item.innerText;
            console.log(currentCategory);
            rendListNews();
        });
    });
}

function createMainContent(container) {
    const main_content = document.createElement("div");
    main_content.classList.add("main_content");

    main_content.innerHTML = `
    <div class="content_header">
        <img src="./public/images/sbs.png" class="content_press" />
        <p class="content_edit">2023.07.11 09:09 편집</p>
        <img src="./public/icons/subscribe_btn.png" class="content_subscribe" />
    </div>
    <div class="content_body">
        <div class="content_body_title">
            <img src=./public/pictures/Thumbnail.png class="content_picture" />
            <p class="content_title">또 국민연금의 몽니…현대百 지주사 불발</p>
        </div>
        <ul class="content_body_contents">
            <li class="content_body_contents_item">
            <span>"위스키 사려고 이틀 전부터 줄 섰어요"</span></li>
            <li class="content_body_contents_item">
            <span>'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까</span></li>
            <li class="content_body_contents_item">
            <span>사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다</span></li>
            <li class="content_body_contents_item">
            <span>[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"</span></li>
            <li class="content_body_contents_item">
            <span>태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]</span></li>
            <li class="content_body_contents_item">
            <span>LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”</span></li>
            <li class="content_body_contents_item contents_press"><span>서울 경제 언론사에서 직접 편집한 뉴스입니다.</span></li>
        </ul>
    </div>

    `;
    container.appendChild(main_content);
}

function initListNews() {
    rendListNews();
    changeCategory();
}

function setProgress() {}

export { initListNews, rendListNews };
