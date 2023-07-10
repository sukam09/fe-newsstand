let show_options = {
    press: "all",
    main: "symbol",
};

function optionShowPress() {
    const option_press = document.querySelectorAll(".option_press");
    option_press.forEach((option) => {
        option.addEventListener("click", () => {
            show_options.press = option.id;
            console.log(show_options.press);
            if (option.id === "option_all_press") {
                option.className = "option_press option_press_active";
                document.getElementById("option_subscribe_press").className =
                    "option_press option_press_inactive";
            } else {
                option.className = "option_press option_press_active";
                document.getElementById("option_all_press").className =
                    "option_press option_press_inactive";
            }

            // here main change ...
        });
    });
}

function optionShowMain() {
    const option_main = document.querySelectorAll(".option_main");
    option_main.forEach((option) => {
        option.addEventListener("click", () => {
            show_options.main = option.id;
            if (option.id === "option_symbol_main") {
                option.src = "./icons/option_symbol_main_active.png";
                document.getElementById("option_list_main").src =
                    "./icons/option_list_main.png";
            } else {
                option.src = "./icons/option_list_main_active.png";
                document.getElementById("option_symbol_main").src =
                    "./icons/option_symbol_main.png";
            }
            // here main change ...
        });
    });
}

function init() {
    optionShowPress();
    optionShowMain();
}

init();
