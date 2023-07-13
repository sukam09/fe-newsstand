import { MAX_PAGE } from "./constants.js";
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
    const {
        grid_current_page,
        list_current_page,
        categorys,
        category,
        category_size,
        news_data,
    } = view_option;

    if (option === "grid") {
        view_option.grid_current_page =
            direction === "next"
                ? grid_current_page + 1
                : grid_current_page - 1;
    }

    if (option === "list" && direction === "next") {
        view_option.list_current_page = list_current_page + 1;
        if (
            view_option.list_current_page >=
            news_data[categorys[category]].length
        ) {
            view_option.category =
                category === category_size - 1 ? 0 : category + 1;
            view_option.list_current_page = 0;
        }
    }

    if (option === "list" && direction === "prev") {
        view_option.list_current_page = list_current_page - 1;
        if (view_option.list_current_page < 0) {
            view_option.category =
                category === 0 ? category_size - 1 : category - 1;
            view_option.list_current_page =
                news_data[categorys[category]].length - 1;
        }
    }
}
