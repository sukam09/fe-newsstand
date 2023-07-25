import { CATEGORIES, MAX_PAGE, ASSETS_ICONS_PATH } from "./constants.js";
import {
    view_option,
    grid_option,
    list_option,
    subscribe_option,
} from "./globals.js";
import {
    showToday,
    getOptions,
    currentHourToMode,
    renderOptions,
    getCalPage,
    setNavCategoryIndex,
    setCategoryIndex,
    setPageIndex,
    setSubscribeNewsData,
} from "./utils.js";
import {
    render,
    save,
    changeViewArrow,
    clear,
    handlePage,
    controlBanner,
    setSnackBar,
} from "./actions.js";
import { renderPressItem } from "./views/grid_views.js";
import { renderNewsItem } from "./views/list_views.js";
import { renderHotTopicsView } from "./views/rolling_views.js";
import {
    renderSnackBarView,
    createSnackBarView,
} from "./views/snack_bar_views.js";
import { createModalBarView } from "./views/modal_bar_views.js";

/**
 * @description
 * 1. 구독자 옵션 변경 이벤트
 * 2. grid_views, list_views, 구독자 옵션 클릭 이벤트
 */
function subscribeOptionEvent() {
    const option_press_elements = document.querySelectorAll(".option_press");
    option_press_elements.forEach((option_press) => {
        option_press.addEventListener("click", (event) =>
            optionListener(event, "press")
        );
    });
}

/**
 * @description
 * 1. 메인 옵션 변경 이벤트
 * 2. grid_views, list_views, 메인 옵션 클릭 이벤트
 */
function mainOptionEvent() {
    const option_main_elements = document.querySelectorAll(".option_main");
    option_main_elements.forEach((option_main) => {
        option_main.addEventListener("click", (event) =>
            optionListener(event, "main")
        );
    });
}

function optionListener(event, selected) {
    const clicked_option = event.target;

    view_option.dispatch(
        {
            type: "CHANGE_VIEW_OPTION",
            value: clicked_option.id.split("_")[1],
        },
        selected
    );
    const { main, press } = view_option.getState(["main", "press"]);

    const option_elements = document.querySelectorAll(`.option_${selected}`);
    option_elements.forEach((option_name) => {
        option_name.className =
            option_name === clicked_option
                ? `option_${selected} option_${selected}_active`
                : `option_${selected}`;
    });

    clearAndRender({
        main: main,
        press: press,
        option_elements: option_elements,
        selected: selected,
    });
}

function clearAndRender(options) {
    const { main, press, option_elements, selected } = options;

    clearTimeout(snack_animation_time);
    if (selected && selected === "main")
        updateMainNewsContainer(option_elements, main);

    clear("main_news_container", list_option);
    clear("snack_bar_container", "remove");
    clear("modal_bar_container", "remove");

    createSnackBarView("container_center");
    createModalBarView("container_center");
    const { data, page, category } = renderOptions()[main][press];

    changeViewArrow(main);
    render(getOptions("all", [changeCategoryEvent]), data, page, category);
    togglePressEvent();
}

function updateMainNewsContainer(option_elements, main_option) {
    const news_data_container = document.querySelector(".main_news_container");

    option_elements.forEach((option_name) => {
        if (option_name.id === `option_${main_option}_main`) {
            option_name.src = `${ASSETS_ICONS_PATH}${option_name.id}_active.png`;
        } else {
            option_name.src = `${ASSETS_ICONS_PATH}${option_name.id}.png`;
        }
    });

    const view_mode =
        main_option === "grid" ? "grid_view_container" : "list_view_container";

    news_data_container.classList.remove(
        "list_view_container",
        "grid_view_container"
    );
    news_data_container.classList.add(view_mode);
}

/**
 * @description
 * 1. 페이지 이동 이벤트
 * 2. list_views, grid_views, 화살표 클릭 이벤트
 */
