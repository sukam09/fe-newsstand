import { create } from "../../utils/createElement.js";
import {
    ICON_LEFT_ARROW_BTN_URL,
    ICON_RIGHT_ARROW_BTN_URL,
    ICON_PLUS_URL,
    ICON_CLOSED_URL,
} from "../../utils/iconURL.js";

class button {
    constructor({ className, events, txt }) {
        this.$btn = create.button({
            className: className,
            events: events,
        });
    }

    getButton = function () {
        return this.$btn;
    };

    setEvents = function (events) {
        for (const key in events) this.$btn.addEventListener(key, events[key]);
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
    constructor({ events, isDefault, isSubscribe }) {
        super({ className: "btn-subscribe", events: events });
        this.is_subscribe = isSubscribe;
        this.$img = create.img({
            className: "btn-subscribe-icon",
            attributes: { src: isSubscribe ? ICON_PLUS_URL : ICON_CLOSED_URL, alt: "subscribe-icon" },
        });
        this.$title = create.span({
            className: "btn-subscribe-label available-medium12",
            txt: isSubscribe ? "구독하기" : "해지하기",
        });
        if (isDefault) this.$btn.style.backgroundColor = "white";
        this.$btn.append(this.$img, this.$title);
    }

    setStyle = function () {
        this.$img.setAttribute("src", this.is_subscribe ? ICON_PLUS_URL : ICON_CLOSED_URL);
        this.$title.innerHTML = "";
        this.$title.innerHTML = this.is_subscribe ? "구독하기" : "해지하기";
    };

    changeMode = async function () {
        this.is_subscribe = !this.is_subscribe;
        await this.setStyle();
    };
}

class closedBtn extends button {
    constructor({ events }) {
        super({ className: "btn-subscribe closed-icon", events: events });
        this.$img = create.img({
            className: "btn-closed-icon",
            attributes: { src: ICON_CLOSED_URL, alt: "closed-icon" },
        });

        this.$btn.append(this.$img);
    }
}

class alertBtn extends button {
    constructor({ events, isPos }) {
        super({
            className: `alert-btn-${isPos ? "pos" : "neg"}`,
            events: {
                ...events,
                mouseover: () => {
                    this.$btn.style.textDecoration = "underline";
                },
                mouseout: () => {
                    this.$btn.style.textDecoration = "none";
                },
            },
        });
        this.$btn.innerHTML = isPos ? "예, 해지합니다" : "아니오";
    }
}

export class buttonFacotry {
    create(props) {
        switch (props.type) {
            case "arrow":
                return new arrowBtn({ className: props.className, events: props.events, isRight: props.isRight });
            case "subscribe":
                return new subscribeBtn({
                    className: props.className,
                    events: props.events,
                    isDefault: props.isDefault,
                    isSubscribe: props.isSubscribe,
                });
            case "closed":
                return new closedBtn({ events: props.events });
            case "alert":
                return new alertBtn({ events: props.events, isPos: props.isPos });
            default:
                return new button({ className: props.className, events: props.events });
        }
    }
}
