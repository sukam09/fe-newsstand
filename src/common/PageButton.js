import Component from "../core/Component.js";

export default class PageButton extends Component {
    setup() {
        this.state = {
            type: this.props.type,
            hidden: this.props.hidden,
        };

        this.state.hidden && this.$target.classList.add("hidden");
    }

    template() {
        return `
            <img
                src="./asset/icons/${this.state.type}-button.png"
                alt="${
                    this.state.type === "left" ? "이전 페이지" : "다음 페이지"
                }"
            />
        `;
    }

    setEvent() {
        this.$target.addEventListener("click", this.props.onClick);
    }
}
