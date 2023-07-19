import { CATEGORIES, MAX_PAGE } from "./constants.js";
import {
    view_option,
    grid_option,
    list_option,
    subscribe_option,
} from "./globals.js";
import { showToday, setOptions, currentHourToMode } from "./utils.js";
import {
    render,
    save,
    changeViewArrow,
    clear,
    handlePage,
    controlBanner,
    setSnackBar,
} from "./actions.js";
import { renderSubscribe, renderPressItem } from "./views/grid_views.js";
import { renderNewsItem } from "./views/list_views.js";
import { renderHotTopicsView } from "./views/rolling_views.js";
import {
    renderSnackBarView,
    createSnackBarView,
} from "./views/snack_bar_views.js";

/**
 * @description
 * 1. 구독자 옵션 변경 이벤트
 * 2. grid_views, list_views, 구독자 옵션 클릭 이벤트
 */
function subscribeOptionEvent() {
    const option_press = document.querySelectorAll(".option_press");
    option_press.forEach((option) => {
        option.addEventListener("click", (e) => {
            const main = setOptions().main;
            view_option.press = option.id.split("_")[1];
            if (option.id === "option_all_press") {
                option.className = "option_press option_press_active";
                document.getElementById("option_subscribe_press").className =
                    "option_press";

                clear("main_news_container", list_option);

                changeViewArrow(view_option.main);
                render(setOptions(), grid_option.press_data, grid_option.page);
                togglePressEvent();
            } else {
                option.className = "option_press option_press_active";
                document.getElementById("option_all_press").className =
                    "option_press";

                clear("main_news_container", list_option);

                const sub_data = grid_option.press_data.filter((press) => {
                    return subscribe_option.subscribe_press[press["name"]];
                });

                changeViewArrow(view_option.main);
                render(setOptions(), sub_data, grid_option.subscribe_page);
                togglePressEvent();
            }
        });
    });
}

/**
 * @description
 * 1. 메인 옵션 변경 이벤트
 * 2. grid_views, list_views, 메인 옵션 클릭 이벤트
 */
function mainOptionEvent() {
    const option_main = document.querySelectorAll(".option_main");
    const news_data_container = document.querySelector(".main_news_container");

    option_main.forEach((option) => {
        option.addEventListener("click", () => {
            view_option.main = option.id.split("_")[1];

            if (option.id === "option_grid_main") {
                option.src = "./assets/icons/option_grid_main_active.png";
                document.getElementById("option_list_main").src =
                    "./assets/icons/option_list_main.png";
                news_data_container.classList.remove("list_view_container");
                news_data_container.classList.add("grid_view_container");

                clear("main_news_container", list_option);
                changeViewArrow("grid");

                render(setOptions(), grid_option.press_data, grid_option.page);
                togglePressEvent();
            }
            if (option.id === "option_list_main") {
                option.src = "./assets/icons/option_list_main_active.png";
                document.getElementById("option_grid_main").src =
                    "./assets/icons/option_grid_main.png";
                news_data_container.classList.remove("grid_view_container");
                news_data_container.classList.add("list_view_container");

                clear("main_news_container", list_option);
                changeViewArrow("list");

                render(setOptions(), list_option, list_option.page);
                changeCategoryEvent(list_option.news_data);
            }
        });
    });
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
        if (grid_option.page <= 0) return;
        handlePage("prev", "grid", grid_option, view_option.press);
        togglePressEvent();
    });

    grid_right_arrow.addEventListener("click", () => {
        if (grid_option.page >= length) return;
        handlePage("next", "grid", grid_option, view_option.press);
        togglePressEvent();
    });

    list_left_arrow.addEventListener("click", () => {
        handlePage("prev", "list", list_option, view_option.press);
        changeCategoryEvent(list_option.news_data);
    });

    list_right_arrow.addEventListener("click", () => {
        handlePage("next", "list", list_option, view_option.press);
        changeCategoryEvent(list_option.news_data);
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
            /*
                render(view_option, grid_option);
            */
        }
        if (view_option.main === "list") {
            renderNewsItem(view_option.mode);
            /*
                render(view_option, grid_option);
            */
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
        item.addEventListener("mouseenter", (e) => {
            item.style.transform = "rotateX(180deg)";
            item.style.transition = "transform 0.5s";
        });

        item.addEventListener("mouseleave", (e) => {
            item.style.transform = "rotateX(0deg)";
            item.style.transition = "transform 0.5s";
        });
    });
    toggleSubscribeEvent();
}

/**
 * @description
 * 1. 구독/구독해제 이벤트
 * 2. grid_views, 언론사 구독 클릭 이벤트
 */
function toggleSubscribeEvent() {
    const subscribe = document.querySelectorAll(".content_subscribe");
    let snack_animation_time;

    subscribe.forEach((press) => {
        press.addEventListener("click", (e) => {
            clearTimeout(snack_animation_time);
            const snack_bar = document.querySelector(".snack_bar_text");
            snack_animation_time = setSnackBar();

            // renderSubscribe(press, press.is_subscribe);

            render(setOptions("sub"), press);

            if (!press.is_subscribe) {
                renderSnackBarView(snack_bar, false);
                /*
                 render(view_option, ...);
                */
                subscribe_option.subscribe_press[press.name] = false;
            } else {
                renderSnackBarView(snack_bar, true);
                /*
                 render(view_option, ...);
                */
                subscribe_option.subscribe_press[press.name] = true;
            }
        });
    });
}

/**
 * @description
 * 1. 카테고리 변경 이벤트
 * 2. list_views, 카테고리 클릭 이벤트
 * @param {Array} data
 */
function changeCategoryEvent(data) {
    const main_nav_item = document.querySelectorAll(".main_nav_item");

    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            list_option.category = CATEGORIES.indexOf(item.innerText);

            render(setOptions(), list_option, list_option.page);
            changeCategoryEvent(data);
            list_option.page = 0;
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

async function initEvent() {
    showToday("today");

    try {
        const data = await save();

        grid_option.press_data = data["press_data"];

        CATEGORIES.forEach((item) => {
            list_option.news_data[item] = data["news_data"].filter(
                (news) => news.category === item
            );
        });

        view_option.hot_topic_data = data["hot_topic_data"];

        render(setOptions(), grid_option.press_data, grid_option.page);
        /*
            render(view_option, grid_option);
        */
        renderHotTopicsView(
            data["hot_topic_data"][0],
            data["hot_topic_data"][1],
            () => {
                bannerMouseEvent(controlBanner());
            }
        );
        /*
            render(view_option, ...);
        */

        togglePressEvent();
        createSnackBarView("container_center");
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
}

export { handleEvents };
