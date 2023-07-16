import { news_category } from "../../data/newsCategory.js";
import { CATEGORY_COUNT_ARR } from "../utils/constant.js";
import { class_name } from "../utils/domClassName.js";
import { initProgressBar, getCategoryNow, onClickArrowBtn } from "../components/list/progressBarEvent.js";
import { create } from "../utils/createElement.js";
import { buttonFacotry } from "../components/common/btnfactory.js";
const btnFactory = new buttonFacotry();

function createCategoryBtn(category_name, category_size, idx) {
    const $list_view_btn = create.button({
        className: "list-view-btn",
        events: {
            click: () => initProgressBar(getCategoryNow(), idx + 1, 1),
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
function createNewsNav() {
    const $container = create.nav({ className: "list-view-tab" });
    news_category.forEach((category_data, idx) => {
        $container.appendChild(createCategoryBtn(category_data, CATEGORY_COUNT_ARR[idx], idx));
    });
    return $container;
}

// 언론사 정보 생성
function createPressInfo(press_src, press_edit_date) {
    const $container = create.div({ className: "list-view-press-info" });
    const $img = create.img({ className: "press_img", attributes: { src: press_src, alt: "press-logo" } });
    const $edit_date = create.span({ className: "edit_date display-medium12", txt: press_edit_date });
    const $subscribe_btn = btnFactory.create({ type: "subscribe" }).getButton();

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
    const $container_thumbnail = create.div("main-thumbnail");
    const $img = create.img({ className: "img-main-thumbnail", attributes: { src: thumbnail, alt: "img-thumbnail" } });
    const $title = create.a({
        className: "title-main-news available-medium16",
        txt: main_news.title,
        attributes: { href: main_news.url },
    });

    $container.append($container_thumbnail.appendChild($img), $title);
    return $container;
}

// 언론사 뉴스 생성
function createPressNews(news_category_press, isInit) {
    const $container = isInit
        ? create.div({ className: class_name.LIST_PRESS_NEWS })
        : document.querySelector(`.${class_name.LIST_PRESS_NEWS}`);

    const $news_content = create.div({ className: "list-view-news" });

    $news_content.append(
        createMainNews(news_category_press.main_news_thumbnail, news_category_press.main_news),
        createSubNews(news_category_press.press, news_category_press.sub_news)
    );
    $container.append(
        createPressInfo(news_category_press.press_light_src, news_category_press.edit_date),
        $news_content
    );
    return $container;
}

// 언론사 뉴스 삭제 후 다시 렌더
export function renderPressNews(news_category_press) {
    document.querySelector(`.${class_name.LIST_PRESS_NEWS}`).innerHTML = "";
    createPressNews(news_category_press, false);
}

// 화살표 제외한 리스트 뷰 생성
function createListViewMain(news_category_press) {
    const $container = create.div({ className: "main-list-view-news-list" });
    $container.append(createNewsNav(), createPressNews(news_category_press, true));
    return $container;
}

function createListArrowBtn(btnFactory, isRight) {
    return btnFactory.create({
        type: "arrow",
        className: isRight ? class_name.LIST_RIGHT_BTN : class_name.LIST_LEFT_BTN,
        events: { click: onClickArrowBtn.bind({ isRight: isRight }) },
        isRight: isRight,
    });
}

// 리스트 뷰 뉴스 생성
export function createListView(news_category_press) {
    const $container = document.querySelector(`.${class_name.LIST_VIEW}`);
    const leftArrowBtn = createListArrowBtn(btnFactory, false);
    const rightArrowBtn = createListArrowBtn(btnFactory, true);

    $container.append(leftArrowBtn.getButton(), createListViewMain(news_category_press), rightArrowBtn.getButton());
}
