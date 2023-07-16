import { create } from "../../utils/createElement.js";
import { ICON_LEFT_ARROW_BTN_URL, ICON_RIGHT_ARROW_BTN_URL, ICON_PLUS_URL } from "../../utils/iconURL.js";

class button {
    constructor({ className, events }) {
        this.$btn = create.button({
            className: className,
            events: events,
        });
    }

    getButton = function () {
        return this.$btn;
    };
}

class arrowBtn extends button {
    constructor({ className, events, isRight }) {
        super({ className: className + " btn-arrow", events: events });
        this.$img = create.img({
            className: "arrow",
            attributes: { src: isRight ? ICON_RIGHT_ARROW_BTN_URL : ICON_LEFT_ARROW_BTN_URL },
        });
        this.$btn.appendChild(this.$img);
    }
}

class subscribeBtn extends button {
    constructor({ events }) {
        super({ className: "btn-subscribe", events: events });
        this.$img = create.img({
            className: "btn-subscribe-icon",
            attributes: { src: ICON_PLUS_URL, alt: "plus-gray-default" },
        });
        this.$title = create.span({ className: "btn-subscribe-label available-medium12", txt: "구독하기" });
        this.$btn.append(this.$img, this.$title);
    }
}

export class buttonFacotry {
    create(props) {
        switch (props.type) {
            case "arrow":
                return new arrowBtn({ className: props.className, events: props.events, isRight: props.isRight });
            case "subscribe":
                return new subscribeBtn({ className: props.className, events: props.events });
            default:
                return new button({ className: props.className, events: props.events });
        }
    }
}
