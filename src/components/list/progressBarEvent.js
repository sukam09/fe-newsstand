import { SET_TIME } from "../../utils/constant.js";
import { list_news_data } from "../../../data/list_news_data.js";
import { CATEGORY_SIZE, CATEGORY_COUNT_ARR } from "../../utils/constant.js";
import { renderPressNews } from "../../container/listViewTemplate.js";

const progress_bar_info = {
    interval: 0,
    category_old: 1,
    category_now: 1,
    page_num: 1,

    setValue: async function (category_old, category_now, page_num) {
        this.category_old = category_old;
        this.category_now = category_now;
        this.page_num = page_num;
    },
};

export function getCategoryNow() {
    return progress_bar_info.category_now;
}

// interval 초기화
export function removeInterval() {
    clearInterval(progress_bar_info.interval);
}

// interval 재시작
function startInterval() {
    progress_bar_info.interval = window.setInterval(() => {
        changePageNum(true).then(() => {
            renderPressNews(list_news_data[progress_bar_info.category_now - 1].news[progress_bar_info.page_num - 1]);
        });
    }, SET_TIME);
}

// 페이지 다음 앞으로 넘기기
async function changePageNum(isNext) {
    const category_now = progress_bar_info.category_now;
    const page_num = progress_bar_info.page_num;
    if (isNext) {
        // 다음 페이지로 이동
        if (CATEGORY_COUNT_ARR[category_now - 1] === page_num) {
            category_now === CATEGORY_SIZE
                ? progress_bar_info.setValue(category_now, 1, 1) // 마지막 페이지면 처음으로 돌아감
                : progress_bar_info.setValue(category_now, category_now + 1, 1);
        } else {
            progress_bar_info.page_num += 1;
        }
    } else {
        // 이전 페이지로 이동
        if (page_num === 1) {
            category_now === 1
                ? progress_bar_info.setValue(category_now, CATEGORY_SIZE, CATEGORY_COUNT_ARR[CATEGORY_SIZE - 1]) // 첫번째 페이지면 마지막으로 돌아감
                : progress_bar_info.setValue(category_now, category_now - 1, CATEGORY_COUNT_ARR[category_now - 2]);
        } else {
            progress_bar_info.page_num -= 1;
        }
    }

    await changeProgressBar();
}

// DOM 초기화
export function initProgressBar(category_old, category_now, page_num) {
    removeInterval();
    progress_bar_info.setValue(category_old, category_now, page_num).then(() => {
        changeProgressBar();
        renderPressNews(list_news_data[progress_bar_info.category_now - 1].news[progress_bar_info.page_num - 1]);
        startInterval();
    });
}

// DOM 변경 - progressbar 이동
function changeProgressBar() {
    const list_view_btn = document.querySelectorAll(".list-view-btn");

    const old_tab_item = list_view_btn[progress_bar_info.category_old - 1].querySelector(".tab-item");
    const old_btn_tab_item = list_view_btn[progress_bar_info.category_old - 1].querySelector(".tab-item-clicked");
    const new_tab_item = list_view_btn[progress_bar_info.category_now - 1].querySelector(".tab-item");
    const new_btn_tab_item = list_view_btn[progress_bar_info.category_now - 1].querySelector(".tab-item-clicked");

    old_tab_item.style.display = "flex";
    old_btn_tab_item.style.display = "none";

    new_tab_item.style.display = "none";
    new_btn_tab_item.style.display = "flex";
    new_btn_tab_item.querySelector(".btn-tab-count-present").innerHTML = progress_bar_info.page_num;
}

// DOM 변경 - progressbar 변경
async function resetProgressBar() {
    const category_now = getCategoryNow();
    const progress_list = document.querySelectorAll(".btn-tab-progress");
    progress_list[category_now - 1].classList.remove("btn-tab-progress");
    progress_list[category_now - 1].offsetWidth;
    progress_list[category_now - 1].classList.add("btn-tab-progress");
}

// 화살표 버튼 클릭
export function onClickArrowBtn(isRight) {
    removeInterval();
    changePageNum(isRight).then(() => {
        resetProgressBar();
        renderPressNews(list_news_data[progress_bar_info.category_now - 1].news[progress_bar_info.page_num - 1]);
        startInterval();
    });
}
