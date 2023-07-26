import { renderGridView } from "../views/grid_views.js";
import { renderListView } from "../views/list_views.js";
import { setProgress } from "./page_handle_action.js";
import { toggleArrow } from "../utils/mode_util.js";

/**
 * @description
 * 1. options에 맞는 view를 렌더링한다.
 * 2. 현재, list, grid만 존재한다.
 * @param {*} options
 * @param {*} data
 * @param {*} page
 */
export function render(options, data, page, category) {
    if (options.main === "grid") {
        renderGridView(options, data, page, toggleArrow);
    }
    if (options.main === "list") {
        renderListView(options, data, category, page);
        if (
            options.target === "sub" ||
            data === undefined ||
            Object.keys(data).length === 0
        ) {
            return;
        }
        setProgress(
            options,
            data,
            page,
            category,
            "main_nav_progress",
            options.callbacks
        );
        // options.callback 실행
        if (options.callbacks) {
            options.callbacks.forEach((callback) => {
                callback();
            });
        }
    }
}

/**
 * @description
 * 1. 데이터를 지운다.
 * 2. 컨테이너 및 옵션을 통해 필요한 데이터또한 지울수 있다.
 * @param {*} container
 * @param {*} option
 */
export function clear(main_container, option) {
    const container = document.querySelector(`.${main_container}`);
    if (option === "remove") {
        container.remove();
    } else {
        container.innerHTML = "";

        clearInterval(option.interval);
        option.progress_time = 0;
    }
}

