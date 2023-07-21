import { html } from "../../lib/jsx.js";
const SubscribeButton = (type, subscribe, toggleSubscribe) => {
    return subscribe
        ? html `
        <button
          class="subscribe__button subscribe__button--unsubscribe subscribe__button--${type}"
          onClick=${toggleSubscribe}
        >
          <img
            src="/public/asset/icon/closed.svg"
            alt="closed-icon"
            class="icon-s"
          />
          ${type === "grid" && "해지하기"}
        </button>
      `
        : html `
        <button
          class="subscribe__button subscribe__button--subscribe"
          onClick=${toggleSubscribe}
        >
          <img
            src="/public/asset/icon/plus.svg"
            alt="plus-icon"
            class="icon-s"
          />
          구독하기
        </button>
      `;
};
export default SubscribeButton;
