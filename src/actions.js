import { MAX_PAGE, INTERVAL, DELAY } from "./constants.js";
import { fetchPressData, fetchNewsData, fetchHotTopicData } from "./utils.js";

export function useRenderOptions(type, is_sub) {
    if (type === "list") {
    }
    if (type === "grid") {
        return;
    }
}

export function useSetProgress(name, view_option, action) {
    const progress = document.querySelector(`.${name}`);

    // 1초마다 1씩 증가
    view_option.interval = setInterval(() => {
        view_option.progress_time += 1;
        if (view_option.progress_time === 21) {
            clearInterval(view_option.interval);
            view_option.progress_time = 0;
            action("next", "list", view_option);
        }
        progress.value = view_option.progress_time;
    }, 1000);
}

export function useFetchAllData() {
    return Promise.all([
        fetchPressData(),
        fetchNewsData(),
        fetchHotTopicData(),
    ]);
}

export function useChangeArrow(mode) {
    const current = mode === "list" ? "grid" : "list";
    const cur_right_arrow = document.querySelector(`.${current}_right_arrow`);
    const right_arrow = document.querySelector(`.${mode}_right_arrow`);
    cur_right_arrow.style.display = "none";
    right_arrow.style.display = "block";

    const cur_left_arrow = document.querySelector(`.${current}_left_arrow`);
    const left_arrow = document.querySelector(`.${mode}_left_arrow`);
    cur_left_arrow.style.display = "none";
    left_arrow.style.display = "block";
}

export function useClearDisplay(container, option) {
    const news_data_container = document.querySelector(`.${container}`);
    news_data_container.innerHTML = "";

    clearInterval(option.interval);
    option.progress_time = 0;
}

export function useToggleArrow(mode, page) {
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

export function useMovePage(direction, option, view_option) {
    if (option === "grid") {
        view_option.grid_current_page =
            direction === "next"
                ? view_option.grid_current_page + 1
                : view_option.grid_current_page - 1;
    }

    if (option === "list" && direction === "next") {
        view_option.list_current_page = view_option.list_current_page + 1;
        if (
            view_option.list_current_page >=
            view_option.news_data[view_option.categorys[view_option.category]]
                .length
        ) {
            view_option.category =
                view_option.category === view_option.category_size - 1
                    ? 0
                    : view_option.category + 1;
            view_option.list_current_page = 0;
        }
    }

    if (option === "list" && direction === "prev") {
        view_option.list_current_page = view_option.list_current_page - 1;
        if (view_option.list_current_page < 0) {
            view_option.category =
                view_option.category === 0
                    ? view_option.category_size - 1
                    : view_option.category - 1;
            view_option.list_current_page =
                view_option.news_data[
                    view_option.categorys[view_option.category]
                ].length - 1;
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
