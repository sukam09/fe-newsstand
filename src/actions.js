import {
    SNACKBAR_DELAY,
    INTERVAL,
    DELAY,
    CATEGORIES,
    PROGRESS_DELAY,
    PROGRESS_MAX,
} from "./constants.js";
import {
    fetchPressData,
    fetchNewsData,
    fetchHotTopicData,
    setOptions,
} from "./utils.js";
import { renderGridView } from "./views/grid_views.js";
import { renderListView } from "./views/list_views.js";

/**
 * @description
 * 1. options에 맞는 view를 렌더링한다.
 * 2. 현재, list, grid만 존재한다.
 * @param {*} options
 * @param {*} data
 * @param {*} page
 */
export function render(options, data, page) {
    if (options.main === "grid") {
        renderGridView(options, data, page, toggleArrow);
    }
    if (options.main === "list") {
        if (options.press === "all") {
            renderListView(data.news_data, data.category, page);
        } else {
            renderListView(data.news_data, data.category, page);
        }
        setProgress(options, "main_nav_progress", data);
    }
}

/**
 * @description
 * 1. 데이터를 저장한다.
 * 2. 파라미터로 옵션을 받아서 다양한 데이터를 저장하여 확장성을 높인다.
 * @param {*} options
 * @returns {Object} data
 */
export async function save() {
    const data = {};

    try {
        data["press_data"] = await fetchPressData();
        data["news_data"] = await fetchNewsData();
        data["hot_topic_data"] = await fetchHotTopicData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return data;
}

/**
 * @description
 * 1. 데이터를 지운다.
 * 2. 컨테이너 및 옵션을 통해 필요한 데이터또한 지울수 있다.
 * @param {*} container
 * @param {*} option
 */
export function clear(container, option) {
    const news_data_container = document.querySelector(`.${container}`);
    news_data_container.innerHTML = "";

    // 임시
    clearInterval(option.interval);
    option.progress_time = 0;
}

/**
 * @description
 * 1. 프로그레스 바를 설정한다.
 * @param {*} options
 * @param {*} name
 * @param {*} list_option
 */
export function setProgress(options, name, list_option) {
    const progress = document.querySelector(`.${name}`);

    list_option.interval = setInterval(() => {
        list_option.progress_time += 1;
        if (list_option.progress_time === PROGRESS_MAX) {
            clearInterval(list_option.interval);
            list_option.progress_time = 0;
            handlePage("next", "list", options, list_option);
        }
        progress.value = list_option.progress_time;
    }, PROGRESS_DELAY);
}

/**
 * @description
 * 1. view에 따른 arrow를 변경한다.
 * @param {*} view
 */
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

/**
 * @description
 * 1. grid_view의 arrow display를 변경한다.
 * @param {*} mode
 * @param {*} page
 */
function toggleArrow(mode, page, max) {
    const left_arrow = document.querySelector(`.grid_left_arrow`);
    const right_arrow = document.querySelector(`.grid_right_arrow`);

    if (mode === "subscribe") {
        left_arrow.style.display = "none";
        right_arrow.style.display = "none";
        return;
    }

    switch (page) {
        case 0:
            left_arrow.style.display = "none";
            right_arrow.style.display = "block";
            break;
        case max:
            left_arrow.style.display = "block";
            right_arrow.style.display = "none";
            break;
        default:
            left_arrow.style.display = "block";
            right_arrow.style.display = "block";
            break;
    }
}
/**
 * @description
 * 1. view에 따른 page를 변경한다.
 * 2. view에 따른 page 변경 방식이 다르며 이를 구분한다.
 * @param {*} direction
 * @param {*} view
 * @param {*} option
 */
export function useMovePage(direction, view, option) {
    if (view === "grid") {
        option.page = direction === "next" ? option.page + 1 : option.page - 1;
    }

    if (view === "list" && direction === "next") {
        option.page = option.page + 1;
        if (
            option.page >= option.news_data[CATEGORIES[option.category]].length
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
                option.news_data[CATEGORIES[option.category]].length - 1;
        }
    }
}
/**
 * @description
 * 1. snack bar의 애니메이션을 설정한다.
 * @returns {Object} options
 */
export function setSnackBar() {
    const snack_bar_container = document.querySelector(".snack_bar_container");

    snack_bar_container.style.display = "block";
    snack_bar_container.style.animation = "appear 0.5s forwards";

    const snack_animation_time = setTimeout(() => {
        // disappear animation
        snack_bar_container.style.animation = "disappear 0.5s forwards";
    }, SNACKBAR_DELAY);

    return snack_animation_time;
}

/**
 * @description
 * 1. 배너를 업데이트한다.
 * @returns {Object} options
 */
export function controlBanner() {
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
 */
export function handlePage(direction, view, select_option, press) {
    if (view === "grid") {
        useMovePage(direction, view, select_option);
        const page =
            press === "all" ? select_option.page : select_option.subscribe_page;
        render(setOptions(), select_option.press_data, page);
    }
    if (view === "list") {
        useMovePage(direction, view, select_option);
        const page =
            press === "all" ? select_option.page : select_option.subscribe_page;
        render(setOptions(), select_option, page);
    }
}
