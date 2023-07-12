import { renderGridPress } from "./views/grid_views.js";
import { renderListNews } from "./views/list_views.js";

const show_options = {
    press: "all",
    main: "grid",

    //grid view
    press_data: [],
    grid_current_page: 0,

    //list view
    list_current_page: 0,
    category: "종합/경제",
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

    // list exception case. 카테고리 내 뉴스가 1페이지일 경우 작성 x
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

function movePage() {
    if (!length) length = MAXPAGE;
    const grid_left_arrow = document.querySelector(".grid_left_arrow");
    const grid_right_arrow = document.querySelector(".grid_right_arrow");
    const list_left_arrow = document.querySelector(".list_left_arrow");
    const list_right_arrow = document.querySelector(".list_right_arrow");

    grid_left_arrow.addEventListener("click", () => {
        if (show_options.grid_current_page <= 0) return;

        renderGridPress(
            show_options.press_data,
            show_options.grid_current_page - 1
        );
        show_options.grid_current_page = show_options.grid_current_page - 1;
    });

    grid_right_arrow.addEventListener("click", () => {
        if (show_options.grid_current_page >= length) return;

        renderGridPress(
            show_options.press_data,
            show_options.grid_current_page + 1
        );
        show_options.grid_current_page = show_options.grid_current_page + 1;
    });

    list_left_arrow.addEventListener("click", () => {
        renderListNews(
            show_options.news_data,
            show_options.category,
            show_options.list_current_page - 1
        );
        show_options.list_current_page = show_options.list_current_page - 1;
    });

    list_right_arrow.addEventListener("click", () => {
        renderListNews(
            show_options.news_data,
            show_options.category,
            show_options.list_current_page + 1
        );
        show_options.list_current_page = show_options.list_current_page + 1;
    });
}

function init() {
    optionShowPress();
    optionShowMain();
    movePage();
}

init();

export { show_options, toggleArrow, ROWSIZE, COLSIZE };
