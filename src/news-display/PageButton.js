import Component from "../core/Component.js";

export default class PageButton extends Component {
    setup() {
        this.state = {
            type: this.props.type,
            hidden: this.props.hidden,
            onClick: this.props.onClick,
        };

        this.state.hidden && this.$target.classList.add("hidden");
    }

    template() {
        return `
            <img
                src="./asset/icons/${this.state.type}-button.png"
                alt="이전 페이지"
            />
        `;
    }

    setEvent() {
        this.$target.addEventListener("click", this.state.onClick);
    }
}
