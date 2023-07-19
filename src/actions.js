import { MAX_PAGE, INTERVAL, DELAY, CATEGORYS } from "./constants.js";
import { fetchPressData, fetchNewsData, fetchHotTopicData } from "./utils.js";
import {
    renderGridView,
    renderSubscribe,
    renderPressItem,
} from "./views/grid_views.js";
import { renderListView } from "./views/list_views.js";

export function render(options, data, page) {
    if (options["main"] === "grid") {
        renderGridView(data, page, useToggleArrow);
    }

    if (options["main"] === "list") {
        renderListView(data.news_data, data.category, page, useToggleArrow);
        setProgress(options, "main_nav_progress", data);
    }
}

export function setProgress(options, name, list_option) {
    const progress = document.querySelector(`.${name}`);

    // 1초마다 1씩 증가
    list_option.interval = setInterval(() => {
        list_option.progress_time += 1;
        if (list_option.progress_time === 21) {
            clearInterval(list_option.interval);
            list_option.progress_time = 0;
            movePageEventHandler("next", "list", options, list_option);
        }
        progress.value = list_option.progress_time;
    }, 1000);
}

export async function saveData() {
    const save = {};

    try {
        save["press_data"] = await fetchPressData();
        save["news_data"] = await fetchNewsData();
        save["hot_topic_data"] = await fetchHotTopicData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return save;
}

export function changeViewArrow(view) {
    const current = view === "list" ? "grid" : "list";
    const cur_right_arrow = document.querySelector(`.${current}_right_arrow`);
    const right_arrow = document.querySelector(`.${view}_right_arrow`);
    cur_right_arrow.style.display = "none";
    right_arrow.style.display = "block";

    const cur_left_arrow = document.querySelector(`.${current}_left_arrow`);
    const left_arrow = document.querySelector(`.${view}_left_arrow`);
    cur_left_arrow.style.display = "none";
    left_arrow.style.display = "block";
}

export function useClearDisplay(container, option) {
    const news_data_container = document.querySelector(`.${container}`);
    news_data_container.innerHTML = "";

    clearInterval(option.interval);
    option.progress_time = 0;
}

function useToggleArrow(mode, page) {
    const left_arrow = document.querySelector(`.${mode}_left_arrow`);
    const right_arrow = document.querySelector(`.${mode}_right_arrow`);

    switch (page) {
        case 0:
            left_arrow.style.display = "none";
            right_arrow.style.display = "block";
            break;
        case MAX_PAGE:
            left_arrow.style.display = "block";
            right_arrow.style.display = "none";
            break;
        default:
            left_arrow.style.display = "block";
            right_arrow.style.display = "block";
            break;
    }
}

export function useMovePage(direction, view, option) {
    if (view === "grid") {
        option.page = direction === "next" ? option.page + 1 : option.page - 1;
    }

    if (view === "list" && direction === "next") {
        option.page = option.page + 1;
        if (
            option.page >= option.news_data[CATEGORYS[option.category]].length
        ) {
            option.category =
                option.category === option.category_size - 1
                    ? 0
                    : option.category + 1;
            option.page = 0;
        }
    }

    if (view === "list" && direction === "prev") {
        option.page = option.page - 1;
        if (option.page < 0) {
            option.category =
                option.category === 0
                    ? option.category_size - 1
                    : option.category - 1;
            option.page =
                option.news_data[CATEGORYS[option.category]].length - 1;
        }
    }
}

export function useAnimationSnackBar() {
    const snack_bar_container = document.querySelector(".snack_bar_container");

    snack_bar_container.style.display = "block";
    snack_bar_container.style.animation = "appear 0.5s forwards";

    const snack_animation_time = setTimeout(() => {
        // disappear animation
        snack_bar_container.style.animation = "disappear 0.5s forwards";
    }, 3000);

    return snack_animation_time;
}

export function useControlBanner() {
    const banner_left =
        document.getElementById("rollingBannerLeft").childNodes[0];
    const banner_right =
        document.getElementById("rollingBannerRight").childNodes[0];

    // 5초마다 배너 교체

    const leftBannerTime = setTimeout(() => {
        const left_time = setInterval(() => {
            //updateBanner 이후 banner update
            updateBanner(banner_left, left_time, "left");
        }, INTERVAL);
    }, 0);

    const rightBannerTime = setTimeout(() => {
        const right_time = setInterval(() => {
            updateBanner(banner_right, right_time, "right");
        }, INTERVAL);
    }, DELAY);

    return {
        banner_left: banner_left,
        banner_right: banner_right,
    };
}

export function useCurrentHourToMode() {
    const current_hour = new Date().getHours();
    return current_hour >= 18 || current_hour < 6 ? "dark-mode" : "light-mode";
}

function updateBanner(banner, banner_time, loc) {
    if (banner.style.animationPlayState === "paused") {
        clearTimeout(banner_time);
        return;
    }

    if (loc === "left") {
        banner.style.animation = "roll-up-left 3s ease-in-out forwards";
    }
    if (loc === "right") {
        banner.style.animation = "roll-up-right 3s ease-in-out forwards";
    }

    setTimeout(() => {
        if (banner.style.animationPlayState === "paused") {
            return;
        }
        if (banner.style.animationPlayState === "running") {
            banner.appendChild(banner.childNodes[0]);
            banner.style.animation = "none";
        }
    }, 4000);
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
export function movePageEventHandler(
    direction,
    view,
    view_option,
    select_option
) {
    const options = {
        main: view_option.main,
        press: view_option.press,
    };
    if (view === "grid") {
        useMovePage(direction, view, select_option);

        render(options, select_option.press_data, select_option.page);
    }
    if (view === "list") {
        useMovePage(direction, view, select_option);

        render(options, select_option, select_option.page);
    }
}
