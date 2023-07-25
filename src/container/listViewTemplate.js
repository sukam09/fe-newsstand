import { DOM } from "../utils/domClassName.js";
import { CATEGORY_COUNT_ARR, IMG_EXPAND, IMG_NORM, SNACK_BAR_TIME, NEWS_CATEGORY } from "../utils/constant.js";
import { create } from "../utils/createElement.js";
import { ICON_CHEVRON_RIGHT } from "../utils/iconURL.js";
import { init_news_data, list_news_data } from "../../data/list_news_data.js";
import { createSnackBar } from "../components/common/snackBar.js";
import { createAlert } from "../components/common/alertSubscribe.js";
import { onClickSubBtn } from "../components/layout/mainNavEvent.js";
import { _sub_press_list } from "../Store.js";
import { list_view_subscribe } from "../components/list/listObserverSub.js";
import { list_view_entire } from "../components/list/listObserverEntire.js";
import { buttonFacotry } from "../components/common/btnfactory.js";
import { dark_mode } from "../components/layout/darkModeEvent.js";
const btnFactory = new buttonFacotry();

// 언론사 탭 생성
function createPressBtn(press_name, idx) {
    const $list_view_btn = create.button({
        className: "list-view-btn",
        events: {
            click: () => {
                list_view_subscribe.initProgressBar({
                    category_old: list_view_subscribe.getCategoryNow(),
                    category_now: idx,
                });
            },
        },
    });
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

// 카테고리 탭 생성 > createPressBtn 함수랑 합치기
function createCategoryBtn(category_name, category_size, idx) {
    const $list_view_btn = create.button({
        className: "list-view-btn",
        events: {
            click: () =>
                list_view_entire.initProgressBar({
                    category_old: list_view_entire.getCategoryNow(),
                    category_now: idx,
                    page_num: 0,
                }),
        },
    });
    const $tab_item = create.div({
        className: "tab-item available-medium14",
        txt: category_name,
        events: {
            mouseover: () => {
                $tab_item.style.textDecoration = "underline";
            },
            mouseout: () => {
                $tab_item.style.textDecoration = "none";
            },
        },
    });

    const $tab_item_clicked = create.div({ className: "tab-item-clicked" });

    const $btn_tab_progress = create.div({ className: "btn-tab-progress" });
    const $btn_tab_wrapper = create.div({ className: "btn-tab-wrapper" });
    const $btn_tab_category = create.span({
        className: "btn-tab-category selected-bold14",
        txt: category_name,
    });
    const $btn_tab_count = create.div({ className: "btn-tab-count display-bold12" });
    $btn_tab_count.append(
        create.span({ className: "btn-tab-count-present", txt: 1 }),
        create.span({ className: "btn-tab-count-divison", txt: "/" }),
        create.span({
            className: "btn-tab-count-entire",
            txt: category_size,
        })
    );

    $btn_tab_wrapper.append($btn_tab_category, $btn_tab_count);
    $tab_item_clicked.append($btn_tab_wrapper, $btn_tab_progress);
    $list_view_btn.append($tab_item, $tab_item_clicked);

    return $list_view_btn;
}

// 뉴스 탭 생성
export function createNewsNav(subscribe_mode, state) {
    const $container = create.nav({ className: "list-view-tab" });
    if (subscribe_mode === DOM.LIST_SUBSCRIBE_VIEW) {
        state.forEach((news, idx) => {
            $container.appendChild(createPressBtn(news.press, idx));
        });
    } else {
        NEWS_CATEGORY.forEach((category_data, idx) => {
            $container.appendChild(createCategoryBtn(category_data, CATEGORY_COUNT_ARR[idx], idx));
        });
    }
    return $container;
}

function resetBtn($container, press_id) {
    $container.querySelector(".btn-subscribe").remove();
    $container.appendChild(
        btnFactory
            .create({
                type: "subscribe",
                isSubscribe: true,
                events: {
                    click: () => {
                        document.querySelector(".main-list-view-news-list").appendChild(createSnackBar());
                        setTimeout(() => {
                            document.querySelector(".snack-bar").remove();
                            onClickSubBtn(true, false);
                            _sub_press_list.addState(press_id);
                        }, SNACK_BAR_TIME);
                    },
                },
            })
            .getButton()
    );
}

function createPressInfoBtn($container, press_name, press_id, subscribe_mode, is_subscribe) {
    let $subscribe_btn;
    if (subscribe_mode === DOM.LIST_SUBSCRIBE_VIEW || is_subscribe) {
        $subscribe_btn = btnFactory
            .create({
                type: "closed",
                events: {
                    click: () => $container.appendChild(createAlert(press_name, press_id, $container, resetBtn)),
                },
            })
            .getButton();
    } else {
        $subscribe_btn = btnFactory
            .create({
                type: "subscribe",
                isSubscribe: true,
                events: {
                    click: () => {
                        document.querySelector(".main-list-view-news-list").appendChild(createSnackBar());
                        setTimeout(() => {
                            document.querySelector(".snack-bar").remove();
                            onClickSubBtn(true, false);
                            _sub_press_list.addState(press_id);
                        }, SNACK_BAR_TIME);
                    },
                },
            })
            .getButton();
    }
    return $subscribe_btn;
}

// 언론사 정보 생성
function createPressInfo(press_news, subscribe_mode, is_subscribe, isDark) {
    const $container = create.div({ className: "list-view-press-info" });
    if (!press_news.press_light_src) return $container;

    const $img = create.img({
        className: "press_img",
        attributes: { src: isDark ? press_news.press_dark_src : press_news.press_light_src, alt: "press-logo" },
    });
    const $edit_date = create.span({ className: "edit_date display-medium12", txt: press_news.edit_date });

    $container.append(
        $img,
        $edit_date,
        createPressInfoBtn($container, press_news.press, press_news.press_id, subscribe_mode, is_subscribe)
    );
    return $container;
}

// 서브 뉴스 생성
function createSubNews(press, sub_news) {
    const $container = create.div({ className: "list-view-news-sub" });
    if (!press) return $container;
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
        className: "editor display-medium14",
        txt: press + " 언론사에서 직접 편집한 뉴스입니다.",
    });

    $container.append($sub_news_list, $editor);
    return $container;
}

