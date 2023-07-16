import { GRID_ROW_SIZE, GRID_COL_SIZE } from "../utils/constant.js";
import { grid_view_info, toggleArrow } from "../components/grid/gridToggle.js";
import { create } from "../utils/createElement.js";
import { createArrowBtn } from "../components/common/arrowBtn.js";
import { class_name } from "../utils/domClassName.js";

function createMainGrid(shuffle_press_list, isInit) {
    const $container = isInit
        ? create.div({ className: "main_news_container" })
        : document.querySelector(".main_news_container");
    $container.innerHTML = "";

    const current_page = grid_view_info.getCurrentPage();
    let cnt = current_page * GRID_ROW_SIZE * GRID_COL_SIZE;
    if (!isInit) toggleArrow();

    for (let i = 0; i < GRID_COL_SIZE; i++) {
        const $list = create.ul({});
        for (let j = 0; j < GRID_ROW_SIZE; j++) {
            let list_class_name = "";
            if (i == GRID_COL_SIZE - 1 && j == GRID_ROW_SIZE - 1) list_class_name = "border_bottom border_right";
            else if (i == GRID_COL_SIZE - 1) list_class_name = "border_bottom";
            else if (j == GRID_ROW_SIZE - 1) list_class_name = "border_right";

            const $list_item = create.li({ className: list_class_name });
            const $list_img = create.img({
                className: "news_data_img",
                attributes: { src: shuffle_press_list[cnt++].press_light_src },
            });
            $list_item.appendChild($list_img);
            $list.appendChild($list_item);
        }
        $container.appendChild($list);
    }
    return $container;
}

function clickArrowEvent() {
    grid_view_info.setPage(this.isRight);
    createMainGrid(grid_view_info.getShuffleList(), false);
}

export function createGridView() {
    const $container = document.querySelector(`.${class_name.GRID_VIEW}`);
    $container.append(
        createArrowBtn(class_name.GRID_LEFT_BTN, false, {
            click: clickArrowEvent.bind({ isRight: false }),
        }),
        createMainGrid(grid_view_info.getShuffleList(), true),
        createArrowBtn(class_name.GRID_RIGHT_BTN, true, {
            click: clickArrowEvent.bind({ isRight: true }),
        })
    );
    toggleArrow();
}