function arrowPagingEvent() {
    if (!length) length = MAX_PAGE;
    const grid_left_arrow = document.querySelector(".grid_left_arrow");
    const grid_right_arrow = document.querySelector(".grid_right_arrow");
    const list_left_arrow = document.querySelector(".list_left_arrow");
    const list_right_arrow = document.querySelector(".list_right_arrow");

    grid_left_arrow.addEventListener("click", () => {
        const { main, press } = getOptions();
        const { data, page } = renderOptions()[main][press];
        if (page <= 0) return;
        handlePage(main, press, getCalPage(-1), data);
        togglePressEvent();
    });

    grid_right_arrow.addEventListener("click", () => {
        const { main, press } = getOptions();
        const { data, page } = renderOptions()[main][press];
        if (page >= length) return;
        handlePage(main, press, getCalPage(1), data);
        togglePressEvent();
    });

    list_left_arrow.addEventListener("click", () => {
        const { main, press } = getOptions();
        const { data, category } = renderOptions()[main][press];
        handlePage(main, press, getCalPage(-1), data, category, [
            changeCategoryEvent,
            togglePressEvent,
        ]);
    });

    list_right_arrow.addEventListener("click", () => {
        const { main, press } = getOptions();
        const { data, category } = renderOptions()[main][press];
        handlePage(main, press, getCalPage(1), data, category, [
            changeCategoryEvent,
            togglePressEvent,
        ]);
    });
}

/**
 * @description
 * 1. 테마 변경 이벤트
 * 2. header, toggle_mode 클릭 이벤트
 */
function toggleModeEvent() {
    const toggle_mode = document.querySelector(".toggle_mode");

    view_option.mode = currentHourToMode();

    if (view_option.mode === "dark-mode") {
        toggle_mode.children[0].src = "./assets/icons/sun.svg";
        document.body.classList.toggle("dark_mode");
    } else {
        toggle_mode.children[0].src = "./assets/icons/moon.svg";
    }

    toggle_mode.addEventListener("click", () => {
        // body class toggle
        document.body.classList.toggle("dark_mode");
        if (view_option.mode === "light-mode") {
            // toggle_mode child img src change
            toggle_mode.children[0].src = "./assets/icons/sun.svg";
            view_option.mode = "dark-mode";
        } else {
            toggle_mode.children[0].src = "./assets/icons/moon.svg";
            view_option.mode = "light-mode";
        }
        // current view re render
        if (view_option.main === "grid") {
            renderPressItem(view_option.mode);
        }
        if (view_option.main === "list") {
            renderNewsItem(view_option.mode);
        }
    });
}

/**
 * @description
 * 1. 언론사 토글 기능
 * 2. grid_views, 언론사 호버 이벤트
 */
function togglePressEvent() {
    const press_container = document.querySelectorAll(".press_data_item");
    press_container.forEach((item) => {
        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);
    });
    toggleSubscribeEvent();
}

const handleMouseEnter = (event) => {
    const item = event.target;
    item.style.transform = "rotateX(180deg)";
    item.style.transition = "transform 0.5s";
};

const handleMouseLeave = (event) => {
    const item = event.target;
    item.style.transform = "rotateX(0deg)";
    item.style.transition = "transform 0.5s";
};

/**
 * @description
 * 1. 구독/구독해제 이벤트
 * 2. grid_views, 언론사 구독 클릭 이벤트
 */
let snack_animation_time;
function toggleSubscribeEvent() {
    const subscribe = document.querySelectorAll(".content_subscribe");

    subscribe.forEach((press) => {
        press.addEventListener("click", () => {
            clearTimeout(snack_animation_time);

            if (press.value === "true") {
                modalBarEvent(press.name, press.value);
                return;
            }
            const snack_bar = document.querySelector(".snack_bar_text");
            const { main: main_option, press: press_option } = getOptions();
            render(getOptions("sub", [togglePressEvent]), press);

            snack_animation_time = setSnackBar(clearAndRender);
            subscribe_option.subscribe_press[press.name] = press.value;
            subscribe_option.subscribe_categories.push(press.name);
            setSubscribeNewsData();

            if (press_option === "subscribe") {
                clearAndRender({ main: main_option, press: press_option });
            }

            renderSnackBarView(snack_bar);
        });
    });
}

