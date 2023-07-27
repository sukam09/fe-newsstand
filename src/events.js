import { CATEGORIES, MAX_PAGE, ASSETS_ICONS_PATH } from "./constants.js";
import {
    view_option,
    grid_option,
    list_option,
    subscribe_option,
} from "./store.js";

import * as data_util from "./utils/data_util.js";
import * as mode_util from "./utils/mode_util.js";

import { changeViewArrow, handlePage } from "./actions/page_handle_action.js";
import { save } from "./actions/data_action.js";
import { render, clear } from "./actions/render_action.js";
import { controlBanner } from "./actions/banner_action.js";
import { setSnackBar } from "./actions/snack_bar_action.js";

import { renderPressItem } from "./views/grid_views.js";
import { renderNewsItem } from "./views/list_views.js";
import { renderHotTopicsView } from "./views/rolling_views.js";
import {
    renderSnackBarView,
    createSnackBarView,
} from "./views/snack_bar_views.js";
import { createModalBarView } from "./views/modal_bar_views.js";

function subscribeOptionEvent() {
    const option_press_elements = document.querySelectorAll(".option_press");
    option_press_elements.forEach((option_press) => {
        option_press.addEventListener("click", (event) =>
            optionListener(event, "press")
        );
    });
}

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
    const { data, page, category } = data_util.renderOptions()[main][press];

    changeViewArrow(main);
    render(
        data_util.getOptions("all", [
            changeCategoryEvent,
            toggleSubscribeEvent,
        ]),
        data,
        page,
        category
    );
    if (main === "grid") togglePressEvent();
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

function arrowPagingEvent() {
    if (!length) length = MAX_PAGE;
    const grid_left_arrow = document.querySelector(".grid_left_arrow");
    const grid_right_arrow = document.querySelector(".grid_right_arrow");
    const list_left_arrow = document.querySelector(".list_left_arrow");
    const list_right_arrow = document.querySelector(".list_right_arrow");

    grid_left_arrow.addEventListener("click", () => {
        const { main, press, data, page } = data_util.getEventData();
        if (page <= 0) return;
        handlePage(main, press, data_util.getCalPage(-1), data);
        togglePressEvent();
    });

    grid_right_arrow.addEventListener("click", () => {
        const { main, press, data, page } = data_util.getEventData();
        if (page >= length) return;
        handlePage(main, press, data_util.getCalPage(1), data);
        togglePressEvent();
    });

    list_left_arrow.addEventListener("click", () => {
        const { main, press, data, category } = data_util.getEventData();
        handlePage(main, press, data_util.getCalPage(-1), data, category, [
            changeCategoryEvent,
            togglePressEvent,
        ]);
    });

    list_right_arrow.addEventListener("click", () => {
        const { main, press, data, category } = data_util.getEventData();
        handlePage(main, press, data_util.getCalPage(1), data, category, [
            changeCategoryEvent,
            togglePressEvent,
        ]);
    });
}

function toggleModeEvent() {
    const toggle_mode = document.querySelector(".toggle_mode");

    if (view_option.mode === "dark-mode") {
        toggle_mode.children[0].src = `${ASSETS_ICONS_PATH}sun.svg`;
        document.body.classList.toggle("dark_mode");
    } else {
        toggle_mode.children[0].src = `${ASSETS_ICONS_PATH}moon.svg`;
    }

    toggle_mode.addEventListener("click", () => {
        document.body.classList.toggle("dark_mode");

        if (view_option.mode === "light-mode") {
            toggle_mode.children[0].src = `${ASSETS_ICONS_PATH}sun.svg`;
            view_option.dispatch(
                {
                    type: "CHANGE_VIEW_OPTION",
                    value: "dark-mode",
                },
                "mode"
            );
        } else {
            toggle_mode.children[0].src = `${ASSETS_ICONS_PATH}moon.svg`;
            view_option.dispatch(
                {
                    type: "CHANGE_VIEW_OPTION",
                    value: "light-mode",
                },
                "mode"
            );
        }
    });
}

function changeMode() {
    const toggle_mode = document.querySelector(".toggle_mode");

    if (view_option.mode === "dark-mode") {
        toggle_mode.children[0].src = `${ASSETS_ICONS_PATH}sun.svg`;
    } else {
        toggle_mode.children[0].src = `${ASSETS_ICONS_PATH}moon.svg`;
    }
    document.body.classList.toggle("dark_mode");
}

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

