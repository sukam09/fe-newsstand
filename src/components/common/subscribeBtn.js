import { create } from "../../utils/createElement.js";
import { ICON_PLUS_URL } from "../../utils/iconURL.js";

export function createSubscribeBtn() {
    const $btn = create.button({ className: "btn-subscribe" });
    const $img = create.img({
        className: "btn-subscribe-icon",
        attributes: { src: ICON_PLUS_URL, alt: "plus-gray-default" },
    });
    const $title = create.span({ className: "btn-subscribe-label available-medium12", txt: "구독하기" });
    $btn.append($img, $title);
    return $btn;
}
