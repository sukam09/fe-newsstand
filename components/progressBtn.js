import * as element from "./common.js";
import { list_news_data } from "../data/list_news_data.js";
import { renderListNews } from "./listNews.js";

const SET_TIME = 2000;
let progressIdx = 0,
    oldProgressIdx = 0;

let pageArr = [1, 1, 1, 1, 1, 1, 1];
let interval;

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

async function changeProgressIdx(idx) {
    pageArr[progressIdx] = 1;
    const oldBtn = document.querySelectorAll(".list-view-btn")[progressIdx];
    const count_present = oldBtn.querySelector(".btn-tab-count-present");
    count_present.innerHTML = pageArr[progressIdx];

    oldProgressIdx = progressIdx;
    progressIdx = idx;
    clearInterval(interval);
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

async function changePage() {
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
}

function createInterval() {
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
    // initProgressBar();
    clickProgressBar();
    // timeProgressBar();
}
