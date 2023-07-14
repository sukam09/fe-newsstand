import * as elem from "../../utils/createElement.js";
import { ICON_PLUS_URL } from "../../utils/iconURL.js";

export function createSubscribeBtn() {
    const btn = elem.createBtn({ className: "btn-subscribe" });
    const img = elem.createImg({
        className: "btn-subscribe-icon",
        src: ICON_PLUS_URL,
        alt: "plus-gray-default",
    });
    const title = elem.createSpan({ className: "btn-subscribe-label available-medium12", txt: "구독하기" });

    return elem.createChild(btn, [img, title]);
}
