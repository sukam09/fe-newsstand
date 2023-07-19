import { news_category } from "../../data/newsCategory.js";
import { CATEGORY_COUNT_ARR, IMG_EXPAND, IMG_NORM } from "../utils/constant.js";
import { class_name } from "../utils/domClassName.js";
import { progress_bar_info } from "../components/list/progressBarEvent.js";
import { create } from "../utils/createElement.js";
import { buttonFacotry } from "../components/common/btnfactory.js";
import { subscribe_news_list } from "../../data/subscribeIdxList.js";
import { ICON_CHEVRON_RIGHT } from "../utils/iconURL.js";
import { list_news_data } from "../../data/list_news_data.js";
const btnFactory = new buttonFacotry();

function createPressBtn(press_name) {
    const $list_view_btn = create.button({ className: "list-view-btn" });
    const $tab_item = create.div({ className: "tab-item available-medium14", txt: press_name });
    const $tab_item_clicked = create.div({ className: "tab-item-clicked" });
    const $btn_tab_progress = create.div({ className: "btn-tab-progress" });
    const $btn_tab_wrapper = create.div({ className: "btn-tab-wrapper" });

    const $btn_tab_category = create.div({
        className: "btn-tab-category selected-bold14",
        txt: press_name,
    });
    const $tab_img = create.img({
        className: "chevron-right",
        attributes: { src: ICON_CHEVRON_RIGHT, alt: "icon-chevron-right" },
    });
    $btn_tab_wrapper.append($btn_tab_category, $tab_img);
    $tab_item_clicked.append($btn_tab_wrapper, $btn_tab_progress);
    $list_view_btn.append($tab_item, $tab_item_clicked);

    return $list_view_btn;
}

function createCategoryBtn(category_name, category_size, idx) {
    const $list_view_btn = create.button({
        className: "list-view-btn",
        events: {
            click: () =>
                progress_bar_info.initProgressBar({
                    category_old: progress_bar_info.getCategoryNow(),
                    category_now: idx + 1,
                    page_num: 1,
                }),
        },
    });
    const $tab_item = create.div({ className: "tab-item available-medium14", txt: category_name });
    const $tab_item_clicked = create.div({ className: "tab-item-clicked" });

    const $btn_tab_progress = create.div({ className: "btn-tab-progress" });
    const $btn_tab_wrapper = create.div({ className: "btn-tab-wrapper" });
    const $btn_tab_category = create.span({
        className: "btn-tab-category selected-bold14",
        txt: category_name,
    });
    const $btn_tab_count = create.div({ className: "btn-tab-count" });
    $btn_tab_count.append(
        create.span({ className: "btn-tab-count-present display-bold12", txt: 1 }),
        create.span({ className: "btn-tab-count-divison display-bold12", txt: "/" }),
        create.span({
            className: "btn-tab-count-entire display-bold12",
            txt: category_size,
        })
    );

    $btn_tab_wrapper.append($btn_tab_category, $btn_tab_count);
    $tab_item_clicked.append($btn_tab_wrapper, $btn_tab_progress);
    $list_view_btn.append($tab_item, $tab_item_clicked);

    return $list_view_btn;
}

// 뉴스 탭 생성
function createNewsNav(is_subscribe) {
    const $container = create.nav({ className: "list-view-tab" });
    if (is_subscribe === class_name.SUBSCRIBE) {
        subscribe_news_list.forEach((news, idx) => {
            $container.appendChild(createPressBtn(news.press));
        });
    } else {
        news_category.forEach((category_data, idx) => {
            $container.appendChild(createCategoryBtn(category_data, CATEGORY_COUNT_ARR[idx], idx));
        });
    }
    return $container;
}

// 언론사 정보 생성
function createPressInfo(press_src, press_edit_date, is_subscribe) {
    const $container = create.div({ className: "list-view-press-info" });
    const $img = create.img({ className: "press_img", attributes: { src: press_src, alt: "press-logo" } });
    const $edit_date = create.span({ className: "edit_date display-medium12", txt: press_edit_date });
    const $subscribe_btn =
        is_subscribe === class_name.SUBSCRIBE
            ? btnFactory.create({ type: "closed" }).getButton()
            : btnFactory.create({ type: "subscribe" }).getButton();

    $container.append($img, $edit_date, $subscribe_btn);
    return $container;
}

