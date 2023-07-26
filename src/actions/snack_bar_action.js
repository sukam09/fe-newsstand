import { view_option } from "../store.js";
import { setActiveClass } from "../utils/data_util.js";
import { SNACKBAR_DELAY } from "../constants.js";

/**
 * @description
 * 1. snack bar의 애니메이션을 설정한다.
 * @returns {Object} options
 */
export function setSnackBar(clearAndRender) {
    const snack_bar_container = document.querySelector(".snack_bar_container");

    snack_bar_container.style.display = "block";
    snack_bar_container.style.animation = "appear 0.5s forwards";

    const snack_animation_time = setTimeout(() => {
        snack_bar_container.style.animation = "disappear 0.5s forwards";
        view_option.dispatch(
            {
                type: "CHANGE_VIEW_OPTION",
                value: "list",
            },
            "main"
        );
        view_option.dispatch(
            {
                type: "CHANGE_VIEW_OPTION",
                value: "subscribe",
            },
            "press"
        );
        const { main, press } = view_option.getState(["main", "press"]);
        const option_elements = document.querySelectorAll(`.option_main`);
        setActiveClass();
        clearAndRender({
            main: main,
            press: press,
            option_elements: option_elements,
            selected: "main",
        });
        
    }, SNACKBAR_DELAY);

    return snack_animation_time;
}
