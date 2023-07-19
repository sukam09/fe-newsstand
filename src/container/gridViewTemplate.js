import { GRID_ROW_SIZE, GRID_COL_SIZE, SNACK_BAR_TIME } from "../utils/constant.js";
import { grid_view_info_entire, grid_view_info_sub } from "../components/grid/gridObserver.js";
import { toggleArrow } from "../components/grid/gridArrow.js";
import { create } from "../utils/createElement.js";
import { class_name } from "../utils/domClassName.js";
import { buttonFacotry } from "../components/common/btnfactory.js";
import { createSnackBar } from "../components/common/snackBar.js";
import { createAlert } from "../components/common/alertSubscribe.js";
import { onClickSubBtn } from "../components/layout/mainNavEvent.js";

const btnFactory = new buttonFacotry();

// 그리드 뷰 생성 (화살표 제외한 뷰)
export function createMainGrid(grid_view_info, isInit, subscribe_list) {
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

            if (data_list.length <= cnt) {
                const $grid = create.li({ className: list_class_name });
                $list.appendChild($grid);
                continue;
            }

            // 그리드 셀 호버시 나타나는 컴포넌트
            const $mouse_hover_btn = create.div({
                className: "mouse-enter-grid",
                events: {
                    mouseleave: () => {
                        $mouse_hover_btn.style.visibility = "hidden"; // 그리드 셀 벗어나는 경우 이벤트
                    },
                },
            });

            // 구독하기 버튼 (구독한 경우: 해지하기 버튼, 구독하지 않은 경우: 구독하기 버튼)
            const is_subscribe_press = !subscribe_list.includes(data_list[cnt].id);
            const $subscribe_btn = btnFactory.create({
                type: "subscribe",
                isDefault: true,
                isSubscribe: is_subscribe_press,
                press_id: data_list[cnt].id,
                press_name: data_list[cnt].name,
            });
            // 구독하기 버튼 클릭시 이벤트
            $subscribe_btn.setEvents({
                click: () => {
                    const $snack_bar = createSnackBar();

                    const $id = $subscribe_btn.getId();
                    if (!$subscribe_btn.getIsSubscribe()) {
                        // 해지하기 버튼 클릭시 구독해지 알림
                        $container.appendChild(createAlert($subscribe_btn.getName(), $id));
                    } else {
                        // 구독하기 버튼 클릭시 구독한 언론사 리스트에 추가 및 스낵바
                        // 스낵바 5초간 유지 후 내가 구독한 언론사로 이동
                        $subscribe_btn.changeMode();
                        _sub_press_list.addState($id);
                        document.querySelector(".main_news_container").appendChild(createSnackBar());
                        setTimeout(() => {
                            document.querySelector(".snack-bar").remove();
                            onClickSubBtn(true);
                        }, SNACK_BAR_TIME);
                    }
                },
            });
            $mouse_hover_btn.appendChild($subscribe_btn.getButton());

            const $list_item = create.li({
                className: list_class_name,
                events: {
                    mouseenter: () => {
                        $mouse_hover_btn.style.visibility = "visible";
                    },
                },
            });

            const $list_img = create.img({
                className: "news_data_img",
                attributes: { src: data_list[cnt++].press_light_src },
            });
            $list_item.append($list_img, $mouse_hover_btn);
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
        createMainGrid(grid_view_info, true, []),
        createGridArrowBtn(btnFactory, true, is_subscribe, grid_view_info).getButton()
    );
    toggleArrow(grid_view_info);
}

export function gridView(is_init) {
    createGridView(class_name.ENTIRE, grid_view_info_entire);
    createGridView(class_name.SUBSCRIBE, grid_view_info_sub);
}
