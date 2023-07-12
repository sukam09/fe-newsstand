import { initNewsPressData } from "./initNewsPressData.js";

let newsPressData = [];

const getArticleHead = (newsData) => {
    return `
        <div class="press-head-container">
            <img src=${newsData.logo} alt=${newsData.name} />
            <div class="edit-time display-medium12">
                2023.10.04. 11:22 편집
            </div>
            <button class="subscribe-button available-medium12">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z"
                        fill="#879298"
                    />
                </svg>
                <div>구독하기</div>
            </button>
        </div>
    `;
};

const getArticleMain = (newsData) => {
    return `
        <div class="articles-container available-medium16">
            <div class="main-article">
                <img src=${newsData.mainArticle.thumbnail} alt=${
        newsData.mainArticle.title
    } />
                <div class="main-title">
                    ${newsData.mainArticle.title}
                </div>
            </div>
            <div class="sub-articles">
                <ul>
                ${newsData.subArticles
                    .map((el) => `<li>${el.title}</li>`)
                    .join("")}
                </ul>
                <div class="press-description display-medium14">
                    ${newsData.name} 언론사에서 직접 편집한 뉴스입니다.
                </div>
            </div>
        </div>
    `;
};

const setListView = async () => {
    newsPressData = await initNewsPressData();
    const listViewMain = document.querySelector(".list-view-main-container");
    listViewMain.insertAdjacentHTML(
        "beforeend",
        getArticleHead(newsPressData[0])
    );
    listViewMain.insertAdjacentHTML(
        "beforeend",
        getArticleMain(newsPressData[0])
    );
};

export { setListView };
