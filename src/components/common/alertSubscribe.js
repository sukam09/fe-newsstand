import { buttonFacotry } from "./btnfactory.js";
import { create } from "../../utils/createElement.js";
import { _sub_press_list } from "../../Store.js";
const btnFactory = new buttonFacotry();

export function createAlert(press_name, press_id) {
    const txt = `
    <span class="alert-txt display-medium16">
        <span>
            <span class="alert-txt-strong">${press_name}</span>
            <span>을(를)</span>
        </span>
        <span>구독해지하시겠습니까?</span>
    </span>
    `;
    const $container = create.div({
        className: "alert",
        txt: txt,
    });

    const $btn_container = create.div({
        className: "alert-btn available-medium16",
    });
    const $pos_btn = btnFactory.create({ type: "alert", isPos: true });
    const $neg_btn = btnFactory.create({ type: "alert", isPos: false });
    $pos_btn.setEvents({
        click: () => {
            _sub_press_list.deleteState(press_id);
        },
    });
    $neg_btn.setEvents({
        click: () => {
            document.querySelector(".alert").remove();
        },
    });
    $btn_container.append($pos_btn.getButton(), $neg_btn.getButton());
    $container.append($btn_container);

    return $container;
}
