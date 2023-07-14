import Component from "../core/Component.js";
import getDate from "./getDate.js";

export default class Header extends Component {
    setup() {
        this.today = getDate();
    }
    template() {
        return `
            <div class="title-container">
                <button class="title-icon">
                    <img src="./asset/icons/newsstand.svg" alt="뉴스스탠드" />
                </button>
                <h1 class="display-bold24">뉴스스탠드</h1>
            </div>
            <div class="display-medium16 date">${this.today}</div>
        `;
    }

    setEvent() {
        const $button = this.$target.querySelector(".title-icon");
        $button.addEventListener("click", () => location.reload());
    }
}
