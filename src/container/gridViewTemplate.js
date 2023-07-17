import { GRID_ROW_SIZE, GRID_COL_SIZE } from "../utils/constant.js";
import { grid_view_info_entire, grid_view_info_sub, toggleArrow } from "../components/grid/gridToggle.js";
import { create } from "../utils/createElement.js";
import { class_name } from "../utils/domClassName.js";
import { buttonFacotry } from "../components/common/btnfactory.js";
const btnFactory = new buttonFacotry();

function createMainGrid(grid_view_info, isInit) {
    const $container = isInit
        ? create.div({ className: "main_news_container" })
        : document.querySelector(`${grid_view_info.getClassName()}`).querySelector(".main_news_container");
    $container.innerHTML = "";

    const current_page = grid_view_info.getCurrentPage();
    const data_list = grid_view_info.getData();
    let cnt = current_page * GRID_ROW_SIZE * GRID_COL_SIZE;
    if (!isInit) toggleArrow(grid_view_info);

    for (let i = 0; i < GRID_COL_SIZE; i++) {
        const $list = create.ul({});
        for (let j = 0; j < GRID_ROW_SIZE; j++) {
            let list_class_name = "";
            if (i == GRID_COL_SIZE - 1 && j == GRID_ROW_SIZE - 1) list_class_name = "border_bottom border_right";
            else if (i == GRID_COL_SIZE - 1) list_class_name = "border_bottom";
            else if (j == GRID_ROW_SIZE - 1) list_class_name = "border_right";

            const $list_item = create.li({ className: list_class_name });
            if (data_list.length > cnt) {
                const $list_img = create.img({
                    className: "news_data_img",
                    attributes: { src: data_list[cnt++].press_light_src },
                });
                $list_item.appendChild($list_img);
            }

            $list.appendChild($list_item);
        }
        $container.appendChild($list);
    }
    return $container;
}

function createGridArrowBtn(btnFactory, isRight, is_subscribe, grid_view_info) {
    return btnFactory.create({
        type: "arrow",
        className: isRight
            ? `${class_name.GRID_RIGHT_BTN}-${is_subscribe}`
            : `${class_name.GRID_LEFT_BTN}-${is_subscribe}`,
        events: {
            click: () => {
                grid_view_info.setPage(isRight);
                createMainGrid(grid_view_info, false);
            },
        },
        isRight: isRight,
    });
}

function createGridView(is_subscribe, grid_view_info) {
    const $container = document.querySelector(`.grid-${is_subscribe}`);
    $container.append(
        createGridArrowBtn(btnFactory, false, is_subscribe, grid_view_info).getButton(),
        createMainGrid(grid_view_info, true),
        createGridArrowBtn(btnFactory, true, is_subscribe, grid_view_info).getButton()
    );
    toggleArrow(grid_view_info);
}

export function gridView() {
    createGridView(class_name.ENTIRE, grid_view_info_entire);
    createGridView(class_name.SUBSCRIBE, grid_view_info_sub);
}