// 서브 뉴스 생성
function createSubNews(press, sub_news) {
    const $container = create.div({ className: "list-view-news-sub" });
    const $sub_news_list = create.ul({});

    sub_news.forEach((news_data) => {
        const $sub_item = create.li({ className: "news-sub-item" });
        $sub_item.appendChild(
            create.a({
                className: "news-sub-item-url available-medium16",
                txt: news_data.title,
                attributes: { href: news_data.url },
                events: {
                    mouseover: () => {
                        $sub_item.style.textDecoration = "underline";
                    },
                    mouseout: () => {
                        $sub_item.style.textDecoration = "none";
                    },
                },
            })
        );

        $sub_news_list.appendChild($sub_item);
    });

    const $editor = create.span({
        className: "display-medium14",
        txt: press + " 언론사에서 직접 편집한 뉴스입니다.",
    });

    $container.append($sub_news_list, $editor);
    return $container;
}

// 메인 뉴스 생성
function createMainNews(thumbnail, main_news) {
    const $container = create.div({ className: "list-view-news-main" });
    const $container_thumbnail = create.div({ className: "main-thumbnail" });
    const $img = create.img({ className: "img-main-thumbnail", attributes: { src: thumbnail, alt: "img-thumbnail" } });
    $container_thumbnail.appendChild($img);
    const $title = create.a({
        className: "title-main-news available-medium16",
        txt: main_news.title,
        attributes: { href: main_news.url },
    });

    $container.append($container_thumbnail, $title);
    $container.addEventListener("mouseover", () => {
        $container.querySelector(".img-main-thumbnail").style.transform = `scale(${IMG_EXPAND})`;
        $container.children[1].style.textDecoration = "underline";
    });
    $container.addEventListener("mouseout", () => {
        $container.querySelector(".img-main-thumbnail").style.transform = `scale(${IMG_NORM})`;
        $container.children[1].style.textDecoration = "none";
    });
    return $container;
}

// 언론사 뉴스 생성
function createPressNews(news_category_press, isInit, is_subscribe) {
    const $container = isInit
        ? create.div({ className: class_name.LIST_PRESS_NEWS })
        : document.querySelector(`.${class_name.LIST_PRESS_NEWS}`);

    const $news_content = create.div({ className: "list-view-news" });

    $news_content.append(
        createMainNews(news_category_press.main_news_thumbnail, news_category_press.main_news),
        createSubNews(news_category_press.press, news_category_press.sub_news)
    );
    $container.append(
        createPressInfo(news_category_press.press_light_src, news_category_press.edit_date, is_subscribe),
        $news_content
    );
    return $container;
}

// 언론사 뉴스 삭제 후 다시 렌더
export function renderPressNews(news_category_press, is_subscribe) {
    document.querySelector(`.${class_name.LIST_PRESS_NEWS}`).innerHTML = "";
    createPressNews(news_category_press, false, is_subscribe);
}

// 화살표 제외한 리스트 뷰 생성
function createListViewMain(news_category_press, is_subscribe) {
    const $container = create.div({ className: "main-list-view-news-list" });
    $container.append(createNewsNav(is_subscribe), createPressNews(news_category_press, true, is_subscribe));
    return $container;
}

function createListArrowBtn(btnFactory, is_right, is_subscribe) {
    return btnFactory.create({
        type: "arrow",
        className: is_right
            ? `${class_name.LIST_RIGHT_BTN}-${is_subscribe}`
            : `${class_name.LIST_LEFT_BTN}-${is_subscribe}`,
        events:
            is_subscribe === class_name.SUBSCRIBE
                ? {}
                : { click: progress_bar_info.onClickArrowBtn.bind({ is_right: is_right }) },
        isRight: is_right,
    });
}

// 리스트 뷰 뉴스 생성
function createListView(news_category_press, is_subscribe) {
    const $container = document.querySelector(`.list-${is_subscribe}`);

    $container.append(
        createListArrowBtn(btnFactory, false, is_subscribe).getButton(),
        createListViewMain(news_category_press, is_subscribe),
        createListArrowBtn(btnFactory, true, is_subscribe).getButton()
    );
}

export function listView() {
    createListView(list_news_data[0].news[0], class_name.ENTIRE);
    createListView(subscribe_news_list[0], class_name.SUBSCRIBE);
}
