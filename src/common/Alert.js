import Component from "../core/Component.js";

export default class Alert extends Component {
    template() {
        return `
            <div class="alert-message">
                <span class="display-bold16"></span>을(를) <br />
                구독해지하시겠습니까?
            </div>
            <div class="alert-button-container">
                <div class="alert-confirm">예, 해지합니다</div>
                <div class="alert-cancel">아니오</div>
            </div>
        `;
    }

    setEvent() {
        this.$target.addEventListener("click", (e) => {
            console.log(this.$target);
            if (e.target.classList.contains("alert-confirm")) {
                this.$target.classList.add("hidden");
                // 구독하기 리스트에서 삭제
            } else if (e.target.classList.contains("alert-cancel")) {
                this.$target.classList.add("hidden");
            }
        });
    }
}
