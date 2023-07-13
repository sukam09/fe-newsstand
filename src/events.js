import { MAX_PAGE } from "./constants.js";
import { view_option } from "./globals.js";
import { renderGridView, renderSubscribe } from "./views/grid_views.js";
import { renderListView } from "./views/list_views.js";

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

function toggleSubscribeEvent() {
    const subscribe = document.querySelectorAll(".content_subscribe");
    subscribe.forEach((press) => {
        press.addEventListener("click", (e) => {
            renderSubscribe(press, press.is_subscribe === true);
        });
    });
}

function changeCategoryEvent(data) {
    const main_nav_item = document.querySelectorAll(".main_nav_item");

    main_nav_item.forEach((item) => {
        item.addEventListener("click", () => {
            view_option.category = view_option.categorys.indexOf(
                item.innerText
            );
            renderListView(data, view_option.category, 0);
            view_option.list_current_page = 0;
        });
    });
}

function subscribeOptionEvent() {
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

function mainOptionEvent() {
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

                renderGridView(
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

                renderListView(
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
        renderGridView(view_option.press_data, view_option.grid_current_page);
    });

    grid_right_arrow.addEventListener("click", () => {
        if (view_option.grid_current_page >= length) return;
        view_option.grid_current_page = view_option.grid_current_page + 1;

        renderGridView(view_option.press_data, view_option.grid_current_page);
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

        renderListView(
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

        renderListView(
            view_option.news_data,
            view_option.category,
            view_option.list_current_page
        );
    }
}

function handleEvents() {
    subscribeOptionEvent();
    mainOptionEvent();
    movePageEvent();
}

export {
    togglePressEvent,
    changeCategoryEvent,
    handleEvents,
    toggleArrow,
    movePage,
    toggleSubscribeEvent,
};
