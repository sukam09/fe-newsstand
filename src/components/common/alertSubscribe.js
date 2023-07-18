import { buttonFacotry } from "./btnfactory.js";
import { create } from "../../utils/createElement.js";
const btnFactory = new buttonFacotry();

export function createAlert(press_name) {
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
    $btn_container.append(
        btnFactory.create({ type: "alert", isPos: true }).getButton(),
        btnFactory.create({ type: "alert", isPos: false }).getButton()
    );
    $container.append($btn_container);

    return $container;
}
