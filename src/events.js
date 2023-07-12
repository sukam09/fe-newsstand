import { renderGridPress } from "./views/grid_views.js";
import { renderListNews } from "./views/list_views.js";

// 전역으로 관리할 것
const show_options = {
    press: "all",
    main: "grid",

    //grid view
    press_data: [],
    grid_current_page: 0,

    //list view
    list_current_page: 0,
    category: 0,
    news_data: [],
    categorys: [
        "종합/경제",
        "방송/통신",
        "IT",
        "영자지",
        "스포츠/연예",
        "매거진/전문지",
        "지역",
    ],
    category_size: 7,
    progress_interval: new Object(),
    progress_time: 0,
};

const ROWSIZE = 6;
const COLSIZE = 4;
const MAXPAGE = 3;

function optionShowPress() {
    const option_press = document.querySelectorAll(".option_press");
    option_press.forEach((option) => {
        option.addEventListener("click", (e) => {
            show_options.press = option.id;
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
            show_options.main = option.id;
            if (option.id === "option_grid_main") {
                option.src = "./assets/icons/option_grid_main_active.png";
                document.getElementById("option_list_main").src =
                    "./assets/icons/option_list_main.png";
                news_data_container.classList.remove("list_news_container");
                news_data_container.classList.add("grid_news_container");

                deleteMainDisplay();
                changeArrow("grid");

                renderGridPress(
                    show_options.press_data,
                    show_options.grid_current_page
                );
            }
            if (option.id === "option_list_main") {
                option.src = "./assets/icons/option_list_main_active.png";
                document.getElementById("option_grid_main").src =
                    "./assets/icons/option_grid_main.png";
                news_data_container.classList.remove("grid_news_container");
                news_data_container.classList.add("list_news_container");

                deleteMainDisplay();
                changeArrow("list");

                renderListNews(
                    show_options.news_data,
                    show_options.category,
                    show_options.list_current_page
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
        case MAXPAGE:
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
}

function movePageEvent() {
    if (!length) length = MAXPAGE;
    const grid_left_arrow = document.querySelector(".grid_left_arrow");
    const grid_right_arrow = document.querySelector(".grid_right_arrow");
    const list_left_arrow = document.querySelector(".list_left_arrow");
    const list_right_arrow = document.querySelector(".list_right_arrow");

    grid_left_arrow.addEventListener("click", () => {
        if (show_options.grid_current_page <= 0) return;
        show_options.grid_current_page = show_options.grid_current_page - 1;
        renderGridPress(
            show_options.press_data,
            show_options.grid_current_page
        );
    });

    grid_right_arrow.addEventListener("click", () => {
        if (show_options.grid_current_page >= length) return;
        show_options.grid_current_page = show_options.grid_current_page + 1;

        renderGridPress(
            show_options.press_data,
            show_options.grid_current_page
        );
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
        show_options.list_current_page = show_options.list_current_page + 1;
        if (
            show_options.list_current_page >=
            show_options.news_data[
                show_options.categorys[show_options.category]
            ].length
        ) {
            // category 앞으로
            if (show_options.category === show_options.category_size - 1) {
                show_options.category = 0;
            } else {
                show_options.category = show_options.category + 1;
            }
            show_options.list_current_page = 0;
        }

        renderListNews(
            show_options.news_data,
            show_options.category,
            show_options.list_current_page
        );
    }

    if (direction === "prev") {
        show_options.list_current_page = show_options.list_current_page - 1;

        if (show_options.list_current_page < 0) {
            // category 뒤로
            if (show_options.category === 0) {
                show_options.category = show_options.category_size - 1;
            } else {
                show_options.category = show_options.category - 1;
            }
            show_options.list_current_page =
                show_options.news_data[
                    show_options.categorys[show_options.category]
                ].length - 1;
        }

        renderListNews(
            show_options.news_data,
            show_options.category,
            show_options.list_current_page
        );
    }
}

function handleEvents() {
    optionShowPress();
    optionShowMain();
    movePageEvent();
}

export { handleEvents, toggleArrow, movePage, show_options, ROWSIZE, COLSIZE };
