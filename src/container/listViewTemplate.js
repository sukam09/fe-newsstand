import * as elem from "../utils/createElement.js";
import { ICON_LEFT_ARROW_BTN_URL, ICON_RIGHT_ARROW_BTN_URL } from "../utils/iconURL.js";
import { createSubscribeBtn } from "../components/common/subscribeBtn.js";
import { news_category } from "../../data/newsCategory.js";
import { CATEGORY_SIZE, CATEGORY_COUNT_ARR } from "../utils/constant.js";

// 좌우 화살표 생성
function createArrowBtn(direction) {
    const btn = elem.createBtn({ className: "list_view_btn-" + direction + " btn-arrow" });
    const img = elem.createImg({
        className: "arrow",
        src: direction === "right" ? ICON_RIGHT_ARROW_BTN_URL : ICON_LEFT_ARROW_BTN_URL,
    });

    return elem.createChild(btn, [img]);
}

function createCategoryBtn(category_name, category_size) {
    const list_view_btn = elem.createBtn({ className: "list-view-btn" });
    const tab_item = elem.createDiv({ className: "tab-item available-medium14", txt: category_name });
    const tab_item_clicked = elem.createDiv({ className: "tab-item-clicked" });
    const btn_tab_progress = elem.createDiv({ className: "btn-tab-progress" });
    btn_tab_progress.style.animationIterationCount = "infinite";

    const btn_tab_wrapper = elem.createDiv({ className: "btn-tab-wrapper" });
    const btn_tab_category = elem.createSpan({
        className: "btn-tab-category selected-bold14",
        txt: category_name,
    });
    const btn_tab_count = elem.createDiv({ className: "btn-tab-count" });
    const btn_tab_count_present = elem.createSpan({ className: "btn-tab-count-present display-bold12", txt: 1 });
    const btn_tab_count_division = elem.createSpan({ className: "btn-tab-count-divison display-bold12", txt: "/" });
    const btn_tab_count_entire = elem.createSpan({
        className: "btn-tab-count-entire display-bold12",
        txt: category_size,
    });
    elem.createChild(btn_tab_count, [btn_tab_count_present, btn_tab_count_division, btn_tab_count_entire]);
    elem.createChild(btn_tab_wrapper, [btn_tab_category, btn_tab_count]);
    elem.createChild(tab_item_clicked, [btn_tab_wrapper, btn_tab_progress]);

    return elem.createChild(list_view_btn, [tab_item, tab_item_clicked]);
}

// 뉴스 탭 생성
function createNewsNav() {
    const container = elem.createNav({ className: "list-view-tab" });
    news_category.forEach((category_data, idx) => {
        elem.createChild(container, [createCategoryBtn(category_data, CATEGORY_COUNT_ARR[idx])]);
    });
    return container;
}

// 언론사 정보 생성
function createPressInfo(press_src, press_edit_date) {
    const container = elem.createDiv({ className: "list-view-press-info" });
    const img = elem.createImg({ className: "press_img", src: press_src, alt: "press-logo" });
    const edit_date = elem.createSpan({ className: "edit_date display-medium12", txt: press_edit_date });
    const subscribe_btn = createSubscribeBtn();

    return elem.createChild(container, [img, edit_date, subscribe_btn]);
}

// 서브 뉴스 생성
function createSubNews(press, sub_news) {
    const container = elem.createDiv({ className: "list-view-news-sub" });
    const sub_news_list = elem.createUl({});

    sub_news.forEach((news_data) => {
        elem.createChild(sub_news_list, [
            elem.createChild(elem.createLi({ className: "news-sub-item" }), [
                elem.createA({
                    className: "news-sub-item-url available-medium16",
                    url: news_data.url,
                    txt: news_data.title,
                }),
            ]),
        ]);
    });

    const editor = elem.createSpan({
        className: "display-medium14",
        txt: press + " 언론사에서 직접 편집한 뉴스입니다.",
    });

    return elem.createChild(container, [sub_news_list, editor]);
}

// 메인 뉴스 생성
function createMainNews(thumbnail, main_news) {
    const container = elem.createDiv({ className: "list-view-news-main" });
    const container_thumbnail = elem.createDiv("main-thumbnail");
    const img = elem.createImg({ className: "img-main-thumbnail", src: thumbnail, alt: "img-thumbnail" });
    // const title = elem.createDiv({ className: "available-medium16", txt: main_news.title });
    const title = elem.createA({
        className: "title-main-news available-medium16",
        url: main_news.url,
        txt: main_news.title,
    });

    return elem.createChild(container, [elem.createChild(container_thumbnail, [img]), title]);
}

// 리스트 뷰 삭제
async function removeNewsList() {
    document.querySelector(".list-view-press-news").remove();
}

// 언론사 뉴스 삭제 후 다시 렌더
export function renderPressNews(news_category_press) {
    const container = document.querySelector(".main-list-view-news-list");
    removeNewsList().then(() => {
        elem.createChild(container, [createPressNews(news_category_press)]);
    });
}

// 언론사 뉴스 생성
export function createPressNews(news_category_press) {
    const container = elem.createDiv({ className: "list-view-press-news" });
    const news_content = elem.createDiv({ className: "list-view-news" });

    return elem.createChild(container, [
        createPressInfo(news_category_press.press_light_src, news_category_press.edit_date),
        elem.createChild(news_content, [
            createMainNews(news_category_press.main_news_thumbnail, news_category_press.main_news),
            createSubNews(news_category_press.press, news_category_press.sub_news),
        ]),
    ]);
}

// 화살표 제외한 리스트 뷰 생성
function createListViewMain(news_category_press) {
    const container = elem.createDiv({ className: "main-list-view-news-list" });
    return elem.createChild(container, [createNewsNav(), createPressNews(news_category_press)]);
}

// 리스트 뷰 뉴스 생성
export function createListView(news_category_press) {
    const container = document.querySelector(".main-list-view");
    elem.createChild(container, [
        createArrowBtn("left"),
        createListViewMain(news_category_press),
        createArrowBtn("right"),
    ]);
}
