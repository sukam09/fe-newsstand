import * as element from "./common.js";
import { list_news_data } from "../data/list_news_data.js";
import { renderListNews } from "./listNews.js";
import { hiddenListLeftBtn, hiddenListRightBtn } from "./listArrow.js";

const SET_TIME = 5000;
let progressIdx = 0,
    oldProgressIdx = 0;

let pageArr = [1, 1, 1, 1, 1, 1, 1];
let interval;

export function getPageNum() {
    return [progressIdx, pageArr[progressIdx]];
}

async function changeProgressBar() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");

    const old_tab_item = list_view_btn[oldProgressIdx].querySelector(".tab-item");
    const old_btn_tab_item = list_view_btn[oldProgressIdx].querySelector(".tab-item-clicked");
    const new_tab_item = list_view_btn[progressIdx].querySelector(".tab-item");
    const new_btn_tab_item = list_view_btn[progressIdx].querySelector(".tab-item-clicked");

    old_tab_item.style.display = "flex";
    old_btn_tab_item.style.display = "none";

    new_tab_item.style.display = "none";
    new_btn_tab_item.style.display = "flex";
}

async function initConst() {
    oldProgressIdx = progressIdx;
    progressIdx = 0;
    pageArr = [1, 1, 1, 1, 1, 1, 1];
    clearInterval(interval);
}

export async function initProgressBar() {
    initConst().then(() => {
        removeNewsList().then(() => {
            hiddenListLeftBtn(true);
            renderListNews(list_news_data[0].news[pageArr[0] - 1]);
        });
        changeProgressBar();
        createInterval();
    });
}

export async function clearProgressBar() {
    clearInterval(interval);
}

async function removeNewsList() {
    document.querySelector(".list-view-press-news").innerHTML = "";
}

export async function moveNextPage(isRight) {
    if (isRight) {
        changePage().then(() => {
            removeNewsList().then(() => {
                renderListNews(list_news_data[progressIdx].news[pageArr[progressIdx] - 1]);
            });
        });
    } else {
        changePageBefore().then(() => {
            removeNewsList().then(() => {
                renderListNews(list_news_data[progressIdx].news[pageArr[progressIdx] - 1]);
            });
        });
    }
}

async function changeProgressIdx(idx) {
    pageArr[progressIdx] = 1;

    const oldBtn = document.querySelectorAll(".list-view-btn")[progressIdx];
    const count_present = oldBtn.querySelector(".btn-tab-count-present");
    count_present.innerHTML = pageArr[progressIdx];

    oldProgressIdx = progressIdx;
    progressIdx = idx;

    if (progressIdx === 0 && pageArr[progressIdx] === 1) hiddenListLeftBtn(true);
    else {
        hiddenListLeftBtn(false);
    }

    if (
        progressIdx === list_news_data.length - 1 &&
        pageArr[list_news_data.length - 1] === list_news_data[progressIdx].news.length
    )
        hiddenListRightBtn(true);
    else hiddenListRightBtn(false);

    clearInterval(interval);
}

async function changePageBefore() {
    if (pageArr[progressIdx] === 1) {
        let beforePage;
        if (progressIdx !== 0) {
            beforePage = progressIdx - 1;
            pageArr[beforePage] = list_news_data[beforePage].news.length;
            const beforeBtn = document.querySelectorAll(".list-view-btn")[beforePage];
            const count_present = beforeBtn.querySelector(".btn-tab-count-present");
            count_present.innerHTML = pageArr[beforePage];
        } else {
            beforePage = 0;
        }

        changeProgressIdx(beforePage).then(() => {
            changeProgressBar();
            createInterval();
        });
    } else {
        const nowBtn = document.querySelectorAll(".list-view-btn")[progressIdx];
        const count_present = nowBtn.querySelector(".btn-tab-count-present");
        count_present.innerHTML = pageArr[progressIdx] - 1;
        pageArr[progressIdx] -= 1;
    }

    if (progressIdx === 0 && pageArr[progressIdx] === 1) hiddenListLeftBtn(true);
    else {
        hiddenListLeftBtn(false);
    }

    if (
        progressIdx === list_news_data.length - 1 &&
        pageArr[list_news_data.length - 1] === list_news_data[progressIdx].news.length
    )
        hiddenListRightBtn(true);
    else hiddenListRightBtn(false);
}

export async function changePage() {
    if (pageArr[progressIdx] === list_news_data[progressIdx].news.length) {
        let nextPage;
        if (progressIdx !== list_news_data.length - 1) {
            nextPage = progressIdx + 1;
        } else {
            nextPage = 0;
        }

        changeProgressIdx(nextPage).then(() => {
            changeProgressBar();
            createInterval();
        });
    } else {
        const nowBtn = document.querySelectorAll(".list-view-btn")[progressIdx];
        const count_present = nowBtn.querySelector(".btn-tab-count-present");
        count_present.innerHTML = pageArr[progressIdx] + 1;
        pageArr[progressIdx] += 1;
    }

    if (progressIdx === 0 && pageArr[progressIdx] === 1) hiddenListLeftBtn(true);
    else {
        hiddenListLeftBtn(false);
    }

    if (
        progressIdx === list_news_data.length - 1 &&
        pageArr[list_news_data.length - 1] === list_news_data[progressIdx].news.length
    )
        hiddenListRightBtn(true);
    else hiddenListRightBtn(false);
}

export function createInterval() {
    clearInterval(interval);
    interval = window.setInterval(() => {
        changePage().then(() => {
            removeNewsList().then(() => {
                renderListNews(list_news_data[progressIdx].news[pageArr[progressIdx] - 1]);
            });
        });
    }, SET_TIME);
}

function clickProgressBar() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");

    list_view_btn.forEach((elem, idx) => {
        elem.addEventListener("click", () => {
            changeProgressIdx(idx).then(() => {
                removeNewsList().then(() => {
                    changeProgressBar();
                    renderListNews(list_news_data[progressIdx].news[pageArr[progressIdx] - 1]);
                    createInterval();
                });
            });
        });
    });
}

export function rederProgressBtn() {
    clickProgressBar();
}
