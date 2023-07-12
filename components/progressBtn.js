import * as element from "./common.js";

let progressIdx = 0,
    oldProgressIdx = 0;

async function changeProgressIdx(idx) {
    oldProgressIdx = progressIdx;
    progressIdx = idx;
}

function initProgressBar() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");
    const tab_item = list_view_btn[0].querySelector(".tab-item");
    const btn_tab_item = list_view_btn[0].querySelector(".btn-tab-item");

    tab_item.style.display = "none";
    btn_tab_item.style.display = "flex";
}

function clickProgressBar() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");
    list_view_btn.forEach((elem, idx) => {
        elem.addEventListener("click", () => {
            changeProgressIdx(idx).then(() => {
                const old_tab_item = list_view_btn[oldProgressIdx].querySelector(".tab-item");
                const old_btn_tab_item = list_view_btn[oldProgressIdx].querySelector(".btn-tab-item");
                const new_tab_item = list_view_btn[progressIdx].querySelector(".tab-item");
                const new_btn_tab_item = list_view_btn[progressIdx].querySelector(".btn-tab-item");

                old_tab_item.style.display = "flex";
                old_btn_tab_item.style.display = "none";

                new_tab_item.style.display = "none";
                new_btn_tab_item.style.display = "flex";
            });
        });
    });
}

export function rederProgressBtn() {
    initProgressBar();
    clickProgressBar();
}
