import * as element from "./common.js";
import { list_news_data } from "../data/list_news_data.js";

const SET_TIME = 20000;
let progressIdx = 0,
    oldProgressIdx = 0;

let pageArr = [1, 1, 1, 1, 1, 1, 1];
let interval;

function changeProgressBar() {
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
        changeProgressBar();
        interval = window.setInterval(() => {
            console.log("test");
            changePage();
        }, SET_TIME);
    });
}

export async function clearProgressBar() {
    clearInterval(interval);
}

function changePage() {
    if (pageArr[progressIdx] === list_news_data[progressIdx].news.length) {
        let nextPage;
        if (progressIdx !== list_news_data.length - 1) {
            nextPage = progressIdx + 1;
        } else {
            nextPage = 0;
        }

        changeProgressIdx(nextPage).then(() => {
            changeProgressBar();
            interval = window.setInterval(() => {
                changePage();
            }, SET_TIME);
        });
    } else {
        const nowBtn = document.querySelectorAll(".list-view-btn")[progressIdx];
        const count_present = nowBtn.querySelector(".btn-tab-count-present");
        count_present.innerHTML = pageArr[progressIdx] + 1;
        pageArr[progressIdx] += 1;
    }
}

function clickProgressBar() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");
    list_view_btn.forEach((elem, idx) => {
        elem.addEventListener("click", () => {
            changeProgressIdx(idx).then(() => {
                changeProgressBar();
                interval = window.setInterval(() => {
                    changePage();
                }, SET_TIME);
            });
        });
    });
}

export function rederProgressBtn() {
    // initProgressBar();
    clickProgressBar();
    // timeProgressBar();
}
