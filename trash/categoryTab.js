import { list_news_data } from "../data/list_news_data.js";
import * as elem from "./common.js";

function getCategoryBtn(category_data) {
    const list_view_btn = elem.createBtn("list-view-btn");
    // 클릭 안 했을 때
    const tab_item = elem.createDiv("tab-item available-medium14", category_data.category);

    // 클릭했을 때
    const tab_item_clicked = elem.createDiv("tab-item-clicked");
    const btn_tab_progress = elem.createDiv("btn-tab-progress");
    btn_tab_progress.style.animationIterationCount = "infinite";

    const btn_tab_wrapper = elem.createDiv("btn-tab-wrapper");
    const btn_tab_category = elem.createSpan("btn-tab-category selected-bold14", category_data.category);
    const btn_tab_count = elem.createDiv("btn-tab-count");

    const btn_tab_count_present = elem.createSpan("btn-tab-count-present display-bold12", 1);
    const btn_tab_count_division = elem.createSpan("btn-tab-count-divison display-bold12", "/");
    const btn_tab_count_entire = elem.createSpan("btn-tab-count-entire display-bold12", category_data.news.length);
    btn_tab_count.appendChild(btn_tab_count_present);
    btn_tab_count.appendChild(btn_tab_count_division);
    btn_tab_count.appendChild(btn_tab_count_entire);

    //
    btn_tab_wrapper.appendChild(btn_tab_category);
    btn_tab_wrapper.appendChild(btn_tab_count);

    tab_item_clicked.appendChild(btn_tab_wrapper);
    tab_item_clicked.appendChild(btn_tab_progress);

    list_view_btn.appendChild(tab_item);
    list_view_btn.appendChild(tab_item_clicked);

    return list_view_btn;
}

function getNavBar() {
    const list_view_tab = document.querySelector(".list-view-tab");

    list_news_data.forEach((category_data) => {
        list_view_tab.appendChild(getCategoryBtn(category_data));
    });
}

export function renderTab() {
    getNavBar();
}