// 메인 뉴스 생성
function createMainNews(thumbnail, main_news) {
    const $container = create.div({ className: "list-view-news-main" });
    if (!thumbnail) return $container;

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
export function createPressNews(news_category_press, isInit, subscribe_mode, is_subscribe) {
    const $container = isInit
        ? create.div({ className: DOM.LIST_PRESS_NEWS })
        : document.querySelector(`.${subscribe_mode}`).querySelector(`.${DOM.LIST_PRESS_NEWS}`);

    const $news_content = create.div({ className: "list-view-news" });

    $news_content.append(
        createMainNews(news_category_press.main_news_thumbnail, news_category_press.main_news),
        createSubNews(news_category_press.press, news_category_press.sub_news)
    );
    $container.append(
        createPressInfo(news_category_press, subscribe_mode, is_subscribe, dark_mode.getMode()),
        $news_content
    );
    return $container;
}

// 언론사 뉴스 삭제 후 다시 렌더
export function renderPressNews(news_category_press, subscribe_mode, is_subscribe) {
    document.querySelector(`.${subscribe_mode}`).querySelector(`.${DOM.LIST_PRESS_NEWS}`).innerHTML = "";
    createPressNews(news_category_press, false, subscribe_mode, is_subscribe);
}

// 화살표 제외한 리스트 뷰 생성
export function createListViewMain(news_category_press, subscribe_mode, is_init, subscribe_list) {
    const $container = is_init
        ? create.div({ className: "main-list-view-news-list" })
        : document.querySelector(`.${subscribe_mode}`).querySelector(".main-list-view-news-list");
    $container.innerHTML = "";

    $container.append(
        createNewsNav(subscribe_mode, subscribe_list),
        createPressNews(news_category_press, true, subscribe_mode)
    );

    return $container;
}

function createListArrowBtn(btnFactory, is_right, subscribe_mode) {
    return btnFactory.create({
        type: "arrow",
        className: is_right ? `${DOM.LIST_RIGHT_BTN}-${subscribe_mode}` : `${DOM.LIST_LEFT_BTN}-${subscribe_mode}`,
        events:
            subscribe_mode === DOM.LIST_SUBSCRIBE_VIEW
                ? { click: () => list_view_subscribe.onClickArrowBtn(is_right) }
                : { click: () => list_view_entire.onClickArrowBtn(is_right) },
        isRight: is_right,
    });
}

// 리스트 뷰 뉴스 생성
function createListView(news_category_press, subscribe_mode) {
    const $container = document.querySelector(`.${subscribe_mode}`);

    $container.append(
        createListArrowBtn(btnFactory, false, subscribe_mode).getButton(),
        createListViewMain(news_category_press, subscribe_mode, true, []),
        createListArrowBtn(btnFactory, true, subscribe_mode).getButton()
    );
}

export function listView() {
    createListView(list_news_data[0].news[0], DOM.LIST_ENTIRE_VIEW);
    createListView(init_news_data, DOM.LIST_SUBSCRIBE_VIEW);
}
