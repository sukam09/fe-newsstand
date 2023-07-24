import { $app } from "../app.js";
import Component from "../core/Component.js";
import { addSubscribe, subscribeStore } from "../store.js";

const COLOR_SURFACE_ALT = "#F5F7F9";
const COLOR_SURFACE_DEFAULT = "#FFFFFF";

export default class SubscribeButton extends Component {
    setup() {
        this.state = {
            viewMode: this.props.viewMode,
            subscribed: this.props.subscribed,
            pressName: this.props.pressName,
            pressId: this.props.pressId,
        };
    }
    template() {
        const subscribeIcon = this.state.subscribed
            ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" alt="해지하기">
            <path d="M3.6 9L3 8.4L5.4 6L3 3.6L3.6 3L6 5.4L8.4 3L9 3.6L6.6 6L9 8.4L8.4 9L6 6.6L3.6 9Z" fill="inherit"/>
            </svg>
            `
            : `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" alt="구독하기">
        <path d="M9.5 6.49902H6.5V9.49902H5.5V6.49902H2.5V5.49902H5.5V2.49902H6.5V5.49902H9.5V6.49902Z" fill="inherit"/>
        </svg>
        `;
        const subscribeText = this.state.subscribed ? "해지하기" : "구독하기";
        const showText = this.state.subscribed
            ? this.state.viewMode === "grid"
                ? true
                : false
            : true;

        return `
            <button class="subscribe-button available-medium12">
                ${subscribeIcon}
                ${showText ? `<div>${subscribeText}</div>` : ""}
            </button>
        `;
    }

    mounted() {
        const subscribeButton = this.$target.querySelector(".subscribe-button");
        if (this.state.viewMode === "grid") {
            if (this.state.subscribed) {
                subscribeButton.style.background = COLOR_SURFACE_ALT;
            } else {
                subscribeButton.style.background = COLOR_SURFACE_DEFAULT;
            }
        } else {
            if (!this.state.subscribed) {
                subscribeButton.style.background = COLOR_SURFACE_ALT;
            } else {
                subscribeButton.style.background = COLOR_SURFACE_DEFAULT;
            }
        }
    }

    setEvent() {
        const toastElement = $app.querySelector(".snack-bar-container");
        const alertElement = $app.querySelector(".alert-container");

        this.$target.addEventListener("click", () => {
            if (this.state.subscribed === false) {
                toastElement.classList.remove("hidden");
                setTimeout(() => toastElement.classList.add("hidden"), 5000);

                // 구독하기 리스트에 추가
                this.subscribePress();
                this.setState({ subscribed: true });
            } else {
                alertElement.classList.remove("hidden");

                const alertConfirm =
                    alertElement.querySelector(".alert-confirm");
                alertConfirm.addEventListener("click", () => {
                    this.setState({ subscribed: false });
                });

                const alertPressName = alertElement.querySelector(
                    ".alert-message > span"
                );
                alertPressName.innerHTML = this.state.pressName;
            }
        });
    }

    subscribePress() {
        // const subscribeList = JSON.parse(localStorage.getItem("subscribeList"));
        // subscribeList.push({
        //     id: Number(this.state.pressId),
        //     name: this.state.pressName,
        // });

        subscribeStore.dispatch(
            addSubscribe({
                id: Number(this.state.pressId),
                name: this.state.pressName,
            })
        );
        console.log(subscribeStore.getState().subscribeList);
        localStorage.setItem(
            "subscribeList",
            JSON.stringify(subscribeStore.getState().subscribeList)
        );
    }
}
