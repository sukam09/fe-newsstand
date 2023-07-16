import { ICON_LEFT_ARROW_BTN_URL, ICON_RIGHT_ARROW_BTN_URL } from "../../utils/iconURL.js";
import { create } from "../../utils/createElement.js";

export function createArrowBtn(className, isRight, events) {
    const $btn = create.button({
        className: className + " btn-arrow",
        events: events,
    });
    const $img = create.img({
        className: "arrow",
        attributes: { src: isRight ? ICON_RIGHT_ARROW_BTN_URL : ICON_LEFT_ARROW_BTN_URL },
    });

    $btn.appendChild($img);

    return $btn;
}
