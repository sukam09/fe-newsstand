import { moveNextPage, clearProgressBar, createInterval, getPageNum } from "./progressBtn.js";

export function hiddenListLeftBtn(isHidden) {
    const list_btn_left = document.querySelector(".list_view_btn-left");
    isHidden ? (list_btn_left.style.visibility = "hidden") : (list_btn_left.style.visibility = "visible");
}

export function hiddenListRightBtn(isHidden) {
    const list_btn_right = document.querySelector(".list_view_btn-right");
    isHidden ? (list_btn_right.style.visibility = "hidden") : (list_btn_right.style.visibility = "visible");
}

async function resetProgress(isRight) {
    const [progressIdx, pageNum] = getPageNum();
    const progress_list = document.querySelectorAll(".btn-tab-progress");
    progress_list[progressIdx].classList.remove("btn-tab-progress");
    progress_list[progressIdx].offsetWidth;
    progress_list[progressIdx].classList.add("btn-tab-progress");
    moveNextPage(isRight);
    clearProgressBar();
}

export function listArrowEvent() {
    const list_btn_left = document.querySelector(".list_view_btn-left");
    const list_btn_right = document.querySelector(".list_view_btn-right");

    list_btn_left.addEventListener("click", () => {
        resetProgress(false).then(createInterval);
    });
    list_btn_right.addEventListener("click", () => {
        resetProgress(true).then(() => {
            console.log("clicked");
            createInterval();
        });
    });
}
