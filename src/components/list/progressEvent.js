import { SET_TIME } from "../../utils/constant.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { CATEGORY_SIZE, CATEGORY_COUNT_ARR, START_PRESS_NUM } from "../../utils/constant.js";
import { renderPressNews } from "../../container/listViewTemplate.js";

const progress_bar_info = {
    interval: 0,
    category_now: 0,
    category_old: 0,
    press_num: [0, 0, 0, 0, 0, 0, 0],
};

// interval 초기화
function initInterval() {
    progress_bar_info.interval = setInterval(() => {}, SET_TIME);
}

// interval 제거
export function removeInterval() {
    clearInterval(progress_bar_info.interval);
}

// interval 생성
function createInterval() {
    progress_bar_info.interval = window.setInterval(() => {
        // 새로 페이지 넘겨줌 // 페이지 번호 변경  // 리스트뷰 생성
        changePage().then(() => {
            changeCategoryTab();
            const category_now = progress_bar_info.category_now;
            renderPressNews(list_news_data[category_now].news[progress_bar_info.press_num[category_now]]);
        });
    }, SET_TIME);
}

// progress_bar_info 초기화
async function initProgressBarInfo() {
    progress_bar_info.category_now = 0;
    progress_bar_info.category_old = 0;
    progress_bar_info.press_num = [0, 0, 0, 0, 0, 0, 0];
    createInterval();
}

// 프로그래스바 바꿈
export function changeCategoryTab() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");

    const old_tab_item = list_view_btn[progress_bar_info.category_old].querySelector(".tab-item");
    const old_btn_tab_item = list_view_btn[progress_bar_info.category_old].querySelector(".tab-item-clicked");
    const new_tab_item = list_view_btn[progress_bar_info.category_now].querySelector(".tab-item");
    const new_btn_tab_item = list_view_btn[progress_bar_info.category_old].querySelector(".tab-item-clicked");

    old_tab_item.style.display = "flex";
    old_btn_tab_item.style.display = "none";

    new_tab_item.style.display = "none";
    new_btn_tab_item.style.display = "flex";
}

// 프로그래스바 초기화
export function initCategoryTab() {
    initProgressBarInfo().then(() => {
        updatePage().then(() => {
            const category_now = progress_bar_info.category_now;
            renderPressNews(list_news_data[category_now].news[progress_bar_info.press_num[category_now]]);
        });
        changeCategoryTab();
    });
}

async function updatePage() {
    const category_now = progress_bar_info.category_now;
    const nowBtn = document.querySelectorAll(".list-view-btn")[category_now];
    const count_present = nowBtn.querySelector(".btn-tab-count-present");
    count_present.innerHTML = progress_bar_info.press_num[category_now] + 1;
}

// page_num 변경
async function changePageNum(new_idx) {
    progress_bar_info.category_old = progress_bar_info.category_now;
    progress_bar_info.category_now = new_idx;
    updatePage();
}

// 페이지 넘김
export async function changePage() {
    const category_now = progress_bar_info.category_now;

    if (
        // 현재 카테고리에 있는 언론사 다 보여줌
        progress_bar_info.press_num[category_now] ===
        CATEGORY_COUNT_ARR[category_now] - 1
    ) {
        const nextPage = category_now !== CATEGORY_SIZE - 1 ? category_now + 1 : 0;
        changePageNum(nextPage);
    } else {
        // 현재 카테고리 있는 언론사+1
        const nowBtn = document.querySelectorAll(".list-view-btn")[category_now];
        const count_present = nowBtn.querySelector(".btn-tab-count-present");
        count_present.innerHTML = progress_bar_info.press_num[category_now] + 2;
        progress_bar_info.press_num[category_now] += 1;
    }
}
