import Component from "../core/Component.js";
import { cancelSubscribe, subscribeStore } from "../store.js";

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
        this.$target.addEventListener("click", ({ target, currentTarget }) => {
            if (target.classList.contains("alert-confirm")) {
                currentTarget.classList.add("hidden");

                // 구독하기 리스트에서 삭제
                this.unsubscribePress();
            } else if (target.classList.contains("alert-cancel")) {
                currentTarget.classList.add("hidden");
            }
        });
    }

    unsubscribePress() {
        const pressName = this.$target.querySelector(".alert-message > span");
        subscribeStore.dispatch(cancelSubscribe(pressName.textContent.trim()));
        // console.log(subscribeStore.getState().subscribeList);
        localStorage.setItem(
            "subscribeList",
            JSON.stringify(subscribeStore.getState().subscribeList)
        );
    }
}
