import * as elem from "../utils/createElement.js";
import { ICON_LEFT_ARROW_BTN_URL, ICON_RIGHT_ARROW_BTN_URL } from "../utils/iconURL.js";
import { GRID_ROW_SIZE, GRID_COL_SIZE } from "../utils/constant.js";
import { grid_view_info, toggleArrow } from "../components/grid/gridToggle.js";

function createArrowBtn(direction) {
    const btn = elem.createBtn({ className: "grid_view_btn-" + direction + " btn-arrow" });
    const img = elem.createImg({
        className: "arrow",
        src: direction === "right" ? ICON_RIGHT_ARROW_BTN_URL : ICON_LEFT_ARROW_BTN_URL,
    });

    btn.addEventListener("click", () => {
        direction === "right" ? grid_view_info.setNextPage() : grid_view_info.setPrevPage();
        createMainGrid(grid_view_info.getShuffleList(), false);
    });

    return elem.createChild(btn, [img]);
}

function createMainGrid(shuffle_press_list, isInit) {
    const container = isInit
        ? elem.createDiv({ className: "main_news_container" })
        : document.querySelector(".main_news_container");
    container.innerHTML = "";

    const current_page = grid_view_info.getCurrentPage();
    let cnt = current_page * GRID_ROW_SIZE * GRID_COL_SIZE;
    if (!isInit) toggleArrow();

    for (let i = 0; i < GRID_COL_SIZE; i++) {
        const list = elem.createUl({});
        for (let j = 0; j < GRID_ROW_SIZE; j++) {
            let list_class_name = "";
            if (i == GRID_COL_SIZE - 1 && j == GRID_ROW_SIZE - 1) list_class_name = "border_bottom border_right";
            else if (i == GRID_COL_SIZE - 1) list_class_name = "border_bottom";
            else if (j == GRID_ROW_SIZE - 1) list_class_name = "border_right";

            const list_item = elem.createLi({ className: list_class_name });
            const list_img = elem.createImg({
                className: "news_data_img",
                src: shuffle_press_list[cnt++].press_light_src,
            });
            elem.createChild(list_item, [list_img]);
            elem.createChild(list, [list_item]);
        }
        elem.createChild(container, [list]);
    }
    return container;
}

export function createGridView() {
    const container = document.querySelector(".main-grid-view");

    elem.createChild(container, [
        createArrowBtn("left"),
        createMainGrid(grid_view_info.getShuffleList(), true),
        createArrowBtn("right"),
    ]);

    toggleArrow();
}