let snack_animation_time;
function toggleSubscribeEvent() {
    const subscribe = document.querySelectorAll(".content_subscribe");

    subscribe.forEach((sub_press) => {
        sub_press.addEventListener("click", () => {
            clearTimeout(snack_animation_time);

            if (sub_press.value === "true") {
                modalBarEvent(sub_press.name, sub_press.value);
                return;
            }
            const modal_prev_container = document.querySelector(
                ".modal_bar_container"
            );
            if (modal_prev_container) {
                modal_prev_container.style.animation =
                    "disappear 0.5s forwards";
                setTimeout(() => {
                    modal_prev_container.style.display = "none";
                }, 500);
            }
            const snack_bar = document.querySelector(".snack_bar_text");
            const { main, press } = view_option.getState(["main", "press"]);
            render(data_util.getOptions("sub", [togglePressEvent]), sub_press);

            snack_animation_time = setSnackBar(clearAndRender);
            subscribe_option.subscribe_press[sub_press.name] = sub_press.value;
            subscribe_option.subscribe_categories.push(sub_press.name);
            data_util.setSubscribeNewsData();

            if (press === "subscribe") {
                clearAndRender({ main, press });
            }

            renderSnackBarView(snack_bar);
        });
    });
}

function changeCategoryEvent() {
    const main_nav_item = document.querySelectorAll(".main_nav_item");

    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            const { main, press } = view_option.getState(["main", "press"]);
            data_util.setNavCategoryIndex(item.innerHTML, press);
            data_util.setPageIndex(0);
            const { data, page, category } =
                data_util.renderOptions()[main][press];

            render(
                data_util.getOptions("all", [
                    changeCategoryEvent,
                    toggleSubscribeEvent,
                ]),
                data,
                page,
                category
            );
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

function modalBarEvent(name) {
    const modal_bar_container = document.querySelector(".modal_bar_container");

    modal_bar_container.style.display = "block";
    modal_bar_container.style.animation = "appear 0.5s forwards";

    const modal_bar_name = document.querySelector(".modal_bar_text b");
    modal_bar_name.innerHTML = name;

    const modal_bar_terminate = document.querySelector(".modal_bar_terminate");
    const modal_bar_cancel = document.querySelector(".modal_bar_cancel");

    modal_bar_terminate.addEventListener("click", () => {
        const { main, press } = view_option.getState(["main", "press"]);
        const { category } = data_util.renderOptions()[main][press];
        subscribe_option.subscribe_press[name] = "false";
        subscribe_option.subscribe_categories.splice(
            subscribe_option.subscribe_categories.indexOf(name),
            1
        );
        if (category >= subscribe_option.subscribe_categories.length) {
            data_util.setCategoryIndex(press, category - 1);
        }
        data_util.setSubscribeNewsData();
        modalDisappear(main, press);
    });

    modal_bar_cancel.addEventListener("click", () => {
        const { main, press } = view_option.getState(["main", "press"]);
        modalDisappear(main, press);
    });
}

function modalDisappear(main, press) {
    const modal_bar_container = document.querySelector(".modal_bar_container");
    modal_bar_container.style.animation = "disappear 0.5s forwards";
    clearAndRender({ main, press });
    setTimeout(() => {
        modal_bar_container.style.display = "none";
    }, 500);
}

let auto_interval;
function toggleAutoModeEvent() {
    const toggle_auto_mode = document.querySelector(".auto_mode");
    const toggle_mode = document.querySelector(".toggle_mode");

    toggle_auto_mode.addEventListener("click", () => {
        if (toggle_auto_mode.classList.contains("auto_mode_active")) {
            clearInterval(auto_interval);
            toggle_mode.style.display = "block";
            toggle_auto_mode.tranlate = "translateX(0)";
            toggle_auto_mode.classList.remove("auto_mode_active");
            view_option.subscribe(mode_util.currentHourToMode);
            view_option.subscribe(changeMode);
        } else {
            toggle_auto_mode.style.animation = "right-move 3s forwards";
            toggle_mode.style.display = "none";

            setTimeout(() => {
                toggle_auto_mode.classList.add("auto_mode_active");
                view_option.unsubscribe(mode_util.currentHourToMode);
                view_option.unsubscribe(changeMode);
                auto_interval = timerAutoModeChange();
            }, 3000);
        }
    });
}

function timerAutoModeChange() {
    return setInterval(() => {
        if (view_option.mode === "light-mode") {
            view_option.dispatch(
                {
                    type: "CHANGE_VIEW_OPTION",
                    value: "dark-mode",
                },
                "mode"
            );
        } else {
            view_option.dispatch(
                {
                    type: "CHANGE_VIEW_OPTION",
                    value: "light-mode",
                },
                "mode"
            );
        }
        changeMode();
    }, 3000);
}
async function initEvent() {
    try {
        mode_util.currentHourToMode();
        const data = await save();

        grid_option.press_data = data["press_data"];
        list_option.unrefined_new_data = data["news_data"];

        CATEGORIES.forEach((item) => {
            list_option.news_data[item] = data["news_data"].filter(
                (news) => news.category === item
            );
        });

        view_option.hot_topic_data = data["hot_topic_data"];

        render(
            data_util.getOptions(),
            grid_option.press_data,
            grid_option.page
        );
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

function handleStandbyEvents() {
    initEvent();
    subscribeOptionEvent();
    mainOptionEvent();
    arrowPagingEvent();
    toggleModeEvent();
    // toggleAutoModeEvent();
    mode_util.showToday("today");

    view_option.subscribe(renderPressItem);
    view_option.subscribe(renderNewsItem);
}

export { handleStandbyEvents };
