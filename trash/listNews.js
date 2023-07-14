import * as elem from "./common.js";

// module 다른 파일에 모아두기
function createSubscribeBtn() {
    const subscribe_btn = elem.createBtn("btn-subscribe");
    const subscribe_img = elem.createImg(
        "btn-subscribe-icon",
        "../styles/icons/plus_gray_default.svg",
        "plus-gray-default"
    );
    const subscribe_span = elem.createSpan("btn-subscribe-label available-medium12", "구독하기");

    elem.createChild(subscribe_btn, [subscribe_img, subscribe_span]);

    return subscribe_btn;
}

function getSubNews(sub_news_data) {
    const sub_news_ul = elem.createUl();

    sub_news_data.forEach((news_data) => {
        const news_sub_item = elem.createLi("news-sub-item");
        const news_sub_item_url = elem.createA("news-sub-item-url available-medium16", news_data.url, news_data.title);
        elem.createChild(news_sub_item, [news_sub_item_url]);
        elem.createChild(sub_news_ul, [news_sub_item]);
    });

    return sub_news_ul;
}

function getMainNews(press_news_items) {
    const list_view_news_main = document.querySelector(".list-view-news-main");
    const main_thumbnail = elem.createDiv("main-thumbnail");
    const img_thumbnail = elem.createImg("img-main-thumbnail", press_news_items.main_news_thumbnail, "img-thumbnail");
    const title_thumbnail = elem.createDiv("available-medium16", press_news_items.main_news.title);

    elem.createChild(main_thumbnail, [img_thumbnail]);
    elem.createChild(list_view_news_main, [main_thumbnail, title_thumbnail]);
}

function getPressInfo(press_news_items) {
    const list_view_press_info = document.querySelector(".list-view-press-info");

    const press_img = elem.createImg("press_img", press_news_items.press_light_src, "press-logo");
    const edit_date = elem.createSpan("edit_date display-medium12", press_news_items.edit_date);
    const subscribe_btn = createSubscribeBtn();

    elem.createChild(list_view_press_info, [press_img, edit_date, subscribe_btn]);
}

function getListNews(press_news_items) {
    const list_view_news_sub = document.querySelector(".list-view-news-sub");

    const list_news = getSubNews(press_news_items.sub_news);
    const editor = elem.createSpan("display-medium14", press_news_items.press + " 언론사에서 직접 편집한 뉴스입니다.");

    elem.createChild(list_view_news_sub, [list_news, editor]);
}

async function createLayout() {
    const list_view_press_news = document.querySelector(".list-view-press-news");
    const list_view_press_info = elem.createDiv("list-view-press-info");

    const list_view_news = elem.createDiv("list-view-news");

    const list_view_main = elem.createDiv("list-view-news-main");
    const list_view_sub = elem.createDiv("list-view-news-sub");
    elem.createChild(list_view_news, [list_view_main, list_view_sub]);

    elem.createChild(list_view_press_news, [list_view_press_info, list_view_news]);
    // <div class="list-view-news"></div>;
    // <main class="main-list-view-news-list">
    // <div class="list-view-press-news"></div>
    //<div class="list-view-press-info"></div>
    // <div class="list-view-news-main"></div>
    //                             <div class="list-view-news-sub"></div>
}

export function renderListNews(press_news_items) {
    createLayout().then(() => {
        getPressInfo(press_news_items);
        getMainNews(press_news_items);
        getListNews(press_news_items);
    });
}
