import { MAX_PAGE } from "./constants.js";
import { view_option } from "./globals.js";
import { showToday } from "./utils.js";
import {
    useChangeArrow,
    useClearDisplay,
    useToggleArrow,
    useFetchAllData,
    useSetProgress,
    useMovePage,
    useControlBanner,
    useAnimationSnackBar,
    useCurrentHourToMode,
} from "./actions.js";
import {
    renderGridView,
    renderSubscribe,
    renderPressItem,
} from "./views/grid_views.js";
import { renderListView, renderNewsItem } from "./views/list_views.js";
import { renderHotTopicsView } from "./views/rolling_views.js";
import {
    renderSnackBarView,
    createSnackBarView,
} from "./views/snack_bar_views.js";

/**
 * @description
 * 1. 언론사 토글 기능
 * 2. grid_views, 언론사 호버 이벤트
 */
function togglePressEvent() {
    const press_container = document.querySelectorAll(".press_data_item");
    press_container.forEach((item) => {
        //hover event
        item.addEventListener("mouseenter", (e) => {
            // 3d rotate
            item.style.transform = "rotateX(180deg)";
            item.style.transition = "transform 0.5s";
        });

        item.addEventListener("mouseleave", (e) => {
            // 3d rotate back
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
            snack_animation_time = useAnimationSnackBar();
            renderSubscribe(press, press.is_subscribe);
            if (!press.is_subscribe) {
                renderSnackBarView(snack_bar, true);
                view_option.subscribe_press[press.name] = false;
            } else {
                renderSnackBarView(snack_bar, false);
                view_option.subscribe_press[press.name] = true;
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
            view_option.category = view_option.categorys.indexOf(
                item.innerText
            );
            renderListView(
                data,
                view_option.category,
                0,
                useSetProgress,
                changeCategoryEvent,
                movePageEventHandler
            );
            view_option.list_current_page = 0;
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
        if (view_option.grid_current_page <= 0) return;
        movePageEventHandler("prev", "grid", view_option);
    });

    grid_right_arrow.addEventListener("click", () => {
        if (view_option.grid_current_page >= length) return;
        movePageEventHandler("next", "grid", view_option);
    });

    list_left_arrow.addEventListener("click", () => {
        movePageEventHandler("prev", "list", view_option);
    });

    list_right_arrow.addEventListener("click", () => {
        movePageEventHandler("next", "list", view_option);
    });
}

/**
 * @description
 * 1. 페이지 이동 이벤트 핸들러
 * 2. list_views, grid_views, 화살표 클릭 이벤트 핸들러
 * 3. action 으로 이동할 필요가 있음? (useMovePage)
 * @param {String} direction - prev, next
 * @param {String} view - grid, list
 * @param {view_option} view_option - view_option
 */
function movePageEventHandler(direction, view, view_option) {
    if (view === "grid") {
        useMovePage(direction, view, view_option);

        renderGridView(view_option.press_data, view_option.grid_current_page, [
            useToggleArrow,
            togglePressEvent,
        ]);
    }
    if (view === "list") {
        useMovePage(direction, view, view_option);

        renderListView(
            view_option.news_data,
            view_option.category,
            view_option.list_current_page,
            useSetProgress,
            changeCategoryEvent,
            movePageEventHandler
        );
    }
}

/**
 * @description
 * 1. 구독자 옵션 변경 이벤트
 * 2. grid_views, list_views, 구독자 옵션 클릭 이벤트
 */
function subscribeOptionEvent() {
    const option_press = document.querySelectorAll(".option_press");
    option_press.forEach((option) => {
        option.addEventListener("click", (e) => {
            view_option.press = option.id.split("_")[1];
            if (option.id === "option_all_press") {
                option.className = "option_press option_press_active";
                document.getElementById("option_subscribe_press").className =
                    "option_press option_press_inactive";
            } else {
                option.className = "option_press option_press_active";
                document.getElementById("option_all_press").className =
                    "option_press option_press_inactive";
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

                // render(grid, is_sub)

                useClearDisplay("main_news_container", view_option);
                useChangeArrow("grid");

                renderGridView(
                    view_option.press_data,
                    view_option.grid_current_page,
                    [useToggleArrow, togglePressEvent]
                );
            }
            if (option.id === "option_list_main") {
                option.src = "./assets/icons/option_list_main_active.png";
                document.getElementById("option_grid_main").src =
                    "./assets/icons/option_grid_main.png";
                news_data_container.classList.remove("grid_view_container");
                news_data_container.classList.add("list_view_container");

                // render(list, is_sub)

                useClearDisplay("main_news_container", view_option);
                useChangeArrow("list");

                renderListView(
                    view_option.news_data,
                    view_option.category,
                    view_option.list_current_page,
                    useSetProgress,
                    changeCategoryEvent,
                    movePageEventHandler
                );
            }
        });
    });
}

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

function toggleModeEvent() {
    const toggle_mode = document.querySelector(".toggle_mode");

    view_option.mode = useCurrentHourToMode();

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

function initEvent() {
    showToday();
    useFetchAllData().then((data) => {
        // data[0] = press
        // data[1] = news
        // data[2] = hot_topic
        view_option.press_data = data[0];

        view_option.categorys.forEach((item) => {
            view_option.news_data[item] = data[1].filter(
                (news) => news.category === item
            );
        });
        view_option.hot_topic = data[2];

        // 처음은 grid view
        renderGridView(view_option.press_data, view_option.grid_current_page, [
            useToggleArrow,
            togglePressEvent,
        ]);

        renderHotTopicsView(data[2][0], data[2][1], () => {
            bannerMouseEvent(useControlBanner());
        });

        createSnackBarView("container_center");
    });
}

function handleEvents() {
    initEvent();
    subscribeOptionEvent();
    mainOptionEvent();
    arrowPagingEvent();
    toggleModeEvent();
}

export { handleEvents };
