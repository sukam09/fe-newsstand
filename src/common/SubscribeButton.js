import { $app } from "../app.js";
import Component from "../core/Component.js";

export default class SubscribeButton extends Component {
    setup() {
        this.state = {
            viewMode: this.props.viewMode,
            subscribed: this.props.subscribed,
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
        const snackBar = $app.querySelector(".news-snack-bar");
        this.$target.addEventListener("click", () => {
            snackBar.classList.remove("hidden");
            setTimeout(() => snackBar.classList.add("hidden"), 5000);
        });
    }
}
