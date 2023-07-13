import { MAX_PAGE } from "./constants.js";
import { view_option } from "./globals.js";
import { renderGridPress } from "./views/grid_views.js";
import { renderListNews } from "./views/list_views.js";

function optionShowPress() {
    const option_press = document.querySelectorAll(".option_press");
    option_press.forEach((option) => {
        option.addEventListener("click", (e) => {
            view_option.press = option.id;
            if (option.id === "option_all_press") {
                option.className = "option_press option_press_active";
                document.getElementById("option_subscribe_press").className =
                    "option_press option_press_inactive";

                // here (random_news.js) renderPress()
            } else {
                option.className = "option_press option_press_active";
                document.getElementById("option_all_press").className =
                    "option_press option_press_inactive";

                // here (subscribe_news.js) renderPress()
            }
        });
    });
}

function optionShowMain() {
    const option_main = document.querySelectorAll(".option_main");
    const news_data_container = document.querySelector(".main_news_container");

    option_main.forEach((option) => {
        option.addEventListener("click", () => {
            view_option.main = option.id;
            if (option.id === "option_grid_main") {
                option.src = "./assets/icons/option_grid_main_active.png";
                document.getElementById("option_list_main").src =
                    "./assets/icons/option_list_main.png";
                news_data_container.classList.remove("list_view_container");
                news_data_container.classList.add("grid_view_container");

                deleteMainDisplay();
                changeArrow("grid");

                renderGridPress(
                    view_option.press_data,
                    view_option.grid_current_page
                );
            }
            if (option.id === "option_list_main") {
                option.src = "./assets/icons/option_list_main_active.png";
                document.getElementById("option_grid_main").src =
                    "./assets/icons/option_grid_main.png";
                news_data_container.classList.remove("grid_view_container");
                news_data_container.classList.add("list_view_container");

                deleteMainDisplay();
                changeArrow("list");

                renderListNews(
                    view_option.news_data,
                    view_option.category,
                    view_option.list_current_page
                );
            }
        });
    });
}

function changeArrow(mode) {
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

function toggleSubscribe() {
    const subscribe = document.querySelectorAll(".content_subscribe");

    subscribe.forEach((press) => {
        press.addEventListener("click", (e) => {
            if (press.is_subscribe === true) {
                press.is_subscribe = false;
                console.log(`${press.name}이 구독해지되었습니다.`);
                press.innerHTML = `
                <img src="./assets/icons/plus.png" />
                <span>구독하기</span>
                `;
            } else {
                press.is_subscribe = true;
                console.log(`${press.name}이 구독되었습니다.`);
                press.innerHTML = `
                <img src="./assets/icons/symbol.png" />
                `;
            }
        });
    });
}

function toggleArrow(mode, page) {
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

function deleteMainDisplay() {
    const news_data_container = document.querySelector(".main_news_container");
    news_data_container.innerHTML = "";

    clearInterval(view_option.interval);
    view_option.progress_time = 0;
}

function movePageEvent() {
    if (!length) length = MAX_PAGE;
    const grid_left_arrow = document.querySelector(".grid_left_arrow");
    const grid_right_arrow = document.querySelector(".grid_right_arrow");
    const list_left_arrow = document.querySelector(".list_left_arrow");
    const list_right_arrow = document.querySelector(".list_right_arrow");

    grid_left_arrow.addEventListener("click", () => {
        if (view_option.grid_current_page <= 0) return;
        view_option.grid_current_page = view_option.grid_current_page - 1;
        renderGridPress(view_option.press_data, view_option.grid_current_page);
    });

    grid_right_arrow.addEventListener("click", () => {
        if (view_option.grid_current_page >= length) return;
        view_option.grid_current_page = view_option.grid_current_page + 1;

        renderGridPress(view_option.press_data, view_option.grid_current_page);
    });

    list_left_arrow.addEventListener("click", () => {
        movePage("prev");
    });

    list_right_arrow.addEventListener("click", () => {
        movePage("next");
    });
}

function movePage(direction) {
    if (direction === "next") {
        view_option.list_current_page = view_option.list_current_page + 1;
        if (
            view_option.list_current_page >=
            view_option.news_data[view_option.categorys[view_option.category]]
                .length
        ) {
            // category 앞으로
            if (view_option.category === view_option.category_size - 1) {
                view_option.category = 0;
            } else {
                view_option.category = view_option.category + 1;
            }
            view_option.list_current_page = 0;
        }

        renderListNews(
            view_option.news_data,
            view_option.category,
            view_option.list_current_page
        );
    }

    if (direction === "prev") {
        view_option.list_current_page = view_option.list_current_page - 1;

        if (view_option.list_current_page < 0) {
            // category 뒤로
            if (view_option.category === 0) {
                view_option.category = view_option.category_size - 1;
            } else {
                view_option.category = view_option.category - 1;
            }
            view_option.list_current_page =
                view_option.news_data[
                    view_option.categorys[view_option.category]
                ].length - 1;
        }

        renderListNews(
            view_option.news_data,
            view_option.category,
            view_option.list_current_page
        );
    }
}

function handleEvents() {
    optionShowPress();
    optionShowMain();
    movePageEvent();
}

export { handleEvents, toggleArrow, movePage, toggleSubscribe };
