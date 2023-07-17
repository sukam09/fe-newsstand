import { $app } from "../app.js";
import Component from "../core/Component.js";

export default class SubscribeButton extends Component {
    setup() {
        this.state = {
            viewMode: this.props.viewMode,
            subscribed: this.props.subscribed,
            pressName: this.props.pressName,
        };
    }
    template() {
        const subscribeIcon = this.state.subscribed ? "closed" : "plus";
        const subscribeText = this.state.subscribed ? "해지하기" : "구독하기";
        const showText = this.state.subscribed
            ? this.state.viewMode === "grid"
                ? true
                : false
            : true;

        return `
            <button class="subscribe-button available-medium12">
                <img src="./asset/icons/${subscribeIcon}.svg" alt=${subscribeText} />
                ${showText ? `<div>${subscribeText}</div>` : ""}
            </button>
        `;
    }

    setEvent() {
        const toast = $app.querySelector(".snack-bar-container");
        const alert = $app.querySelector(".alert-container");

        this.$target.addEventListener("click", () => {
            if (this.state.subscribed === false) {
                toast.classList.remove("hidden");
                setTimeout(() => toast.classList.add("hidden"), 5000);
                // 구독하기 리스트에 추가
            } else {
                alert.classList.remove("hidden");

                const alertPressName = alert.querySelector(
                    ".alert-message > span"
                );
                alertPressName.innerHTML = this.state.pressName;
            }
        });
    }
}
