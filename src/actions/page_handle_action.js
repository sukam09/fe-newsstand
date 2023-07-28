import { render } from "./render_action.js";
import { getOptions } from "../utils/data_util.js";
import { CATEGORIES, PROGRESS_DELAY, PROGRESS_MAX } from "../constants.js";
import { updateCategoryIndex } from "../utils/data_util.js";
import { list_option, subscribe_option } from "../store.js";

export function setProgress(options, data, page, category, name, callbacks) {
    const progress = document.querySelector(`.${name}`);

    list_option.interval = setInterval(() => {
        list_option.progress_time += 1;
        if (list_option.progress_time === PROGRESS_MAX) {
            clearInterval(list_option.interval);
            list_option.progress_time = 0;
            handlePage(
                options["main"],
                options["press"],
                page + 1,
                data,
                category,
                callbacks
            );
        }
        progress.value = list_option.progress_time;
    }, PROGRESS_DELAY);
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

function useMovePage(press, page, data, category, callbacks) {
    const new_category =
        press === "all" ? CATEGORIES : subscribe_option.subscribe_categories;
    if (page >= data[new_category[category]].length) {
        category = updateCategoryIndex(category + 1, "next", press)["category"];
        page = 0;
    }
    if (page === -1) {
        category = updateCategoryIndex(category - 1, "prev", press)["category"];
        page = data[new_category[category]].length - 1;
    }
    render(getOptions("all", callbacks), data, page, category);
}

export function handlePage(main, press, page, data, category, callbacks) {
    if (main === "grid") render(getOptions(), data, page);
    else useMovePage(press, page, data, category, callbacks);
}