/**
 * @description
 * 1. 카테고리 변경 이벤트
 * 2. list_views, 카테고리 클릭 이벤트
 * @param {Array} data
 */
function changeCategoryEvent() {
    const main_nav_item = document.querySelectorAll(".main_nav_item");

    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            const { main: main_option, press: press_option } = getOptions();
            setNavCategoryIndex(item.innerHTML, press_option);
            setPageIndex(0);
            const { data, page, category } =
                renderOptions()[main_option][press_option];

            render(
                getOptions("all", [changeCategoryEvent, toggleSubscribeEvent]),
                data,
                page,
                category
            );
        });
    });
}

/**
 * @description
 * 1. 오토 롤링 애니메이션 제어 이벤트
 * 2. rolling_views, 오토 롤링 호버 이벤트
 * @param {*} action
 */
function bannerMouseEvent(action) {
    action["banner_left"].addEventListener("mouseover", function () {
        action["banner_left"].style.animationPlayState = "paused";
    });

    action["banner_left"].addEventListener("mouseout", function () {
        action["banner_left"].style.animationPlayState = "running";
    });

    action["banner_right"].addEventListener("mouseover", function () {
        action["banner_right"].style.animationPlayState = "paused";
    });

    action["banner_right"].addEventListener("mouseout", function () {
        action["banner_right"].style.animationPlayState = "running";
    });
}

function modalBarEvent(name) {
    const modal_bar_container = document.querySelector(".modal_bar_container");

    modal_bar_container.style.display = "block";
    modal_bar_container.style.animation = "appear 0.5s forwards";

    const modal_bar_name = document.querySelector(".modal_bar_text b");
    modal_bar_name.innerHTML = name;

    const modal_bar_terminate = document.querySelector(".modal_bar_terminate");
    const modal_bar_cancel = document.querySelector(".modal_bar_cancel");

    modal_bar_terminate.addEventListener("click", () => {
        const modal_bar_container = document.querySelector(
            ".modal_bar_container"
        );
        const { main: main_option, press: press_option } = getOptions();
        const { category } = renderOptions()[main_option][press_option];
        subscribe_option.subscribe_press[name] = "false";
        subscribe_option.subscribe_categories.splice(
            subscribe_option.subscribe_categories.indexOf(name),
            1
        );
        if (category >= subscribe_option.subscribe_categories.length) {
            setCategoryIndex(press_option, category - 1);
        }
        setSubscribeNewsData();
        modal_bar_container.style.animation = "disappear 0.5s forwards";
        clearAndRender({ main: main_option, press: press_option });
        setTimeout(() => {
            modal_bar_container.style.display = "none";
        }, 500);
    });

    modal_bar_cancel.addEventListener("click", () => {
        const modal_bar_container = document.querySelector(
            ".modal_bar_container"
        );
        const { main: main_option, press: press_option } = getOptions();
        modal_bar_container.style.animation = "disappear 0.5s forwards";
        clearAndRender({ main: main_option, press: press_option });
        setTimeout(() => {
            modal_bar_container.style.display = "none";
        }, 500);
    });
}

async function initEvent() {
    try {
        const data = await save();

        grid_option.press_data = data["press_data"];
        list_option.unrefined_new_data = data["news_data"];

        CATEGORIES.forEach((item) => {
            list_option.news_data[item] = data["news_data"].filter(
                (news) => news.category === item
            );
        });

        view_option.hot_topic_data = data["hot_topic_data"];

        render(getOptions(), grid_option.press_data, grid_option.page);
        renderHotTopicsView(
            data["hot_topic_data"][0],
            data["hot_topic_data"][1],
            () => {
                bannerMouseEvent(controlBanner());
            }
        );

        togglePressEvent();
        createSnackBarView("container_center");
        createModalBarView("container_center");
    } catch (error) {
        console.log(error);
    }
}

function handleEvents() {
    initEvent();
    subscribeOptionEvent();
    mainOptionEvent();
    arrowPagingEvent();
    toggleModeEvent();
    showToday("today");
}

export { handleEvents };
