import { renderGridPress, currentPage } from "./views/grid_views.js";
import { initListNews } from "./views/list_views.js";

const show_options = {
    press: "all",
    main: "symbol",
    press_data: [],
};

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

            // here main change ...
        });
    });
}

function optionShowMain() {
    const option_main = document.querySelectorAll(".option_main");
    const news_data_container = document.querySelector(".main_news_container");

    option_main.forEach((option) => {
        option.addEventListener("click", () => {
            show_options.main = option.id;
            if (option.id === "option_symbol_main") {
                option.src = "./assets/icons/option_symbol_main_active.png";
                document.getElementById("option_list_main").src =
                    "./assets/icons/option_list_main.png";
                news_data_container.classList.remove("list_news_container");
                news_data_container.classList.add("grid_news_container");
                deleteMainDisplay();
                renderGridPress(show_options.press_data, currentPage);

                // here (random_news.js) renderMain()
            } else {
                option.src = "./assets/icons/option_list_main_active.png";
                document.getElementById("option_symbol_main").src =
                    "./assets/icons/option_symbol_main.png";

                news_data_container.classList.remove("grid_news_container");
                news_data_container.classList.add("list_news_container");
                deleteMainDisplay();
                initListNews();

                // here (list_news.js) renderMain()
            }
            // here main change ...
        });
    });
}

function deleteMainDisplay() {
    const news_data_container = document.querySelector(".main_news_container");
    news_data_container.innerHTML = "";
}

function init() {
    optionShowPress();
    optionShowMain();
}

init();

export { show_options };
