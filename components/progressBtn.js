import * as element from "./common.js";

let isProgressBar = false;

async function changeProgress() {
    isProgressBar = !isProgressBar;
}

function clickProgressBtn() {
    const list_view_btn = document.querySelector(".list-view-btn");
    const tab_item = list_view_btn.querySelector(".tab-item");
    const btn_tab_item = list_view_btn.querySelector(".btn-tab-item");

    list_view_btn.addEventListener("click", () => {
        changeProgress().then(() => {
            if (isProgressBar) {
                tab_item.style.display = "none";
                btn_tab_item.style.display = "flex";
            } else {
                tab_item.style.display = "flex";
                btn_tab_item.style.display = "none";
            }
        });
    });
}

export function rederProgressBtn() {
    clickProgressBtn();
}
